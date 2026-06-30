<script setup lang="ts">
interface Props {
  title: string;
  subDescription?: string;
  description?: string;
  bottomSpacing?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  bottomSpacing: 'md',
});
const spacingClass = {
  none: 'pb-0',
  sm: 'pb-6',
  md: 'pb-8',
  lg: 'pb-10'
}[props.bottomSpacing];
</script>

<template>
  <div 
    class="flex flex-col"
    :class="[
      spacingClass,
      subDescription? 'gap-2' : 'gap-3',
    ]"
  >
    <h2 class="text-2xl font-bold">
      <slot name="title">{{ title }}</slot>
    </h2>
    <template v-if="subDescription || $slots.subDescription">
      <p class="text-md text-muted-foreground">
        <slot name="subDescription">{{ subDescription }}</slot>
      </p>
    </template>
    <template v-if="description || $slots.description">
      <p class="text-sm text-muted-foreground">
        <slot name="description">{{ description }}</slot>
      </p>
    </template>
  </div>
</template>