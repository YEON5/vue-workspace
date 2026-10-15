<script setup lang="ts">
import { bgColorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, nextTick, onBeforeUnmount, onMounted, provide, ref, watch, type Ref } from 'vue';

export type TabVariant = 'line' | 'pill';

interface Props {
  variant?: TabVariant;
  animated?: boolean;
  full?: boolean;
  scrollable?: boolean;
  alignAction?: 'center' | 'left';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'line',
  animated: false,
  full: true,
  scrollable: false,
  alignAction: 'center',
});

const tabModel = inject<Ref<unknown>>('tabModel', ref());

provide('tabVariant', computed(() => props.variant));
provide('tabAnimated', computed(() => props.animated));
// scrollable이 true면 flex-1(꽉 채우기)이 되면 안 되므로 강제로 false 처리
provide('tabFull', computed(() => (props.scrollable ? false : props.full)));

const isPill = computed(() => props.variant === 'pill');

const listClasses = computed(() =>
  cn(
    'tab-list relative flex w-full',
    props.variant === 'line' && 'shadow-[inset_0_-1px_0_theme(colors.gray.200)]',
    isPill.value && 'gap-3',
    props.scrollable && 'overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar',
    props.class
  )
);

const listRef = ref<HTMLElement | null>(null);
const ready = ref(false);

const indicatorStyle = ref<Record<string, string>>({
  width: '0px',
  transform: 'translate(0px, 0px)',
});

// animated + scrollable: 스크롤과 indicator를 한 rAF 루프에서 같이 움직임 (CSS transition 사용 안 함)
const useJsMotion = computed(() => props.animated && props.scrollable);
const MOTION_DURATION = 250; // ms

interface Box {
  left: number;
  width: number;
  top: number;
  height: number;
}

const current: Box = { left: 0, width: 0, top: 0, height: 0 };
let rafId = 0;
let isMoving = false;

function setIndicator(box: Box) {
  Object.assign(current, box);

  const next: Record<string, string> = {
    width: `${box.width}px`,
    transform: `translate(${box.left}px, ${box.top}px)`,
  };
  // pill은 탭 높이만큼 채워야 하므로 height도 지정 (line은 클래스로 2px 고정)
  if (isPill.value) next.height = `${box.height}px`;

  const prev = indicatorStyle.value;
  // 값이 같으면 재설정하지 않아 불필요한 갱신 방지
  if (prev.width === next.width && prev.transform === next.transform && prev.height === next.height) return;

  indicatorStyle.value = next;
}

function getActiveTab() {
  return listRef.value?.querySelector<HTMLElement>('[role="tab"][aria-selected="true"]') ?? null;
}

// 스크롤 컨테이너 내부에서는 getBoundingClientRect 대신 offset 값을 사용해야 오차가 없습니다.
function getBox(tab: HTMLElement): Box {
  return {
    left: tab.offsetLeft,
    width: tab.offsetWidth,
    top: isPill.value ? tab.offsetTop : 0,
    height: isPill.value ? tab.offsetHeight : 0,
  };
}

// 활성 탭을 맞출 스크롤 목표 위치 (스크롤 가능 범위로 제한)
function getTargetScroll(tab: HTMLElement, list: HTMLElement) {
  const raw = props.alignAction === 'center'
    ? tab.offsetLeft - list.offsetWidth / 2 + tab.offsetWidth / 2
    : tab.offsetLeft;

  return Math.max(0, Math.min(raw, list.scrollWidth - list.clientWidth));
}

function updateIndicator() {
  // JS 모션이 진행 중일 때는 ResizeObserver 등이 값을 덮어쓰지 않도록 건너뜀
  if (!props.animated || !listRef.value || isMoving) return;

  const activeTab = getActiveTab();
  if (!activeTab) return;

  setIndicator(getBox(activeTab));
}

