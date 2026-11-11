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
  offset: 4,
  matchWidth: false,
});

const open = defineModel<boolean>({ default: false });

const baseId = useId();
const triggerId = `${baseId}-trigger`;
const contentId = `${baseId}-content`;

const rootRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const { style } = useFloating({
  anchor: rootRef,
  floating: contentRef,
  open,
  placement: () => props.placement,
  offset: () => props.offset,
  matchWidth: () => props.matchWidth,
});

// 바깥 클릭으로 닫힌 경우에는 포커스를 되돌리지 않음 (Popover와 동일)
let skipRestore = false;

useDismiss({
  open,
  elements: [rootRef, contentRef],
  onDismiss(reason) {
    skipRestore = reason === 'outside';
    open.value = false;
  },
});

// 닫히는 순간 포커스가 콘텐츠 안에 있었다면 트리거로 복귀 (ESC, 항목 선택, Tab)
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
function close() {
  open.value = false;
}

provide('dropdownTriggerProps', computed(() => ({
  id: triggerId,
  'aria-haspopup': 'menu',
  'aria-expanded': open.value,
  'aria-controls': open.value ? contentId : undefined,
  onClick: toggle,
  // 트리거에서 ↓ 키로도 열기
  onKeydown: (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' && !open.value) {
      e.preventDefault();
      open.value = true;
    }
  },
})));

provide('dropdownOpen', open);
provide('dropdownTriggerId', triggerId);
provide('dropdownContentId', contentId);
provide('dropdownContentRef', contentRef);
provide('dropdownStyle', style);
provide('dropdownClose', close);
</script>

<template>
  <div ref="rootRef" :class="cn('dropdown inline-flex', props.class)">
    <slot :open="open" :close="close" />
  </div>
</template>