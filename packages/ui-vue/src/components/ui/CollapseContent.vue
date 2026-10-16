<script setup lang="ts">
import { useSlide } from '#/composables/useSlide';
import { cn } from '#/utils/cn';
import { computed, inject, type ComputedRef } from 'vue';

interface Props {
  id?: string;
  class?: string;
}

const props = defineProps<Props>();

const isOpen = inject<ComputedRef<boolean>>('collapseOpen', computed(() => false));
const contentId = inject<string>('collapseContentId', '');

const { slideDown, slideUp } = useSlide();

// done을 호출해야 v-show가 display:none 처리됨
function onEnter(el: Element, done: () => void) {
  slideDown(el, done);
}
function onLeave(el: Element, done: () => void) {
  slideUp(el, done);
}
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-show="isOpen" :id="contentId" class="collapse-content">
      <div :class="cn(props.class)">
        <slot />
      </div>
    </div>
  </Transition>
</template>