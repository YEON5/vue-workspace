<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue';
import { useHeaderState } from '@/composables/useHeaderState';

// header props
const { isVisible, title, leftBtn, rightBtn } = useHeaderState();
</script>

<template>
  <div class="flex flex-col min-h-dvh bg-background text-foreground">
    <AppHeader 
      v-if="isVisible"
      :title="title"
      :left-btn="leftBtn"
      :right-btn="rightBtn" 
    />
    
    <main class="flex-1">
      <slot />
    </main>

    <slot name="footer" />
  </div>
</template>