<script setup lang="ts">
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { TypoMap, bgColorMap, type ColorToken } from '#/types';
import { cn } from '#/utils/cn';
import { computed, useSlots } from 'vue';

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

// const slots = defineSlots<{
//   default?: () => any;
// }>();
const slots = useSlots();
// count 타입인데 표시할 값(count 또는 slot)이 없으면 렌더링하지 않음
const shouldRender = computed(() => {
  if (props.type === 'dot') return true;
  return props.count !== undefined || !!slots.default;
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
  <component :is="as" v-if="shouldRender" :class="classes">
    <template v-if="type === 'count'">
      <slot>{{ displayCount }}</slot>
    </template>
  </component>
</template>