<script setup lang="ts">
  interface Props {
    as?: string;
    class?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    as: 'div',
  });
</script>

<template>
  <component
    :is="props.as"
    :class="[
      // 모바일, 데스크탑에 대응하는 기본 반응형 패딩 및 중앙 정렬
      'w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl',
      props.class,
    ]"
  >
    <slot />
  </component>
</template>
