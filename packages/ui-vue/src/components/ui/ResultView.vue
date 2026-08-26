<script setup lang="ts">
import { type Component, computed } from 'vue';
import Container from './Container.vue';
import Flex from './Flex.vue';
import Lottie from './Lottie.vue';
import Typo from './Typo.vue';

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
      path: '/lottie/check.json',
      width: 120,
      height: 120,
      alt: '성공적으로 완료되었음을 알리는 애니메이션'
    },
    error: {
      path: '/lottie/error.json',
      width: 120,
      height: 120,
      alt: '오류가 발생했음을 알리는 애니메이션'
    },
    warning: {
      path: '/lottie/warning.json',
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
    
    <Flex direction="col" align="center" gap="7" class="text-center">
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

      <!-- title / description -->
      <Flex direction="col" gap="3">
        <Typo variant="heading-l">
          <slot name="title">{{ title }}</slot>
        </Typo>
  
        <Typo
          v-if="description || $slots.description"
          variant="body-m"
          color="tertiary"  
        >
          <slot name="description">{{ description }}</slot>
        </Typo>
      </Flex>
    </Flex>

    <!-- 완료 문구 아래 추가 요소 (클릭요소(action), 배너(banner), 안내 박스(extra) 등) -->
    <div v-if="$slots.action" class="mt-8">
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