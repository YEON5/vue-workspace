<script setup lang="ts">
import { borderColorMap, type Placement } from '#/types';
import { cn } from '#/utils/cn';
import { ICloseB } from '#components';
import { computed, inject, nextTick, ref, watch, type Ref } from 'vue';
import IconButton from './IconButton.vue';

// Teleport가 root라 attrs가 자동 전달되지 않으므로 직접 바인딩
defineOptions({ inheritAttrs: false });

interface Props {
  arrow?: boolean; // 말풍선
  closable?: boolean; // 우측 상단 닫기 버튼
  closeLabel?: string; // 닫기 버튼 aria-label
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  arrow: false,
  closable: false,
  closeLabel: '닫기',
});


const open = inject<Ref<boolean>>('popoverOpen', ref(false));
const contentId = inject<string>('popoverContentId', '');
const contentRef = inject<Ref<HTMLElement | null>>('popoverContentRef', ref(null));
const style = inject<Ref<Record<string, string>>>('popoverStyle', ref({}));
const placement = inject<Ref<Placement>>('popoverPlacement', ref('bottom-start'));
const anchorCenter = inject<Ref<{ x: number; y: number }>>('popoverAnchorCenter', ref({ x: 0, y: 0 }));

function setContentRef(el: unknown) {
  contentRef.value = (el as HTMLElement | null) ?? null;
}

// 열리면 콘텐츠로 포커스 이동
watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  contentRef.value?.focus({ preventScroll: true });
});

const ARROW_SIZE = 8; // px
const ARROW_INSET = 12; // px, 모서리에서 최소 떨어진 거리

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

// popover 닫기
function close() {
  open.value = false;
}

// popover 말풍선 화살표
const arrowClasses = computed(() =>
  cn(
    'absolute rotate-45 bg-white',
    borderColorMap['tertiary'],
    {
      bottom: '-top-2 border-l border-t',
      top: '-bottom-2 border-r border-b',
      right: '-left-2 border-l border-b',
      left: '-right-2 border-r border-t',
    }[side.value],
  )
);

const contentClasses = computed(() =>
  cn(
    'z-50 rounded-lg border bg-white shadow-lg focus:outline-none',
    props.closable && 'relative',
    borderColorMap['tertiary'],
    props.class,
  )
);
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-150 ease-out"
      leave-active-class="transition-opacity duration-100 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        :id="contentId"
        :ref="setContentRef"
        role="dialog"
        tabindex="-1"
        v-bind="$attrs"
        :style="style"
        :class="contentClasses"
      > 
        <!-- 말풍선 꼬리 -->
        <span v-if="arrow" aria-hidden="true" :class="arrowClasses" :style="arrowStyle" />

        <!-- 닫기 x 버튼 -->
        <IconButton
          v-if="closable"
          class="absolute right-2 top-2"
          :aria-label="closeLabel"
          @click="close"
        >
          <ICloseB class="size-5" aria-hidden="true" />
        </IconButton>

        <slot />
      </div>
    </Transition>
  </Teleport>
</template>