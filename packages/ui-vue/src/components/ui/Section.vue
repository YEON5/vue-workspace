<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  as?: string;
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'section',
});

const classes = computed(() =>
  cn(
    'ui-section flex flex-col relative w-full',
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
  margin-top: 4rem;
}
</style>