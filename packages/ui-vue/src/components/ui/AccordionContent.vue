<script setup lang="ts">
import { useSlide } from '#/composables/useSlide';
import { TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, type ComputedRef } from 'vue';

interface Props {
  class?: string;
}

const props = defineProps<Props>();

const isOpen = inject<ComputedRef<boolean>>('accordionOpen', computed(() => false));
const headId = inject<string>('accordionHeadId', '');
const contentId = inject<string>('accordionContentId', '');

const contentClasses = computed(() =>
  cn(
    'pt-3 pb-6',
    TypoMap['body-m'],
    props.class
  )
);

const { slideDown, slideUp } = useSlide();
function onEnter(el: Element, done: () => void) {
  slideDown(el, done);
}
function onLeave(el: Element, done: () => void) {
  slideUp(el, done);
}
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div
      v-show="isOpen"
      :id="contentId"
      role="region"
      :aria-labelledby="headId"
    >
      <div :class="contentClasses">
        <slot />
      </div>
    </div>
  </Transition>
</template>