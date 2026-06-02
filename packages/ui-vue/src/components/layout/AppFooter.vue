<script setup lang="ts">
// components/layout/AppFooter.vue
</script>

<template>
  <footer 
    class="w-full bg-background border-t border-border pb-[env(safe-area-inset-bottom)]"
  >
    <div class="px-4 py-6 mx-auto max-w-7xl flex flex-col sm:flex-row justify-between items-center gap-4">
      <slot>
        <p class="text-sm text-gray-500">
          © 2026 Your Company. All rights reserved.
        </p>
      </slot>
    </div>
  </footer>
</template>
