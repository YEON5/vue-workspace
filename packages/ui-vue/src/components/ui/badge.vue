<!-- Badge.vue 상상도 -->
<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, type ColorToken } from '@/types';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export type BadgeType = 'dot' | 'count';

interface Props extends SpacingProps {
  as?: string;
  type?: BadgeType;
  color?: ColorToken;
  count?: number; 
  maxCount?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  as: 'span',
  type: 'dot',
  color: 'error',
  maxCount: 999,
});

const displayCount = computed(() => {
  if (props.count === undefined) return null;
  return props.count > props.maxCount ? `${props.maxCount}+` : props.count;
});

const { spacingClasses } = useSpacing(props);

const classes = computed(() =>
  cn(
    'inline-flex items-center justify-center rounded-full', 
    props.type === 'dot' 
      ? 'absolute w-[6px] h-[6px]'        // dot일 때만 absolute 띄움
      : 'px-1.5 min-w-[20px] h-[20px]',   // count는 일반적인 흐름(relative/inline) 유지
    props.type === 'count' && [TypoMap['caption-2'], 'text-white'],
    bgColorMap[props.color],
    spacingClasses.value,
    props.class,
  )
);
</script>

<template>
  <component :is="as" :class="classes">
    <template v-if="type === 'count'">
      <!-- 숫자가 있으면 숫자 표시, 없으면 아이콘 등을 넣을 수 있는 슬롯 -->
      <slot>{{ displayCount }}</slot>
    </template>
  </component>
</template>