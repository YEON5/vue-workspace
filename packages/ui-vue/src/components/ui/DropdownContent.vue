<script setup lang="ts">
import { borderColorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, nextTick, ref, watch, type Ref } from 'vue';

// Teleport가 root라 attrs가 자동 전달되지 않으므로 직접 바인딩
defineOptions({ inheritAttrs: false });

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const open = inject<Ref<boolean>>('dropdownOpen', ref(false));
const triggerId = inject<string>('dropdownTriggerId', '');
const contentId = inject<string>('dropdownContentId', '');
const contentRef = inject<Ref<HTMLElement | null>>('dropdownContentRef', ref(null));
const style = inject<Ref<Record<string, string>>>('dropdownStyle', ref({}));
const close = inject<() => void>('dropdownClose', () => {});

function setContentRef(el: unknown) {
  contentRef.value = (el as HTMLElement | null) ?? null;
}

function getItems() {
  return Array.from(
    contentRef.value?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? [],
  );
}

// 열리면 첫 번째 항목으로 포커스 (항목이 없으면 콘텐츠로)
watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  (getItems()[0] ?? contentRef.value)?.focus({ preventScroll: true });
});

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Tab') {
    close();
    return;
  }

  const items = getItems();
  if (!items.length) return;

  const index = items.indexOf(document.activeElement as HTMLElement);
  let next: number | null = null;

  if (e.key === 'ArrowDown') next = (index + 1) % items.length;
  else if (e.key === 'ArrowUp') next = (index - 1 + items.length) % items.length;
  else if (e.key === 'Home') next = 0;
  else if (e.key === 'End') next = items.length - 1;

  if (next !== null) {
    e.preventDefault();
    items[next].focus();
  }
}

const contentClasses = computed(() =>
  cn(
    'z-50 min-w-[160px] overflow-hidden rounded-lg border bg-white py-1 shadow-lg focus:outline-none',
    borderColorMap['tertiary'],
    props.class,
  )
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      :id="contentId"
      :ref="setContentRef"
      role="menu"
      tabindex="-1"
      :aria-labelledby="triggerId"
      v-bind="$attrs"
      :style="style"
      :class="contentClasses"
      @keydown="onKeydown"
    >
      <slot />
    </div>
  </Teleport>
</template>