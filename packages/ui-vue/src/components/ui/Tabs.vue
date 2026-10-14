<script setup lang="ts">
import { cn } from '#/utils/cn';
import { provide, useId } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const modelValue = defineModel<unknown>();
const baseId = useId();

provide('tabBaseId', baseId);
provide('tabModel', modelValue);
</script>

<template>
  <div
    :class="cn(
      'w-full',
      props.class
    )">
    <slot />
  </div>
</template>