<script setup lang="ts">
import { computed } from 'vue';


// true(기본): 항목 "사이"에만 테두리 (첫 번째 예외) - divide-y와 동일
// 'top': 모든 항목 위쪽에 테두리 (예외 없음, 첫 번째도 포함)
// 'bottom': 모든 항목 아래쪽에 테두리 (예외 없음, 마지막도 포함)
export type ListDivide = boolean | 'top' | 'bottom';

interface Props {
  divide?: ListDivide;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  divide: false,
});

const listClasses = computed(() => ['flex', 'flex-col', 'list-none', props.class]);
const dividePosition = computed(() => {
  if (props.divide === true) return 'between'; // 기본값: 항목 사이에만
  if (props.divide === 'top') return 'top';
  if (props.divide === 'bottom') return 'bottom';
  return null;
});
</script>

<template>
  <ul
    :class="listClasses"
    :data-divide="dividePosition"
  >
    <slot />
  </ul>
</template>

<style scoped>
/* 기본(divide=true): 항목 "사이"에만 - 첫 번째 li는 제외 */
ul[data-divide='between'] > :deep(li:not(:first-child)) {
  border-top: 1px solid var(--gray-300);
}

/* top: 모든 li 위쪽에 테두리, 예외 없음 */
ul[data-divide='top'] > :deep(li) {
  border-top: 1px solid var(--gray-300);
}

/* bottom: 모든 li 아래쪽에 테두리, 예외 없음 */
ul[data-divide='bottom'] > :deep(li) {
  border-bottom: 1px solid var(--gray-300);
}
</style>