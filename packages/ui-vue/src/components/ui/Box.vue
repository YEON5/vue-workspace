<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps {
  as?: string;
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});
const { spacingClasses } = useSpacing(props);
const classes = computed(() =>
  cn(
    spacingClasses.value,
    props.class,
  )
)
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>