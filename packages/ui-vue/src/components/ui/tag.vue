<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap, type ColorToken } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type TagVariant = 'solid' | 'outline';
export type TagType = 'square' | 'rounded'

interface Props extends SpacingProps {
  as?: string;
  variant?: TagVariant;
  type?: TagType;
  color?: ColorToken;
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  variant: 'solid',
  type: 'square',
  color: 'primary',
});

const styleMap: Record<TagVariant, Partial<Record<ColorToken, string>>> = {
  solid: {
    primary:   `${bgColorMap['primary']} text-white`,
    secondary: `${bgColorMap['secondary']} text-white`,
    info:      `${bgColorMap['info']} text-white`,
    error:     `${bgColorMap['error']} text-white`,
    success:   `${bgColorMap['success']} text-white`,
    warning:   `${bgColorMap['warning']} text-white`,
  },
  outline: {
    primary:   `border ${borderColorMap['primary']} ${colorMap['primary']}`,
    secondary: `border ${borderColorMap['secondary']} ${colorMap['secondary']}`,
    info:      `border ${borderColorMap['info']} ${colorMap['info']}`,
    error:     `border ${borderColorMap['error']} ${colorMap['error']}`,
    success:   `border ${borderColorMap['success']} ${colorMap['success']}`,
    warning:   `border ${borderColorMap['warning']} ${colorMap['warning']}`,
  },
};

const shapeMap: Record<TagType, string> = {
  square:  'rounded-md',
  rounded: 'rounded-full',
};

const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-2 px-3 py-1',
    TypoMap['label-s'],
    styleMap[props.variant][props.color],
    shapeMap[props.type], 
    spacingClasses.value,
    props.class,
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot name="icon" />
    <slot />
  </component>
</template>