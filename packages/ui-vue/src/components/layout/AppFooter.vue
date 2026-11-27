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
    class="flex-none flex flex-col items-center justify-center w-full h-auto pb-[env(safe-area-inset-bottom)] background-default border-t border-neutral-light"
  >
    <div class="flex flex-col items-center justify-between w-full max-w-7xl px-7 py-10 medium:flex-row gap-7">
      <slot>
        <p class="text-body-sm text-subtler">
          © 2026 Your Company. All rights reserved.
        </p>
      </slot>
    </div>
  </footer>
</template>
