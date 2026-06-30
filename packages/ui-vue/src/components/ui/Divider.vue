<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
  full?: boolean;
  type?: 'thin' | 'base' | 'bold';
  direction?: 'horizontal' | 'vertical';
}

const props = withDefaults(defineProps<Props>(), {
  full: false,
  type: 'base',
  direction: 'horizontal',
});

const classes = computed(() =>
  cn(
    'bg-gray-300 shrink-0',
    // horizontal
    props.direction === 'horizontal' && [
      props.full ? 'block w-auto -mx-[var(--layout-px)]' : 'w-full',
      props.type === 'thin' && 'h-px my-5',
      props.type === 'base' && 'h-1 my-7',
      props.type === 'bold' && 'h-2 my-9',
    ],
    // vertical
    props.direction === 'vertical' && [
      'inline-block align-middle w-px h-4 mx-2',
    ],
    props.class,
  )
)
</script>

<template>
  <div role="separator" :aria-orientation="direction" :class="classes" />
</template>