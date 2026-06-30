<script setup lang="ts">
import { cn } from '@/utils/cn';
import type { Component } from 'vue';
import { computed } from 'vue';

interface Props {
  icon?: Component;
  iconClass?: string;
  title: string;
  description?: string;
  class?: string;
  size?: 'sm' | 'md' | 'lg'; // 영역 크기에 따른 padding 대응
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
});

const sizeMap = {
  sm: 'py-8 gap-2',
  md: 'py-16 gap-3',
  lg: 'py-24 gap-4',
};

const iconSizeMap = {
  sm: 'size-[32px]',
  md: 'size-[40px]',
  lg: 'size-[48px]',
};

const classes = computed(() =>
  cn(
    'flex flex-col items-center justify-center text-center w-full',
    sizeMap[props.size],
    props.class,
  )
);
</script>

<template>
  <div :class="classes">
    <slot name="icon">
      <component
        :is="icon"
        v-if="icon"
        :class="cn(iconSizeMap[size], 'text-muted-foreground', iconClass)"
      />
    </slot>

    <h3 class="text-md font-medium text-foreground">
      <slot name="title">{{ title }}</slot>
    </h3>

    <p
      v-if="description || $slots.description"
      class="text-sm text-muted-foreground"
    >
      <slot name="description">{{ description }}</slot>
    </p>

    <div v-if="$slots.action" class="mt-2">
      <slot name="action" />
    </div>
  </div>
</template>