<script setup lang="ts">
import { type Component, computed } from 'vue';
import Container from './Container.vue';
import Lottie from './Lottie.vue';

interface Props {
  type?: 'success' | 'error' | 'warning';
  icon?: Component;
  iconClass?: string;
  title: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
});

// 타입별 Lottie 경로와 설정
const lottieConfig = computed(() => {
  const configs = {
    success: {
      path: '/images/lottie/check.json',
      width: 120,
      height: 120,
      alt: '성공적으로 완료되었음을 알리는 애니메이션'
    },
    error: {
      path: '/images/lottie/error.json',
      width: 120,
      height: 120,
      alt: '오류가 발생했음을 알리는 애니메이션'
    },
    warning: {
      path: '/images/lottie/warning.json',
      width: 120,
      height: 120,
      alt: '주의가 필요함을 알리는 애니메이션'
    }
  };
  return configs[props.type];
});
</script>

<template>
  <Container :padded="false" class="items-center pt-[100px]">
    <!-- <Container :padded="false" centered> -->
    <div class="flex flex-col items-center gap-4 text-center">

      <slot name="icon">
        <component
          :is="icon"
          v-if="icon"
          class="size-[80px]"
          :class="iconClass"
        />

        <Lottie 
          v-else
          :path="lottieConfig.path"
          :width="lottieConfig.width"
          :height="lottieConfig.height"
          :class="iconClass"
          :loop="false"
          :alt="lottieConfig.alt"
        />
      </slot>

      <h2 class="text-xl font-bold text-foreground">
        <slot name="title">{{ title }}</slot>
      </h2>

      <p
        v-if="description || $slots.description"
        class="text-sm text-muted-foreground"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>

    <!-- 완료 문구 아래 추가 요소 (배너, 안내 박스 등) -->
    <div v-if="$slots.action" class="mt-6">
      <slot name="action" />
    </div>

    <div v-if="$slots.extra" class="w-full mt-10">
      <slot name="extra" />
    </div>

    <div v-if="$slots.banner" class="w-full mt-6">
      <slot name="banner" />
    </div>
  </Container>
</template>