<script setup lang="ts">
import { useRadius, type RadiusProps } from '@/composables/useRadius';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, type ButtonSize, type ButtonVariant, type ColorToken, type IconAlign } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';


interface Props extends SpacingProps, RadiusProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: ColorToken;
  iconAlign?: IconAlign;
  full?: boolean;
  disabled?: boolean;
  class?: string;
  to?: string; // button or RouterLink
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
const styleMap: Record<Exclude<ButtonVariant, 'icon'>, Partial<Record<ColorToken, { base: string; hover?: string }>>> = {
  fill: {
    primary:   { base: 'bg-mint-500 text-white', hover: 'hover:bg-mint-600' },
    secondary: { base: 'bg-gray-800 text-white', hover: 'hover:bg-gray-900' },
    tertiary:  { base: 'bg-gray-100 text-gray-900', hover: 'hover:bg-gray-200' },
  },
  outline: {
    primary:   { base: 'border border-mint-500 text-mint-500 bg-white', hover: 'hover:bg-mint-50' },
    secondary: { base: 'border border-gray-300 text-gray-900 bg-white', hover: 'hover:bg-gray-50' },
    tertiary:  { base: 'border border-gray-200 text-gray-500 bg-white', hover: 'hover:bg-gray-50' },
  },
  transparent: {
    primary:   { base: 'text-mint-500 bg-transparent', hover: 'hover:bg-mint-50' },
    secondary: { base: 'text-gray-900 bg-transparent', hover: 'hover:bg-gray-100' },
    tertiary:  { base: 'text-gray-500 bg-transparent', hover: 'hover:bg-gray-50' },
  },
};

const currentStyle = computed(() =>
  props.variant !== 'icon' ? styleMap[props.variant]?.[props.color] : undefined
);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-colors',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none', // 비활성화 클래스 주입
    props.iconAlign === 'top' ? 'flex-col gap-1' : 'flex-row gap-1.5',
    props.variant !== 'icon' && sizeMap[props.size],
    props.variant !== 'icon' // 기본(base) 스타일 주입
      ? currentStyle.value?.base
      : 'p-0 bg-transparent',
    props.variant !== 'icon' && !props.disabled && currentStyle.value?.hover, // disabled가 아닐 때만 hover 스타일 주입
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