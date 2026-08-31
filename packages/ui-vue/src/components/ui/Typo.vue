<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { colorMap, textAlignMap, TypoMap, type ColorToken, type TypoAlign, type TypoToken } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps {
  as?: string;
  variant?: TypoToken;
  color?: ColorToken;
  align?: TypoAlign;
  ellipsis?: boolean;
  multiEllipsis?: 2 | 3 | 4;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'p',
  variant: 'body-m',
  color: 'body',
  ellipsis: false,
});

const multiEllipsisMap = {
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
};

const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    TypoMap[props.variant],
    colorMap[props.color],
    props.align && textAlignMap[props.align],
    props.ellipsis && !props.multiEllipsis && 'truncate',
    props.multiEllipsis && multiEllipsisMap[props.multiEllipsis],
    spacingClasses.value,
    props.class,
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>