<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { cn } from '@/utils/cn';
import { computed } from 'vue';


interface Props extends SpacingProps {
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

const { spacingClasses } = useSpacing(props);

const classes = computed(() => 
  cn(
    'flex flex-col flex-1 w-full mx-auto max-w-7xl px-[var(--layout-px)]',
    props.padded && 'py-8',
    props.centered && 'items-center justify-center',
    spacingClasses.value,
    props.class,
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <slot />
  </component>
</template>
