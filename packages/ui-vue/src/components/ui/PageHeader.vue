<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-2 pb-8">
    <h2 class="text-2xl font-bold">
      <slot name="title">{{ title }}</slot>
    </h2>
    <p 
      v-if="description || $slots.description"
      class="text-sm text-muted-foreground"
    >
      <slot name="description">{{ description }}</slot>
    </p>
  </div>
</template>