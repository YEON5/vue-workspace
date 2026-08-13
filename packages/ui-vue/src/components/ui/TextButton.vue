<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, type ColorToken, type IconAlign, type TextButtonSize } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps {
  size?: TextButtonSize;
  color?: ColorToken;
  iconAlign?: IconAlign;
  disabled?: boolean;
  class?: string;
  to?: string; // button or RouterLink
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
  xs: `${TypoMap['label-xs']}`,
  sm: `${TypoMap['label-s']}`,
  md: `${TypoMap['label-m']}`,
  lg: `${TypoMap['label-l']}`,
};

// color
const colorMap: Partial<Record<ColorToken, { base: string; hover?: string }>> = {
  primary:   { base: 'text-mint-500 underline-offset-4', hover: 'hover:text-mint-600 hover:underline' },
  secondary: { base: 'text-gray-800 underline-offset-4', hover: 'hover:text-gray-900 hover:underline' },
  tertiary:  { base: 'text-gray-500', hover: 'hover:text-gray-700' },
  error:     { base: 'text-destructive' },
  success:   { base: 'text-blue-500' },
  warning:   { base: 'text-orange-500' },
  black:     { base: 'text-gray-black' },
};

const currentColor = computed(() => colorMap[props.color]);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-all',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none', // 비활성화 클래스 주입
    props.iconAlign === 'top' ? 'flex-col gap-1' : 'flex-row gap-1.5',
    sizeMap[props.size],
    currentColor.value?.base, // 기본(base) 스타일 주입
    !props.disabled && currentColor.value?.hover, // disabled가 아닐 때만 hover 스타일 주입
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