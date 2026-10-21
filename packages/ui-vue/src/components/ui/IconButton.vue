<script setup lang="ts">
import { useRadius, type RadiusProps } from '#/composables/useRadius';
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { colorMap, type IconButtonSize } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps, RadiusProps {
  size?: IconButtonSize;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  disabled: false,
});

const { spacingClasses } = useSpacing(props);
const { radiusClasses } = useRadius(props);

const sizeMap: Record<IconButtonSize, string> = {
  sm: 'size-[24px]',
  md: 'size-[32px]',
  lg: 'size-[40px]',
};

const classes = computed(() =>
  cn(
    'inline-flex shrink-0 items-center justify-center bg-transparent p-0 transition-colors',
    sizeMap[props.size],
    `hover:${colorMap['primary']}`, // icon hover 필요시
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    spacingClasses.value,
    radiusClasses.value,
    props.class,
  )
);
</script>

<template>
  <button type="button" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>