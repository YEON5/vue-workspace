<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, inject, provide, useId } from 'vue';

interface Props {
  value: string;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const isOpenIn = inject<(value: string) => boolean>('accordionIsOpen', () => false);
const toggleIn = inject<(value: string) => void>('accordionToggle', () => {});

const baseId = useId();

provide('accordionOpen', computed(() => isOpenIn(props.value)));
provide('accordionDisabled', computed(() => props.disabled));
provide('accordionToggle:item', () => {
  if (!props.disabled) toggleIn(props.value);
});
provide('accordionHeadId', `${baseId}-head`);
provide('accordionContentId', `${baseId}-content`);
</script>

<template>
  <div :class="cn('accordion-item', props.class)">
    <slot />
  </div>
</template>