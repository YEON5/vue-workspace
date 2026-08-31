<script setup lang="ts">
import { colorMap } from '#/types';
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
    depth === 0 ? 'gap-2' : 'gap-2 pl-1 my-[8px]', // 2-depth 들여쓰기 + 상/하단 여백
    colorMap['body'],
    props.class,
  )
);

// type + depth에 따른 tag
const tag = computed(() => (props.type === 'number' ? 'ol' : 'ul'));
</script>

<template>
  <component :is="tag" :class="listClasses">
    <slot />
  </component>
</template>


