<script setup lang="ts">
import { useRadius, type RadiusProps } from '@/composables/useRadius';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, type ColorToken } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type ButtonVariant = 'fill' | 'outline' | 'transparent' | 'icon';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'cta';
export type IconAlign = 'left' | 'right' | 'top';

interface Props extends SpacingProps, RadiusProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorToken;
  iconAlign?: IconAlign;
  full?: boolean;
  disabled?: boolean;
  class?: string;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'fill',
  size: 'md',
  color: 'primary',
  iconAlign: 'left',
  full: false,
  disabled: false,
});

const { spacingClasses } = useSpacing(props);
const { radiusClasses } = useRadius(props);

// size map (높이, 패딩, 기본 폰트 사이즈)
const sizeMap: Record<ButtonSize, string> = {
  xs:  `h-7 px-2 ${TypoMap['label-xs']} rounded-md`,
  sm:  `h-8 px-3 ${TypoMap['label-s']} rounded-md`,
  md:  `h-9 px-4 ${TypoMap['label-m']} rounded-lg`,
  lg:  `h-10 px-6 ${TypoMap['label-l']} rounded-lg`,
  cta: `flex-1 h-[56px] ${TypoMap['label-l']} rounded-xl`,
};

// style
const styleMap: Record<Exclude<ButtonVariant, 'icon'>, Partial<Record<ColorToken, string>>> = {
  fill: {
    primary:   'bg-mint-500 text-white hover:bg-mint-600',
    secondary: 'bg-gray-800 text-white hover:bg-gray-900',
    tertiary:  'bg-gray-100 text-gray-900 hover:bg-gray-200',
  },
  outline: {
    primary:   'border border-mint-500 text-mint-500 bg-white hover:bg-mint-50',
    secondary: 'border border-gray-300 text-gray-900 bg-white hover:bg-gray-50',
    tertiary:  'border border-gray-200 text-gray-500 bg-white hover:bg-gray-50',
  },
  transparent: {
    primary:   'text-mint-500 bg-transparent hover:bg-mint-50',
    secondary: 'text-gray-900 bg-transparent hover:bg-gray-100',
    tertiary:  'text-gray-500 bg-transparent hover:bg-gray-50',
  },
};

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-colors shrink-0',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    props.iconAlign === 'top' ? 'flex-col gap-1' : 'flex-row gap-1.5',
    props.variant !== 'icon' && sizeMap[props.size],
    props.variant !== 'icon'
      ? styleMap[props.variant][props.color]
      : 'p-0 bg-transparent',
    props.full && props.variant !== 'icon' && 'w-full',
    spacingClasses.value,
    props.variant !== 'icon' && radiusClasses.value,
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