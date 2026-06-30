<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  as?: string;
  class?: string;
  wrap?: boolean;
  gap?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | '11' | '12' | '13';
  direction?: 'row' | 'row-reverse' | 'col' | 'col-reverse';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  direction: 'row',
  align: 'stretch',
  justify: 'start',
  wrap: false,
});

const directionMap = {
  row: 'flex-row',
  'row-reverse': 'flex-row-reverse',
  col: 'flex-col',
  'col-reverse': 'flex-col-reverse',
};

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

// 디자인 토큰 spacing 1:1 매핑
const gapMap: Record<string, string> = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '5': 'gap-5',
  '6': 'gap-6',
  '7': 'gap-7',
  '8': 'gap-8',
  '9': 'gap-9',
  '10': 'gap-10',
  '11': 'gap-11',
  '12': 'gap-12',
  '13': 'gap-13',
};

const classes = computed(() =>
  cn(
    'flex',
    directionMap[props.direction],
    alignMap[props.align],
    justifyMap[props.justify],
    props.gap && gapMap[props.gap],
    props.wrap && 'flex-wrap',
    props.class,
  )
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>