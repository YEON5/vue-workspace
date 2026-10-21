// composables/useFloating.ts
// Popover, Tooltip, Dropdown 모두 트리거 기준으로 떠 있는 요소의 위치 계산

import type { Placement, Side } from '#/types';
import { onBeforeUnmount, ref, toValue, watch, type MaybeRefOrGetter, type Ref } from 'vue';

interface Options {
  anchor: Ref<HTMLElement | null>; // 기준 요소 (트리거)
  floating: Ref<HTMLElement | null>; // 떠 있는 요소
  open: Ref<boolean>;
  placement?: MaybeRefOrGetter<Placement>;
  offset?: MaybeRefOrGetter<number>; // 트리거와의 간격(px)
  matchWidth?: MaybeRefOrGetter<boolean>; // 최소 너비를 트리거 너비에 맞춤
  padding?: number; // 화면 가장자리 여백(px)
}

const OPPOSITE: Record<Side, Side> = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
const HIDDEN = { position: 'fixed', top: '0px', left: '0px', visibility: 'hidden' };

const isVertical = (s: Side) => s === 'top' || s === 'bottom';
const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(v, max));
const same = (a: Record<string, string>, b: Record<string, string>) => {
  const keys = Object.keys(a);
  return keys.length === Object.keys(b).length && keys.every(k => a[k] === b[k]);
};

// 앵커의 스크롤 가능한 조상들 (+ window)
function getScrollParents(el: HTMLElement): EventTarget[] {
  const list: EventTarget[] = [];
  let node = el.parentElement;
  while (node) {
    const { overflow, overflowX, overflowY } = getComputedStyle(node);
    if (/(auto|scroll|overlay)/.test(overflow + overflowX + overflowY)) list.push(node);
    node = node.parentElement;
  }
  list.push(window);
  return list;
}

// 화면 끝에서 눌리지 않은 '자연 크기'와 클래스(max-w-*)의 최대 너비를 측정
// left를 0으로, 인라인 maxWidth를 비운 상태에서 읽고 바로 원복 (페인트 전에 끝남)
function measure(f: HTMLElement) {
  const { left, maxWidth } = f.style;
  f.style.left = '0px';
  f.style.maxWidth = '';
  const cssMax = getComputedStyle(f).maxWidth;
  const w = f.offsetWidth;
  const h = f.offsetHeight;
  f.style.left = left;
  f.style.maxWidth = maxWidth;
  return { w, h, cssMax: cssMax.endsWith('px') ? parseFloat(cssMax) : Infinity };
}

export function useFloating(options: Options) {
  const { anchor, floating, open } = options;
  const padding = options.padding ?? 8; // 화면 가장자리 여백(px)

  const style = ref<Record<string, string>>({ ...HIDDEN });
  const placement = ref<Placement>(toValue(options.placement ?? 'bottom-start'));
  // 플로팅 요소 왼쪽/위쪽 기준, 앵커 중심까지의 거리 (화살표 위치 계산용)
  const anchorCenter = ref({ x: 0, y: 0 });

  function update() {
    const a = anchor.value;
    const f = floating.value;
    if (!open.value || !a || !f) return;

    const wanted = toValue(options.placement ?? 'bottom-start');
    const gap = toValue(options.offset ?? 8);
    const matchWidth = toValue(options.matchWidth ?? false);

    const ar = a.getBoundingClientRect();
    const vw = document.documentElement.clientWidth; // 세로 스크롤바 제외
    const vh = window.innerHeight;

    const natural = measure(f);
    const fw = Math.max(natural.w, matchWidth ? ar.width : 0);
    const fh = natural.h;

    const [wantedSide, align] = wanted.split('-') as [Side, ('start' | 'end')?];
    let side = wantedSide;
    
    // 트리거를 기준으로 뷰포트 안에서 상/하/좌/우로 각각 얼마나 여유 공간이 있는지
    const space: Record<Side, number> = {
      top: ar.top - gap - padding,
      bottom: vh - ar.bottom - gap - padding,
      left: ar.left - gap - padding,
      right: vw - ar.right - gap - padding,
    };

    // flip: 원하는 쪽에 공간이 부족하고 반대쪽이 더 넉넉할 때만 뒤집음
    const need = isVertical(side) ? fh : fw;
    if (need > space[side] && space[OPPOSITE[side]] > space[side]) side = OPPOSITE[side];

    let top: number;
    let left: number;
    let maxWidth: number | null = null;

    if (isVertical(side)) {
      top = side === 'bottom' ? ar.bottom + gap : ar.top - fh - gap;
      left = align === 'start' ? ar.left : align === 'end' ? ar.right - fw : ar.left + ar.width / 2 - fw / 2;
      left = clamp(left, padding, vw - fw - padding); // shift: 가로 방향만 보정
    } else {
      // right/left: 남은 공간(여백 제외)보다 넓으면 그만큼만 쓰고, 클래스 max-w도 함께 지킴
      const available = Math.max(space[side], 0);
      maxWidth = Math.min(natural.cssMax, available);
      const effW = Math.min(fw, maxWidth);

      left = side === 'right' ? ar.right + gap : ar.left - effW - gap;
      top = align === 'start' ? ar.top : align === 'end' ? ar.bottom - fh : ar.top + ar.height / 2 - fh / 2;
      top = clamp(top, padding, vh - fh - padding); // shift: 세로 방향만 보정
    }

    const next: Record<string, string> = {
      position: 'fixed',
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
      visibility: 'visible',
    };
    if (matchWidth) next.minWidth = `${Math.round(ar.width)}px`;
    if (maxWidth !== null) next.maxWidth = `${Math.floor(maxWidth)}px`;

    placement.value = (align ? `${side}-${align}` : side) as Placement;
    anchorCenter.value = { x: ar.left + ar.width / 2 - left, y: ar.top + ar.height / 2 - top };
    if (!same(style.value, next)) style.value = next;
  }

  // 스크롤/리사이즈는 프레임당 한 번만 계산
  let raf = 0;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      update();
    });
  }

  let cleanup: (() => void) | null = null;

  function start() {
    stop();
    const a = anchor.value;
    const f = floating.value;
    if (!a || !f) return;

    const scrollTargets = getScrollParents(a);
    scrollTargets.forEach(t => t.addEventListener('scroll', schedule, { passive: true }));
    window.addEventListener('resize', schedule);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(schedule);
      ro.observe(a);
      ro.observe(f);
    }

    cleanup = () => {
      scrollTargets.forEach(t => t.removeEventListener('scroll', schedule));
      window.removeEventListener('resize', schedule);
      ro?.disconnect();
      cancelAnimationFrame(raf);
      raf = 0;
    };
  }

  function stop() {
    cleanup?.();
    cleanup = null;
  }

  // flush: 'post' → DOM 반영 직후, 화면에 그려지기 전에 위치 확정
  watch(
    [open, floating, anchor],
    ([isOpen, f, a]) => {
      if (isOpen && f && a) {
        update();
        start();
        return;
      }
      stop();
      if (!f) style.value = { ...HIDDEN }; // 닫히는 transition 중에는 유지
    },
    { flush: 'post' },
  );

  onBeforeUnmount(stop);

  return { style, placement, anchorCenter, update };
}