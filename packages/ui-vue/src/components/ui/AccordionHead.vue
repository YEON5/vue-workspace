<script setup lang="ts">
import { borderColorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { IArrowSelect } from '#components';
import { computed, inject, type ComputedRef } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const isOpen = inject<ComputedRef<boolean>>('accordionOpen', computed(() => false));
const isDisabled = inject<ComputedRef<boolean>>('accordionDisabled', computed(() => false));
const toggle = inject<() => void>('accordionToggle:item', () => {});
const headId = inject<string>('accordionHeadId', '');
const contentId = inject<string>('accordionContentId', '');

const wrapperClasses = computed(() =>
  cn(
    'accordion-head border-b transition-colors',
    isOpen.value ? borderColorMap['black'] : borderColorMap['tertiary'],
  )
);
const headClasses = computed(() =>
  cn(
    'flex items-center justify-between w-full gap-3 py-5 text-left transition-colors',
    TypoMap['body-m'],
    isOpen.value && 'font-medium', // active 상태
    !isDisabled.value && 'cursor-pointer',
    isDisabled.value && 'opacity-50',
    props.class,
  )
);

const iconClasses = computed(() =>
  cn('size-5 shrink-0 transition-transform duration-200', isOpen.value && 'rotate-180')
);
</script>

<template>
  <div :class="wrapperClasses">
    <button
      :id="headId"
      type="button"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      :disabled="isDisabled"
      :class="headClasses"
      @click="toggle"
    >
      <span class="flex min-w-0 flex-1 items-center gap-4">
        <span v-if="$slots.prefix" class="shrink-0 inline-flex">
          <slot name="prefix" />
        </span>
        <span class="min-w-0"><slot /></span>
      </span>
      <IArrowSelect :class="iconClasses" aria-hidden="true" />
    </button>
  </div>
</template>