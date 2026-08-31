<script setup lang="ts">
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const depth = inject<number>('bulletDepth', 0);
const type = inject<'dot' | 'hyphen' | 'number'>('bulletType', 'dot'); // BulletList에서 내려준 type을 그대로 상속받음 (기본값 dot)

const textClass = computed(() => (depth === 0 ? TypoMap['label-m'] : TypoMap['label-s']));

const itemClasses = computed(() =>
  cn(
    'relative flex flex-col',
    textClass.value,
    type === 'dot' && 'bullet-dot pl-[10px]',
    type === 'hyphen' && 'bullet-hyphen pl-[10px]',
    type === 'number' && ['bullet-number pl-[16px]', '[counter-increment:bullet-idx]'],
    colorMap['body'],
    props.class,
  )
);
</script>

<template>
  <li :class="itemClasses">
    <slot />
    <slot name="depth" />
  </li>
</template>

<style scoped>
/* number type 번호 자동 생성 */
.bullet-number::before {
  content: counter(bullet-idx) '. ';
  position: absolute;
  top: 0;
  left: 0;
}
/* dot */
.bullet-dot::before {
  content: '';
  position: absolute;
  top: 0.75em;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: currentColor;
  transform: translateY(-50%);
}
/* hyphen */
.bullet-hyphen::before {
  content: '';
  position: absolute;
  top: 0.75em;
  left: 0;
  width: 4px;
  height: 1px;
  background-color: currentColor;
  transform: translateY(-50%);
}
</style>