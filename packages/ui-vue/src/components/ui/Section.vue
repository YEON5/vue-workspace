<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
  divider?: boolean;
}

const props = defineProps<Props>();

const classes = computed(() =>
  cn(
    'flex flex-col flex-1 relative',
    '[&+&]:mt-10',
    props.divider && 'pt-12 before:content-[""] before:absolute before:top-0 before:left-0 before:w-full before:h-2 before:bg-muted',
    props.class,
  )
)
</script>

<template>
  <section :class="classes">
    <slot />
  </section>
</template>