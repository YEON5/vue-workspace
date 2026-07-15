<script setup lang="ts">
import { colorMap, textAlignMap, TypoVariantMap, type ColorToken, type TypoAlign, type TypoVariant } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  as?: string;
  variant?: TypoVariant;
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

const classes = computed(() =>
  cn(
    TypoVariantMap[props.variant],
    colorMap[props.color],
    props.align && textAlignMap[props.align],
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