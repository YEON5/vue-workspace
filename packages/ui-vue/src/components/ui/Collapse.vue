<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, provide, useId } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const open = defineModel<boolean>({ default: false });
const baseId = useId();

provide('collapseOpen', computed(() => open.value));
provide('collapseToggle', () => {
  open.value = !open.value;
});
provide('collapseContentId', `${baseId}-content`);
</script>

<template>
  <div :class="cn('collapse-wrap', props.class)">
    <slot />
  </div>
</template>