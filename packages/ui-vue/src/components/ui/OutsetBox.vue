<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  as?: string;
  class?: string;
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'div',
});

const classes = computed(() =>
  cn(
    'relative -mx-[var(--layout-px)]',
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
:deep(.ui-section) {
  padding: 0 var(--layout-px);
}
</style>