<script setup lang="ts">
import { computed, inject, type Component, type ComputedRef } from 'vue';

interface Props {
  as?: string | Component; // 기본 button, Button 컴포넌트 등도 가능
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
});

const triggerProps = inject<ComputedRef<Record<string, unknown>>>(
  'popoverTriggerProps',
  computed(() => ({})),
);
</script>

<template>
  <!-- 일반 button일 때만 type 지정 (폼 안에서 submit 방지). Button 컴포넌트는 자체 처리 -->
  <component
    :is="as"
    :type="as === 'button' ? 'button' : undefined"
    v-bind="triggerProps"
  >
    <slot />
  </component>
</template>