<script setup lang="ts">
import { TypoMap, colorMap } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

interface Props {
  forId?: string; // input의 id와 연결
  required?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  disabled: false,
});

const classes = computed(() =>
  cn(
    'inline-flex items-center',
    TypoMap['label-m'],
    props.disabled ? colorMap['disabled'] : colorMap['secondary'],
    props.class
  )
);
</script>

<template>
  <label :for="forId" :class="classes">
    <slot />
    <span v-if="required" class="text-lg text-destructive ml-0.5">*</span>
  </label>
</template>