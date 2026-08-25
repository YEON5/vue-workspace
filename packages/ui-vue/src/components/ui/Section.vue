<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props extends SpacingProps {
  as?: string;
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'section',
});
const { spacingClasses } = useSpacing(props);
const classes = computed(() =>
  cn(
    'ui-section relative w-full',
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

<style scoped>
.ui-section + .ui-section {
  margin-top: 40px;
}
</style>