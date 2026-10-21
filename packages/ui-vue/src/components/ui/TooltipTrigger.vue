<script setup lang="ts">
import { computed, inject, type Component, type ComputedRef } from 'vue';

interface Props {
  as?: string | Component; // 기본 span, Button 컴포넌트 등도 가능
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
});

const triggerProps = inject<ComputedRef<Record<string, unknown>>>(
  'tooltipTriggerProps',
  computed(() => ({})),
);

// 이미 포커스되는 요소(button, a, 컴포넌트)가 아니면 키보드로 접근할 수 있게 tabindex 부여
const tabindex = computed(() =>
  typeof props.as === 'string' && !['button', 'a', 'input'].includes(props.as) ? 0 : undefined,
);
</script>

<template>
  <component :is="as" :tabindex="tabindex" v-bind="triggerProps">
    <slot />
  </component>
</template>