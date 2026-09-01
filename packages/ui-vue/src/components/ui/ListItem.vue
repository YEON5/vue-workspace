<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const itemClasses = computed(() =>
  cn('flex items-center justify-between gap-3 py-4', props.class)
);
</script>

<template>
  <li :class="itemClasses">
    <slot />
  </li>
</template>