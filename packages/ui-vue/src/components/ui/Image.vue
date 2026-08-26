<script setup lang="ts">
import { radiusMap, type RadiusToken } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

export type ImgObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';

interface Props {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
  radius?: RadiusToken;
  objectFit?: ImgObjectFit;
  objectPosition?: string;
  ratio?: string | number;
  class?: string;
  loading?: 'lazy' | 'eager'; // 이미지 지연로딩 lazy, 즉시 로딩 eager
}

const props = withDefaults(defineProps<Props>(), {
  alt: '',
  objectFit: 'none',
  objectPosition: 'center',
});


const imgStyle = computed(() => ({
  objectFit: props.objectFit,
  objectPosition: props.objectPosition,
  ...(props.ratio && { aspectRatio: typeof props.ratio === 'number' ? String(props.ratio) : props.ratio }),
  ...(props.width && { width: props.width }),
  ...(props.height && !props.ratio && { height: props.height }),
}));
const imgClasses = computed(() =>
  cn(
    !props.width && 'w-full',
    !props.height && !props.ratio && 'h-full',
    props.radius && radiusMap[props.radius],
    props.class,
  )
);
</script>

<template>
  <img :src="src" :alt="alt" :class="imgClasses" :style="imgStyle">
</template>