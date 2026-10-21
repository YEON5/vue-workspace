<script setup lang="ts">
import { cn } from '#/utils/cn';
import { IArrowSelect } from '#components';
import { computed, inject, type ComputedRef } from 'vue';
import Button from './Button.vue';
import IconButton from './IconButton.vue';

interface Props {
  text?: string;       // 상태와 관계없이 고정되는 텍스트
  openText?: string;   // 열린 상태 텍스트 (text가 없을 때)
  closeText?: string;  // 닫힌 상태 텍스트 (text가 없을 때)
  openLabel?: string;
  closeLabel?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  openLabel: '접기',
  closeLabel: '펼치기',
});

const isOpen = inject<ComputedRef<boolean>>('collapseOpen', computed(() => false));
const toggle = inject<() => void>('collapseToggle', () => {});
const contentId = inject<string>('collapseContentId', '');

const buttonText = computed(() =>
  props.text ?? (isOpen.value ? props.openText : props.closeText)
);
const hasText = computed(() => !!(props.text || props.openText || props.closeText));

const iconClasses = computed(() =>
  cn('size-5 transition-transform duration-200', isOpen.value && 'rotate-180')
);
</script>

<template>
  <div :class="cn('collapse-head flex items-center justify-between gap-3', props.class)">
    <div class="min-w-0 flex-1">
      <slot />
    </div>

    <Button
      v-if="hasText"
      variant="transparent"
      color="secondary"
      size="sm"
      icon-align="right"
      class="shrink-0 hover:bg-transparent"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      @click="toggle"
    >
      {{ buttonText }}
      <template #icon>
        <IArrowSelect :class="iconClasses" aria-hidden="true" />
      </template>
    </Button>

    <IconButton
      v-else
      :aria-label="isOpen ? openLabel : closeLabel"
      :aria-expanded="isOpen"
      :aria-controls="contentId"
      @click="toggle"
    >
      <IArrowSelect :class="iconClasses" aria-hidden="true" />
    </IconButton>
  </div>
</template>