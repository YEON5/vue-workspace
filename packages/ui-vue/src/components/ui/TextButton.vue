<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { TypoMap, type ColorToken, type IconAlign, type TextButtonSize } from '#/types';
import { cn } from '#/utils/cn';
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
  sm: `${TypoMap['label-sm']}`,
  md: `${TypoMap['label-md']}`,
  lg: `${TypoMap['label-lg']}`,
};

// color
const colorMap: Partial<Record<ColorToken, { base: string; hover?: string }>> = {
  primary:   { base: 'text-primary underline-offset-4', hover: 'hover:text-primary-70 hover:underline' },
  secondary: { base: 'text-basic underline-offset-4', hover: 'hover:text-bolder hover:underline' },
  tertiary:  { base: 'text-subtler', hover: 'hover:text-subtle' },
  error:     { base: 'text-danger' },
  success:   { base: 'text-success' },
  warning:   { base: 'text-warning' },
  black:     { base: 'text-bolder' },
};

const currentColor = computed(() => colorMap[props.color]);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-all',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none', // 비활성화 클래스 주입
    props.iconAlign === 'top' ? 'flex-col gap-2' : 'flex-row gap-4',
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