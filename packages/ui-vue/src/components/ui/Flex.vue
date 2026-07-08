<script setup lang="ts">
import { useRadius, type RadiusProps } from '@/composables/useRadius';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps, RadiusProps {
  as?: string;
  class?: string;
  wrap?: boolean;
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

const { spacingClasses } = useSpacing(props);
const { radiusClasses } = useRadius(props);

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

const classes = computed(() =>
  cn(
    'flex',
    directionMap[props.direction],
    alignMap[props.align],
    justifyMap[props.justify],
    props.wrap && 'flex-wrap',
    spacingClasses.value,
    radiusClasses.value,
    props.class,
  )
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>