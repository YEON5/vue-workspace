<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, inject, type ComputedRef } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const hasDivide = inject<ComputedRef<boolean>>('listHasDivide', computed(() => false));

const itemClasses = computed(() =>
  cn(
    'flex items-center justify-between gap-3',
    hasDivide.value ? 'py-5' : 'py-3', // divide 있음 / 없음
    props.class,
  )
);
</script>

<template>
  <li :class="itemClasses">
    <slot />
  </li>
</template>