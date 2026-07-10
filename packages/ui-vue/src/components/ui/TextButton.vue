<script setup lang="ts">
import { useFontSize, type FontSizeProps } from '@/composables/useFontSize';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type TextButtonSize = 'sm' | 'md' | 'lg';
export type TextButtonColor = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type IconAlign = 'left' | 'right';

interface Props extends FontSizeProps, SpacingProps {
  size?: TextButtonSize;
  color?: TextButtonColor;
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
const { fontSizeClasses } = useFontSize(props);

// size (텍스트 크기 및 아이콘과의 간격)
const sizeMap: Record<TextButtonSize, string> = {
  sm: 'text-sm gap-1',
  md: 'text-md gap-1.5',
  lg: 'text-lg gap-2',
};

// color
const colorMap: Record<TextButtonColor, string> = {
  primary: 'text-mint-500 hover:text-mint-600 hover:underline underline-offset-4',
  secondary: 'text-gray-800 hover:text-gray-900 hover:underline underline-offset-4',
  tertiary: 'text-gray-500 hover:text-gray-700',
  danger: 'text-red-500 hover:text-red-600 hover:underline underline-offset-4',
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center font-medium transition-all outline-none rounded-sm', // 공통
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none', // disabled 상태
    sizeMap[props.size],
    colorMap[props.color],
    fontSizeClasses.value,
    spacingClasses.value,    
    props.class,
  )
);

// 링크/버튼 하이브리드 로직
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
    <slot v-if="iconAlign === 'left'" name="icon" />
    <slot />
    <slot v-if="iconAlign === 'right'" name="icon" />
  </component>
</template>