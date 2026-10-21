<script setup lang="ts">
import type { Placement } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, ref, type Ref } from 'vue';

// Teleport가 root라 attrs가 자동 전달되지 않으므로 직접 바인딩
defineOptions({ inheritAttrs: false });

interface Props {
  arrow?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), { arrow: false });

const open = inject<Ref<boolean>>('tooltipOpen', ref(false));
const contentId = inject<string>('tooltipContentId', '');
const contentRef = inject<Ref<HTMLElement | null>>('tooltipContentRef', ref(null));
const style = inject<Ref<Record<string, string>>>('tooltipStyle', ref({}));
const placement = inject<Ref<Placement>>('tooltipPlacement', ref('top'));
const anchorCenter = inject<Ref<{ x: number; y: number }>>('tooltipAnchorCenter', ref({ x: 0, y: 0 }));

function setContentRef(el: unknown) {
  contentRef.value = (el as HTMLElement | null) ?? null;
}

const ARROW_SIZE = 8; // px
const ARROW_INSET = 8; // px, 모서리에서 최소 떨어진 거리

const side = computed(() => placement.value.split('-')[0] as 'top' | 'bottom' | 'left' | 'right');

const arrowStyle = computed(() => {
  const el = contentRef.value;
  const half = ARROW_SIZE / 2;
  if (!el) return {};
  if (side.value === 'top' || side.value === 'bottom') {
    const x = Math.min(Math.max(anchorCenter.value.x - half, ARROW_INSET), el.offsetWidth - ARROW_SIZE - ARROW_INSET);
    return { left: `${Math.round(x)}px`, width: `${ARROW_SIZE}px`, height: `${ARROW_SIZE}px` };
  }
  const y = Math.min(Math.max(anchorCenter.value.y - half, ARROW_INSET), el.offsetHeight - ARROW_SIZE - ARROW_INSET);
  return { top: `${Math.round(y)}px`, width: `${ARROW_SIZE}px`, height: `${ARROW_SIZE}px` };
});

// 말풍선 화살표
const arrowClasses = computed(() =>
  cn(
    'absolute rotate-45 bg-gray-800',
    {
      bottom: '-top-2',
      top: '-bottom-2',
      right: '-left-2',
      left: '-right-2',
    }[side.value],
  )
);

// pointer-events-none: 마우스를 올려도 유지되지 않는 읽기 전용 설명
const contentClasses = computed(() =>
  cn(
    'pointer-events-none z-[60] max-w-xs rounded-md bg-gray-800 p-3 text-white',
    props.class,
  )
);
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      :id="contentId"
      :ref="setContentRef"
      role="tooltip"
      v-bind="$attrs"
      :style="style"
      :class="contentClasses"
    >
      <span v-if="arrow" aria-hidden="true" :class="arrowClasses" :style="arrowStyle" />
      <slot />
    </div>
  </Teleport>
</template>