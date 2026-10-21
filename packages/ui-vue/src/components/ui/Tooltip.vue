<script setup lang="ts">
import { useDismiss } from '#/composables/useDismiss';
import { useFloating } from '#/composables/useFloating';
import type { Placement } from '#/types';
import { cn } from '#/utils/cn';
import { computed, onBeforeUnmount, provide, ref, useId } from 'vue';

interface Props {
  placement?: Placement;
  offset?: number;
  openDelay?: number; // hover로 열릴 때 지연(ms)
  closeDelay?: number; // hover가 벗어난 뒤 닫히는 지연(ms)
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  offset: 8,
  openDelay: 200, // hover 시간
  closeDelay: 100,
  disabled: false,
});

const open = defineModel<boolean>({ default: false });

const contentId = `${useId()}-tooltip`;

const rootRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const { style, placement, anchorCenter } = useFloating({
  anchor: rootRef,
  floating: contentRef,
  open,
  placement: () => props.placement,
  offset: () => props.offset,
});

// ESC, 바깥 터치/클릭으로 닫힘 (포커스는 트리거에 그대로 유지)
useDismiss({
  open,
  elements: [rootRef, contentRef],
  onDismiss: () => close(),
});

let timer = 0;
function clearTimer() {
  window.clearTimeout(timer);
  timer = 0;
}

function show(delay = 0) {
  if (props.disabled) return;
  clearTimer();
  if (delay <= 0) {
    open.value = true;
    return;
  }
  timer = window.setTimeout(() => (open.value = true), delay);
}

function hide(delay = 0) {
  clearTimer();
  if (delay <= 0) {
    open.value = false;
    return;
  }
  timer = window.setTimeout(() => (open.value = false), delay);
}

function close() {
  hide(0);
}

// hover: 마우스일 때만 (터치의 에뮬레이션 hover 무시)
function onPointerEnter(e: PointerEvent) {
  if (e.pointerType === 'mouse') show(props.openDelay);
}
function onPointerLeave(e: PointerEvent) {
  if (e.pointerType === 'mouse') hide(props.closeDelay);
}

// 터치: 탭하면 토글, 바깥을 탭하면 useDismiss가 닫음
function onPointerDown(e: PointerEvent) {
  if (e.pointerType !== 'touch') return;
  if (open.value) hide(0);
  else show(0);
}

// 키보드 포커스(:focus-visible)일 때만 열림. 마우스 클릭으로 생긴 포커스는 무시
function onFocusIn(e: FocusEvent) {
  if ((e.target as HTMLElement | null)?.matches?.(':focus-visible')) show(0);
}
function onFocusOut(e: FocusEvent) {
  if (!rootRef.value?.contains(e.relatedTarget as Node | null)) hide(0);
}

// 트리거에 설명 연결: 열려 있을 때만 (닫힌 뒤 없는 id를 가리키지 않도록)
provide('tooltipTriggerProps', computed(() => ({
  'aria-describedby': open.value ? contentId : undefined,
})));

provide('tooltipOpen', open);
provide('tooltipContentId', contentId);
provide('tooltipContentRef', contentRef);
provide('tooltipStyle', style);
provide('tooltipPlacement', placement);
provide('tooltipAnchorCenter', anchorCenter);

onBeforeUnmount(clearTimer);
</script>

<template>
  <div
    ref="rootRef"
    :class="cn('tooltip inline-flex', props.class)"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointerdown="onPointerDown"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <slot />
  </div>
</template>