<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  class?: string;
  full?: boolean;
}

// const props = defineProps<Props>();
const props = withDefaults(defineProps<Props>(), {
  full: false,
});

const classes = computed(() =>
  cn(
    'h-px bg-border shrink-0',
    props.full && 'block -mx-6 lg:-mx-8 w-[calc(100%+3rem)] lg:w-[calc(100%+4rem)]',
    props.class,
  )
)
</script>

<template>
  <div role="separator" aria-orientation="horizontal" :class="classes" />
</template>