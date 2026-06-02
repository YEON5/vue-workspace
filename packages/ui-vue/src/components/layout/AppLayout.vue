<script setup lang="ts">
  // components/layout/AppLayout.vue
</script>

<template>
  <div class="flex flex-col min-h-screen bg-background text-foreground pt-[env(safe-area-inset-top)]">
    <slot name="header" />

    <main class="flex flex-col flex-1 w-full relative">
      <slot />
    </main>

    <slot name="footer" />
  </div>
</template>
