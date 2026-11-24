<script setup lang="ts">
</script>

<template>
  <!-- BottomSticky -->
  <div class="sticky bottom-0 left-0 z-50 w-full flex items-center justify-between gap-5 px-10 pt-10 pb-[calc(20px+env(safe-area-inset-bottom))] background-default">
    <slot />
  </div>
  <!-- //BottomSticky -->
</template>