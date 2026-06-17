<script setup lang="ts">
import { cn } from '@/utils/cn';
import { computed } from 'vue';


interface Props {
  as?: string;
  class?: string;
  padded?: boolean; // 상하 패딩 (기본 on, 결과화면 등 예외시 off)
  centered?: boolean; // 세로 중앙 정렬 (결과화면)
}

// 기본값
const props = withDefaults(defineProps<Props>(), {
  as: 'div',
  padded: true,
  centered: false,
});

const classes = computed(() => 
  cn(
    // 모바일, 데스크탑에 대응하는 기본 반응형 패딩 및 중앙 정렬
    'flex flex-col flex-1 w-full mx-auto max-w-7xl px-[var(--layout-px)]',
    props.padded && 'py-8',
    props.centered && 'items-center justify-center',
    props.class,
  )
);
</script>

<template>
  <component
    :is="as"
    :class="classes"
  >
    <slot />
  </component>
</template>
