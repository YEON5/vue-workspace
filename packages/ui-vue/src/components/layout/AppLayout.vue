<script setup lang="ts">
  // components/layout/AppLayout.vue
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background text-foreground">
    <slot name="header" />

    <main class="flex flex-col flex-1 w-full">
      <slot />
    </main>

    <slot name="footer" />
  </div>
</template>