<script setup lang="ts">
import { cn } from '@/utils/cn';
import lottie, { type AnimationItem } from 'lottie-web';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

interface Props {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  class?: string;
  width?: number;
  height?: number;
  alt?: string;
}

const props = withDefaults(defineProps<Props>(), {
  loop: true,
  autoplay: true,
  speed: 1,
  alt: '애니메이션',
});

const lottieContainer = ref<HTMLElement | null>(null);
const animation = ref<AnimationItem | null>(null);

const initLottie = () => {
  if (!lottieContainer.value) return;

  // 기존 인스턴스가 있다면 파괴 (메모리 관리 및 리렌더링 대비)
  if (animation.value) {
    animation.value.destroy();
  }

  animation.value = lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
    path: props.path, // 👈 lottie-web 엔진이 이 경로로 HTTP GET 요청을 보내 JSON을 가져옵니다
  });

  animation.value.setSpeed(props.speed);
};

onMounted(() => {
  initLottie();
});

onUnmounted(() => {
  animation.value?.destroy();
});

// 외부에서 경로(path)가 동적으로 변경될 경우를 대비한 반응형 처리
watch(() => props.path, () => {
  initLottie();
});

const classes = computed(() =>
  cn(
    'w-full h-full flex justify-center items-center',
    props.class,
  )
);
</script>

<template>
  <div 
    ref="lottieContainer" 
    :class="classes"
    :style="{width: width+'px', height: height+'px'}"
    role="img"
    :aria-label="alt"
  />
</template>