<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import { align, isVisible, leftBtn, rightBtn, title, transparent } from '@/composables/useHeaderState'; // header props

</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background text-foreground">
    <AppHeader 
      v-if="isVisible"
      :align="align"
      :transparent="transparent"
      :title="title"
      :left-btn="leftBtn"
      :right-btn="rightBtn" 
    />
    <!-- main -->
    <main class="flex flex-col flex-1">
      <slot />
    </main>
    <!-- //main -->

    <slot name="footer" />
  </div>
</template>