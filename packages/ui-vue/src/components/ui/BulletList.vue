<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, inject, provide } from 'vue';

export type BulletType = 'dot' | 'hyphen' | 'number';

interface Props {
  type?: BulletType;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'dot',
});

// 상위 BulletList의 depth를 물려받아 +1 (최상위는 0)
const parentDepth = inject<number>('bulletDepth', -1);
const depth = parentDepth + 1;
provide('bulletDepth', depth);

// type을 하위 BulletItem에게 전달
provide('bulletType', props.type);

const listClasses = computed(() =>
  cn(
    'flex flex-col list-none',
    depth === 0 ? 'gap-2' : 'gap-2 pl-1 my-[8px]', // 2depth 부터는 1depth 문구만큼 들여쓰기 + 상하 여백
    props.type === 'number' && '[counter-reset:bullet-idx]',
    props.class,
  )
);

// type에 따른 tag 결정
const tag = computed(() => (props.type === 'number' ? 'ol' : 'ul'));
</script>

<template>
  <component :is="tag" :class="listClasses">
    <slot />
  </component>
</template>