<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
  full?: boolean;
  type?: 'thin' | 'base' | 'bold';
}

// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  full: false,
  type: 'base',
});

const classes = computed(() =>
  cn(
    'bg-gray-900 shrink-0',
    props.full ? 'block w-auto -mx-[var(--layout-px)]' : 'w-full',
    props.type === 'thin' && 'h-px my-5',
    props.type === 'base' && 'h-1 my-7',
    props.type === 'bold' && 'h-3 my-9',
    props.class,
  )
)
</script>

<template>
  <div role="separator" aria-orientation="horizontal" :class="classes" />
</template>