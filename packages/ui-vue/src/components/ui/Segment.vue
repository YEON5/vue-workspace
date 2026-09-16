<script setup lang="ts">
import { cn } from '#/utils/cn';
import { computed, nextTick, onMounted, provide, ref, useId, watch } from 'vue';

interface Props {
  name?: string; // 하위 SegmentItem들이 공유할 라디오 그룹명 (안 넘기면 자동 생성)
  modelValue?: unknown; // indicator 위치 추적을 위해 선택값을 감시 (animated일 때 필요)
  animated?: boolean; // true면 선택 시 indicator가 부드럽게 슬라이딩 이동
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  animated: false,
});

const autoName = useId();
const groupName = computed(() => props.name ?? autoName);
provide('segmentName', groupName.value);
provide('segmentAnimated', props.animated);

const trackClasses = computed(() =>
  cn(
    'relative inline-flex w-full rounded-lg bg-gray-100 p-1',
    props.class,
  )
);

// animated 모드 - 실제 선택된 SegmentItem의 위치/너비를 측정해 indicator를 이동시킴
const trackRef = ref<HTMLElement | null>(null);
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)' });

function updateIndicator() {
  if (!props.animated || !trackRef.value) return;

  // 현재 checked 상태인 input을 트랙 내부에서 찾음
  const checkedInput = trackRef.value.querySelector<HTMLInputElement>('input:checked');
  if (!checkedInput) return;

  // input의 부모 label이 곧 SegmentItem의 wrapper
  const itemEl = checkedInput.closest('label') as HTMLElement | null;
  if (!itemEl) return;

  const trackRect = trackRef.value.getBoundingClientRect();
  const itemRect = itemEl.getBoundingClientRect();

  indicatorStyle.value = {
    width: `${itemRect.width}px`,
    transform: `translateX(${itemRect.left - trackRect.left}px)`,
  };
}

// 선택값이 바뀌거나(다른 SegmentItem 클릭), 마운트 직후 위치를 계산
watch(() => props.modelValue, () => nextTick(updateIndicator));
onMounted(() => nextTick(updateIndicator));
</script>

<template>
  <div ref="trackRef" :class="trackClasses">
    <!-- animated일 때만 실제 슬라이딩 indicator 렌더링 -->
    <div
      v-if="animated"
      class="absolute inset-y-1 left-0 rounded-md bg-white shadow-sm transition-transform duration-200 ease-out"
      :style="indicatorStyle"
    />
    <slot />
  </div>
</template>