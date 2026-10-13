<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, useId, watch } from 'vue';

interface Props {
  name?: string; // 하위 SegmentItem들이 공유할 라디오 그룹명 (안 넘기면 자동 생성)
  animated?: boolean; // true면 선택 시 indicator가 부드럽게 슬라이딩 이동
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  animated: false,
});

const modelValue = defineModel<unknown>();

const autoName = useId();
provide('segmentName', computed(() => props.name ?? autoName));
provide('segmentModel', modelValue);
provide('segmentAnimated', computed(() => props.animated));

const trackClasses = computed(() =>
  cn('relative inline-flex w-full rounded-lg bg-gray-100 p-[6px]', props.class)
);

// animated 모드 - 선택된 SegmentItem의 위치/크기를 측정해 indicator 이동
const trackRef = ref<HTMLElement | null>(null);
const ready = ref(false); // 첫 위치 계산이 끝난 뒤부터 transition 활성화

const indicatorStyle = ref({
  width: '0px',
  height: '0px',
  transform: 'translate(0px, 0px)',
});

function updateIndicator() {
  if (!props.animated || !trackRef.value) return;

  const checkedInput = trackRef.value.querySelector<HTMLInputElement>('input:checked');
  const itemEl = checkedInput?.closest('label') as HTMLElement | null;
  if (!itemEl) return;

  const trackRect = trackRef.value.getBoundingClientRect();
  const itemRect = itemEl.getBoundingClientRect();

  indicatorStyle.value = {
    width: `${itemRect.width}px`,
    height: `${itemRect.height}px`,
    transform: `translate(${itemRect.left - trackRect.left}px, ${itemRect.top - trackRect.top}px)`,
  };
}

let resizeObserver: ResizeObserver | null = null;

watch(modelValue, () => nextTick(updateIndicator));

onMounted(async () => {
  await nextTick();
  updateIndicator();
  // 첫 위치를 잡은 다음 프레임부터 transition을 켜서, 처음에 날아오는 현상 방지
  requestAnimationFrame(() => {
    ready.value = true;
  });

  // 창 크기 변경 시 indicator 위치 재계산
  if (trackRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(updateIndicator);
    resizeObserver.observe(trackRef.value);
  }
});

onBeforeUnmount(() => resizeObserver?.disconnect());
</script>

<template>
  <div ref="trackRef" :class="trackClasses">
    <div
      v-if="animated"
      :class="cn(
        'absolute top-0 left-0 rounded-md bg-white shadow-sm',
        ready && 'transition-all duration-200 ease-out',
      )"
      :style="indicatorStyle"
    />
    <slot />
  </div>
</template>