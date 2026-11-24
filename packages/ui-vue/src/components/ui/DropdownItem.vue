<script setup lang="ts">
import { colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject } from 'vue';

interface Props {
  disabled?: boolean;
  danger?: boolean; // 삭제 등 위험 동작
  closeOnSelect?: boolean; // 선택 후 메뉴 닫기
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  danger: false,
  closeOnSelect: true,
});

const emit = defineEmits<{ select: [e: MouseEvent] }>();

const close = inject<() => void>('dropdownClose', () => {});

// 닫히기 전에 select를 먼저 알림 → 포커스는 Dropdown의 watch가 트리거로 복귀
function onClick(e: MouseEvent) {
  emit('select', e);
  if (props.closeOnSelect) close();
}

const classes = computed(() =>
  cn(
    'flex w-full items-center gap-3 px-7 py-3 text-left text-body-sm transition-colors',
    'hover:action-neutral-hover focus:action-neutral-hover focus:outline-hidden',
    props.danger ? colorMap['error'] : colorMap['body'],
    props.disabled && cn(colorMap['disabled'], 'cursor-not-allowed hover:bg-transparent'),
    props.class,
  )
);
</script>

<template>
  <!-- tabindex -1: Tab 순서에서 빼고 DropdownContent의 방향키로만 이동 -->
  <button
    type="button"
    role="menuitem"
    tabindex="-1"
    :disabled="disabled"
    :class="classes"
    @click="onClick"
  >
    <slot />
  </button>
</template>
