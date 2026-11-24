<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap, type ColorToken } from '#/types';
import { cn } from '#/utils/cn';
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
    primary:   `${bgColorMap['primary']} text-inverse-static`,
    secondary: `${bgColorMap['secondary']} text-inverse-static`,
    tertiary:  `${bgColorMap['tertiary']} text-inverse-static`,
    info:      `${bgColorMap['info']} text-inverse-static`,
    error:     `${bgColorMap['error']} text-inverse-static`,
    success:   `${bgColorMap['success']} text-inverse-static`,
    warning:   `${bgColorMap['warning']} text-inverse-static`,
  },
  outline: {
    primary:   `border ${borderColorMap['primary']} ${colorMap['primary']}`,
    secondary: `border ${borderColorMap['secondary']} ${colorMap['secondary']}`,
    tertiary:  `border ${borderColorMap['tertiary']} ${colorMap['tertiary']}`,
    info:      `border ${borderColorMap['info']} ${colorMap['info']}`,
    error:     `border ${borderColorMap['error']} ${colorMap['error']}`,
    success:   `border ${borderColorMap['success']} ${colorMap['success']}`,
    warning:   `border ${borderColorMap['warning']} ${colorMap['warning']}`,
  },
};

const shapeMap: Record<TagType, string> = {
  square:  'rounded-min',
  rounded: 'rounded-full',
};

const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center gap-3 px-5 py-2',
    TypoMap['label-sm'],
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