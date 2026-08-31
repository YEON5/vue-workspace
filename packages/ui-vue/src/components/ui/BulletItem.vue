<script setup lang="ts">
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject } from 'vue';

interface Props {
  index?: number; // number 타입일 때 순번 (1부터)
  class?: string;
}

const props = defineProps<Props>();

const depth = inject<number>('bulletDepth', 0);
const type = inject<'dot' | 'hyphen' | 'number'>('bulletType', 'dot');  // BulletList에서 내려준 type을 그대로 상속받음 (기본값 dot)

const textClass = computed(() => (depth === 0 ? TypoMap['label-m'] : TypoMap['label-s']));
const markerClass = computed(() => {
  if (type !== 'dot' && type !== 'hyphen') return '';
  const depthKey = depth === 0 ? 'depth0' : 'depth1';
  return `bullet-${type}-${depthKey}`;
});
const itemClasses = computed(() =>
  cn(
    'relative flex items-start gap-1.5',
    textClass.value,
    colorMap['body'],
    markerClass.value && [markerClass.value, 'pl-[10px]'],
    props.class,
  )
);
</script>

<template>
  <li :class="itemClasses">
    <!-- number 타입만 순번 텍스트를 직접 렌더링 -->
    <span v-if="type === 'number'" class="shrink-0" :class="textClass">{{ index ?? 1 }}.</span>
 
    <div class="flex-1">
      <slot />
      <!-- 중첩된 BulletList가 여기 들어오면 depth/type이 자동으로 갱신되어 스타일 적용됨 -->
      <slot name="depth" />
    </div>
  </li>
</template>
 
<style scoped>
/* dot - 1depth */
.bullet-dot-depth0::before {
  content: '';
  display: block;
  position: absolute;
  top: 11px;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: currentColor;
}
/* dot - 2depth */
.bullet-dot-depth1::before {
  content: '';
  display: block;
  position: absolute;
  top: 8px;
  left: 0;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: currentColor;
}
 
/* hyphen - 1depth */
.bullet-hyphen-depth0::before {
  content: '';
  display: block;
  position: absolute;
  top: 12px;
  left: 0;
  width: 4px;
  height: 1px;
  background-color: currentColor;
}
/* hyphen - 2depth */
.bullet-hyphen-depth1::before {
  content: '';
  display: block;
  position: absolute;
  top: 10px;
  left: 0;
  width: 4px;
  height: 1px;
  background-color: currentColor;
}
</style>