<script setup lang="ts">
import { useFontSize, type FontSizeToken } from '@/composables/useFontSize';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  as?: string;
  text?: FontSizeToken;
  color?: string;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  ellipsis?: boolean;
  multiEllipsis?: 2 | 3 | 4;
  class?: string;
}
const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  text: 'md',
  color: 'text-foreground',
  weight: 'regular',
  ellipsis: false,
})

const { fontSizeClasses } = useFontSize(props);

const textAlignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

const weightMap = {
  regular: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const multiEllipsisMap = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
};

const classes = computed(() => 
  cn(
    'leading-[140%] tracking-[-0.24px]',
    fontSizeClasses.value,
    props.color,
    props.align && textAlignMap[props.align],
    props.weight && weightMap[props.weight],
    props.ellipsis && !props.multiEllipsis && 'truncate',
    props.multiEllipsis && multiEllipsisMap[props.multiEllipsis],
    props.class,
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>