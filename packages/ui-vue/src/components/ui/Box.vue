<script setup lang="ts">
import { useRadius, type RadiusProps } from '@/composables/useRadius';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps, RadiusProps {
  as?: string;  
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});

const { spacingClasses } = useSpacing(props);
const { radiusClasses } = useRadius(props);

const classes = computed(() =>
  cn(
    spacingClasses.value,
    radiusClasses.value,
    props.class,
  )
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>