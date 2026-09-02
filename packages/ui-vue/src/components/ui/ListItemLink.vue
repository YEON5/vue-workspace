<script setup lang="ts">
import { cn } from '#/utils/cn';
import { IArrowRightS } from '#components';
import { computed } from 'vue';

interface Props {
  to?: string; // 있으면 RouterLink, 없으면 button
  disabled?: boolean; // button disabled
  showArrow?: boolean; // 우측 화살표 아이콘
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  showArrow: true,
});

// to가 있으면 RouterLink, 없으면 button으로 렌더링
const tag = computed(() => (props.to ? 'RouterLink' : 'button'));

const linkClasses = computed(() =>
  cn(
    'flex items-center justify-between w-full gap-3 py-4 text-left transition-colors',
    !props.disabled && 'hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none',
    props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
  )
);
</script>

<template>
  <li :class="props.class">
    <component
      :is="tag"
      :to="to"
      :type="!to ? 'button' : undefined"
      :disabled="!to ? disabled : undefined"
      :class="linkClasses"
    >
      <slot />
      <IArrowRightS v-if="showArrow" class="size-5 shrink-0" />
    </component>
  </li>
</template>