// 클릭되거나 화살표 키로 이동한 탭을 정렬 기준(중앙/왼쪽)으로 스크롤 (JS 모션을 쓰지 않을 때)
function scrollToActiveTab(smooth = true) {
  if (!props.scrollable || !listRef.value) return;

  const activeTab = getActiveTab();
  if (!activeTab) return;

  listRef.value.scrollTo({
    left: getTargetScroll(activeTab, listRef.value),
    behavior: smooth ? 'smooth' : 'auto',
  });
}

// 스크롤 + indicator를 같은 프레임에서 함께 이동
function moveTo(smooth: boolean) {
  const list = listRef.value;
  const tab = getActiveTab();
  if (!list || !tab) return;

  const to = getBox(tab);
  const toScroll = getTargetScroll(tab, list);

  cancelAnimationFrame(rafId);

  // 첫 진입 등: 애니메이션 없이 즉시 이동
  if (!smooth) {
    isMoving = false;
    list.scrollLeft = toScroll;
    setIndicator(to);
    return;
  }

  const fromScroll = list.scrollLeft;
  const from: Box = { ...current };
  const startTime = performance.now();
  isMoving = true;

  const step = (now: number) => {
    const t = Math.min((now - startTime) / MOTION_DURATION, 1);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    const lerp = (a: number, b: number) => a + (b - a) * eased;

    list.scrollLeft = lerp(fromScroll, toScroll);
    setIndicator({
      left: lerp(from.left, to.left),
      width: lerp(from.width, to.width),
      top: lerp(from.top, to.top),
      height: lerp(from.height, to.height),
    });

    if (t < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      isMoving = false;
    }
  };

  rafId = requestAnimationFrame(step);
}

let resizeObserver: ResizeObserver | null = null;

// 탭이 변경될 때마다 인디케이터와 스크롤 동시 업데이트
watch(tabModel, () => {
  nextTick(() => {
    if (useJsMotion.value) {
      moveTo(true);
    } else {
      updateIndicator();
      scrollToActiveTab();
    }
  });
});

onMounted(async () => {
  await nextTick();

  // 첫 화면 진입 시에는 애니메이션 없이 즉시 활성화된 탭 위치로 이동
  if (useJsMotion.value) {
    moveTo(false);
  } else {
    updateIndicator();
    scrollToActiveTab(false);
  }

  requestAnimationFrame(() => {
    ready.value = true;
  });

  if (listRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(listRef.value);
    listRef.value
      .querySelectorAll('[role="tab"]')
      .forEach((tab) => resizeObserver?.observe(tab));
  }
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  resizeObserver?.disconnect();
});

// 키보드 방향키(좌/우)로 탭 포커스 이동 (disabled 탭은 건너뜀)
function handleKeydown(e: KeyboardEvent) {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
  const tabs = Array.from(listRef.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]') || []);
  if (!tabs.length) return;
  const currentIndex = tabs.findIndex(tab => tab === document.activeElement);
  if (currentIndex === -1) return;
  e.preventDefault();

  const direction = e.key === 'ArrowRight' ? 1 : -1;
  for (let i = 1; i < tabs.length; i++) {
    const nextIndex = (currentIndex + direction * i + tabs.length) % tabs.length;
    if (!tabs[nextIndex].disabled) {
      tabs[nextIndex].focus();
      break;
    }
  }
}
</script>

<template>
  <div
    ref="listRef"
    role="tablist"
    :class="listClasses"
    @keydown="handleKeydown"
  >
    <slot />

    <div
      v-if="animated"
      :class="cn(
        'absolute left-0 z-0',
        bgColorMap['primary'],
        // line: 하단 2px 언더바 / pill: 탭 크기만큼 채우는 알약 배경
        isPill ? 'top-0 rounded-full' : 'bottom-0 h-[2px]',
        // JS 모션 모드에서는 CSS transition을 끔 (rAF가 직접 값을 갱신)
        ready && !useJsMotion && 'transition-[transform,width,height] duration-200 ease-out',
      )"
      :style="indicatorStyle"
    />
  </div>
</template>

<style scoped>
/* 브라우저 기본 스크롤바 숨김 (가로 스와이프만 노출) */
.hide-scrollbar {
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>