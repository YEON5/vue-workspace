<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, type ColorToken } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type TextButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type IconAlign = 'left' | 'right' | 'top';

interface Props extends SpacingProps {
  size?: TextButtonSize;
  color?: ColorToken;
  iconAlign?: IconAlign;
  disabled?: boolean;
  class?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  iconAlign: 'left',
  disabled: false,
});

const { spacingClasses } = useSpacing(props);


// size
const sizeMap: Record<TextButtonSize, string> = {
  xs: `${TypoMap['label-xs']} gap-1`,
  sm: `${TypoMap['label-s']} gap-1`,
  md: `${TypoMap['label-m']} gap-1.5`,
  lg: `${TypoMap['label-l']} gap-2`,
};

// color
const colorMap: Partial<Record<ColorToken, string>> = {
  primary:   'text-mint-500 hover:text-mint-600 hover:underline underline-offset-4',
  secondary: 'text-gray-800 hover:text-gray-900 hover:underline underline-offset-4',
  tertiary:  'text-gray-500 hover:text-gray-700',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-all outline-none rounded-sm',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    props.iconAlign === 'top' ? 'flex-col gap-1' : 'flex-row gap-1.5',
    sizeMap[props.size],
    colorMap[props.color],
    spacingClasses.value,
    props.class,
  )
);

const componentTag = computed(() => (props.to ? 'RouterLink' : 'button'));
</script>

<template>
  <component
    :is="componentTag"
    :to="to"
    :type="!to ? 'button' : undefined"
    :class="classes"
    :disabled="disabled"
  >
    <slot v-if="iconAlign !== 'right'" name="icon" />
    <slot />
    <slot v-if="iconAlign === 'right'" name="icon" />
  </component>
</template>