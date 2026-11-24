<script setup lang="ts">
import { useRadius, type RadiusProps } from '#/composables/useRadius';
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { TypoMap, type ButtonSize, type ButtonVariant, type ColorToken, type IconAlign } from '#/types';
import { cn } from '#/utils/cn';
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
  xs:  `h-11 px-3 ${TypoMap['label-xs']} rounded-min`,
  sm:  `h-13 px-5 ${TypoMap['label-sm']} rounded-min`,
  md:  `h-15 px-7 ${TypoMap['label-md']} rounded-sm`,
  lg:  `h-17 px-10 ${TypoMap['label-lg']} rounded-sm`,
  cta: `flex-1 h-[56px] ${TypoMap['label-lg']} rounded-lg`,
};

// style
const styleMap: Record<ButtonVariant, Partial<Record<ColorToken, { base: string; hover?: string }>>> = {
  fill: {
    primary:   { base: 'button-primary-fill text-inverse-static', hover: 'hover:button-primary-fill-hover' },
    secondary: { base: 'element-neutral-darker text-inverse-static', hover: 'hover:element-black-static' },
    tertiary:  { base: 'surface-neutral-subtle text-basic', hover: 'hover:action-neutral-pressed' },
  },
  outline: {
    primary:   { base: 'border button-secondary-border text-secondary button-secondary-fill', hover: 'hover:button-secondary-fill-hover' },
    secondary: { base: 'border button-tertiary-border text-basic button-tertiary-fill', hover: 'hover:button-tertiary-fill-hover' },
    tertiary:  { base: 'border button-tertiary-border text-subtler button-tertiary-fill', hover: 'hover:button-tertiary-fill-hover' },
  },
  transparent: {
    primary:   { base: 'text-primary button-text-fill', hover: 'hover:button-text-fill-hover' },
    secondary: { base: 'text-basic button-text-fill', hover: 'hover:action-neutral-hover' },
    tertiary:  { base: 'text-subtler button-text-fill', hover: 'hover:action-neutral-hover' },
  },
};

const currentStyle = computed(() => styleMap[props.variant]?.[props.color]);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center transition-colors',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none', // 비활성화 클래스 주입
    props.iconAlign === 'top' ? 'flex-col gap-2' : 'flex-row gap-4',
    sizeMap[props.size],
    currentStyle.value?.base,
    !props.disabled && currentStyle.value?.hover,
    props.full && 'w-full',
    spacingClasses.value,
    radiusClasses.value,
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