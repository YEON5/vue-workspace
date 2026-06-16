<script setup lang="ts">
// interface Props {
//   hiddenFooter?: boolean;
// }
// // 기본값
// const props = withDefaults(defineProps<Props>(), {
//   hiddenFooter: false,
// });
</script>

<template>
  <footer 
    class="flex-none flex flex-col items-center justify-center w-full h-auto pb-[env(safe-area-inset-bottom)] bg-background border-t border-border"
  >
    <div class="flex flex-col items-center justify-between w-full max-w-7xl px-4 py-6 sm:flex-row gap-4">
      <slot>
        <p class="text-sm text-gray-500">
          © 2026 Your Company. All rights reserved.
        </p>
      </slot>
    </div>
  </footer>
</template>
