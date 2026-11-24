<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps {
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
const { spacingClasses } = useSpacing(props);
const classes = computed(() =>
  cn(
    'divider-neutral shrink-0',
    // horizontal
    props.direction === 'horizontal' && [
      props.full ? 'block w-auto -mx-[var(--layout-px)]' : 'w-full',
      props.type === 'thin' && 'h-0 border-t my-11',
      props.type === 'base' && 'h-0 border-t-2 my-13',
      props.type === 'bold' && 'h-0 border-t-4 my-15',
    ],
    // vertical
    props.direction === 'vertical' && [
      'inline-block align-middle w-0 border-l h-7 mx-3',
    ],
    spacingClasses.value,
    props.class,
  )
)
</script>

<template>
  <div role="separator" :aria-orientation="direction" :class="classes" />
</template>