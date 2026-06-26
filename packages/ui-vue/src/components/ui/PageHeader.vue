<script setup lang="ts">
interface Props {
  title: string;
  subDesc?: string;
  desc?: string;
  bottomSpacing?: 'none' | 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  bottomSpacing: 'md',
});
const spacingClass = {
  none: 'pb-0',
  sm: 'pb-6',
  md: 'pb-10',
  lg: 'pb-11'
}[props.bottomSpacing];
</script>

<template>
  <div 
    class="flex flex-col"
    :class="[
      spacingClass,
      subDesc? 'gap-2' : 'gap-3',
    ]"
  >
    <h2 class="text-2xl font-bold">
      <slot name="title">{{ title }}</slot>
    </h2>
    <template v-if="subDesc || $slots.subDesc">
      <p class="text-md text-muted-foreground">
        <slot name="subDesc">{{ subDesc }}</slot>
      </p>
    </template>
    <template v-if="desc || $slots.desc">
      <p class="text-sm text-muted-foreground">
        <slot name="desc">{{ desc }}</slot>
      </p>
    </template>
  </div>
</template>