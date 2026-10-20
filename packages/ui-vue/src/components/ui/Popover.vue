<script setup lang="ts">
import { useDismiss } from '#/composables/useDismiss';
import { useFloating } from '#/composables/useFloating';
import type { Placement } from '#/types';
import { cn } from '#/utils/cn';
import { computed, provide, ref, useId, watch } from 'vue';

interface Props {
  placement?: Placement;
  offset?: number;
  matchWidth?: boolean; // 콘텐츠 최소 너비를 트리거 너비에 맞춤
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-start',
  offset: 8,
  matchWidth: false,
});

const open = defineModel<boolean>({ default: false });

const baseId = useId();
const triggerId = `${baseId}-trigger`;
const contentId = `${baseId}-content`;

// root가 앵커: Content는 body로 Teleport되므로 root 크기는 트리거 크기와 같음
const rootRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const { style, placement, anchorCenter } = useFloating({
  anchor: rootRef,
  floating: contentRef,
  open,
  placement: () => props.placement,
  offset: () => props.offset,
  matchWidth: () => props.matchWidth,
});

// 바깥 클릭으로 닫힌 경우에는 포커스를 되돌리지 않음 (클릭한 요소가 포커스를 가져가도록)
let skipRestore = false;

useDismiss({
  open,
  elements: [rootRef, contentRef],
  onDismiss(reason) {
    skipRestore = reason === 'outside';
    open.value = false;
  },
});

// 닫히는 순간(DOM 제거 전)에 포커스가 콘텐츠 안에 있었다면 트리거로 복귀
watch(open, (isOpen) => {
  if (isOpen) return;

  const hadFocusInside = !!contentRef.value?.contains(document.activeElement);
  if (!skipRestore && hadFocusInside) {
    rootRef.value?.querySelector<HTMLElement>(`[id="${triggerId}"]`)?.focus();
  }
  skipRestore = false;
});


function toggle() {
  open.value = !open.value;
}

// PopoverTrigger가 inject: computed라서 aria-expanded가 갱신됨
provide('popoverTriggerProps', computed(() => ({
  id: triggerId,
  'aria-haspopup': 'dialog',
  'aria-expanded': open.value,
  'aria-controls': open.value ? contentId : undefined,
  onClick: toggle,
})));

// PopoverContent가 inject
provide('popoverOpen', open);
provide('popoverContentId', contentId);
provide('popoverContentRef', contentRef);
provide('popoverStyle', style);
provide('popoverPlacement', placement);
provide('popoverAnchorCenter', anchorCenter);
</script>

<template>
  <div ref="rootRef" :class="cn('popover inline-flex', props.class)">
    <slot :open="open" :close="() => (open = false)" />
  </div>
</template>