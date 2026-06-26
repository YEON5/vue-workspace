<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();
const classes = computed(() =>
  cn(
    'relative -mx-[var(--layout-px)]',
    props.class,
  )
)

</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>