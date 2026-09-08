<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

export type BleedSide = boolean | 'left' | 'right';

interface Props extends SpacingProps {
  snap?: boolean; // 스와이프할 때 이미지 시작점에 달라붙는 스냅 효과
  snapAlign?: 'start' | 'center' | 'end';
  bleed?: BleedSide; // 화면 끝까지 밀어낼 방향 (true=양쪽, 'left'/'right'=한쪽만, false=사용 안 함)
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  snap: false,
  snapAlign: 'start',
  bleed: false,
});

const snapAlignClass = computed(() => {
  if (!props.snap) return '';
  if (props.snapAlign === 'center') return '[&>*]:snap-center';
  if (props.snapAlign === 'end') return '[&>*]:snap-end';
  return '[&>*]:snap-start';
});

// bleed - container의 여백만큼 음수마진
const bleedClass = computed(() => {
  if (props.bleed === true) return '-mx-[var(--layout-px)] px-[var(--layout-px)]';
  if (props.bleed === 'left') return '-ml-[var(--layout-px)] pl-[var(--layout-px)]';
  if (props.bleed === 'right') return '-mr-[var(--layout-px)] pr-[var(--layout-px)]';
  return '';
});

const { spacingClasses } = useSpacing(props);
const scrollClasses = computed(() =>
  cn(
    'flex flex-1 overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar',
    '[&>*]:shrink-0', // 직계 자식 전체에 shrink-0 적용
    props.snap && 'snap-x snap-mandatory',
    snapAlignClass.value,
    bleedClass.value,
    spacingClasses.value,
    props.class
  )
);
</script>

<template>
  <div :class="scrollClasses">
    <slot />
  </div>
</template>

<style scoped>
/* 브라우저별 스크롤바 숨김 처리 */
/* .hide-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
.hide-scrollbar::-webkit-scrollbar {
  display: none; 
} */
</style>