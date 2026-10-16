<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, provide } from 'vue';

export type AccordionType = 'single' | 'multiple';

interface Props {
  type?: AccordionType;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'single',
});

// single: string | undefined, multiple: string[]
const modelValue = defineModel<string | string[] | undefined>();

const openValues = computed<string[]>(() => {
  const v = modelValue.value;
  if (Array.isArray(v)) return v;
  return v === undefined || v === null || v === '' ? [] : [v];
});

function isOpen(value: string) {
  return openValues.value.includes(value);
}

function toggle(value: string) {
  const opened = isOpen(value);

  if (props.type === 'multiple') {
    modelValue.value = opened
      ? openValues.value.filter(v => v !== value)
      : [...openValues.value, value];
    return;
  }

  // single: 열린 항목을 다시 누르면 닫힘
  modelValue.value = opened ? undefined : value;
}

// 가장 가까운 Accordion 기준으로 덮어써지므로 중첩해도 섞이지 않음
provide('accordionIsOpen', isOpen);
provide('accordionToggle', toggle);
</script>

<template>
  <div :class="cn('accordion w-full', props.class)">
    <slot />
  </div>
</template>