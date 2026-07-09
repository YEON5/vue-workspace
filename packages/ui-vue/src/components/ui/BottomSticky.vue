<script setup lang="ts">
</script>

<template>
  <!-- BottomSticky -->
  <div class="sticky bottom-0 left-0 z-50 w-full flex items-center justify-between gap-3 px-6 pt-6 pb-[calc(20px+env(safe-area-inset-bottom))] bg-background">
    <slot />
  </div>
  <!-- //BottomSticky -->
</template>