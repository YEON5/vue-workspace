<script setup lang="ts">
import type { Component } from 'vue';
import Container from './Container.vue';

interface Props {
  icon?: Component;
  iconClass?: string;
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<template>
  <Container :padded="false" class="items-center pt-[180px]">
    <!-- <Container :padded="false" centered> -->
    <div class="flex flex-col items-center gap-4 text-center">
      <slot name="icon">
        <component
          :is="icon"
          v-if="icon"
          class="size-[80px]"
          :class="iconClass"
        />
      </slot>

      <h2 class="text-xl font-bold text-foreground">
        <slot name="title">{{ title }}</slot>
      </h2>

      <p
        v-if="description || $slots.description"
        class="text-sm text-muted-foreground"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- 완료 문구 아래 추가 요소 (배너, 안내 박스 등) -->
    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>

    <div v-if="$slots.extra" class="mt-10">
      <slot name="extra" />
    </div>

    <div v-if="$slots.banner" class="w-full mt-6">
      <slot name="banner" />
    </div>
  </Container>
</template>