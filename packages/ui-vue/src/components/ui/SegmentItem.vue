<script setup lang="ts">
import { useRadioable } from '#/composables/useRadioable';
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject } from 'vue';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
});

const modelValue = defineModel<unknown>();
const { internalId, isChecked } = useRadioable(props, modelValue);

// 부모 Segment에서 내려준 name (Segment 하나가 하나의 라디오 그룹)
const groupName = inject<string>('segmentName', '');
// 부모가 animated 모드면, 자체 배경 대신 부모의 슬라이딩 indicator가 그 역할을 대신함
const isAnimated = inject<boolean>('segmentAnimated', false);

const wrapperClasses = computed(() =>
  cn(
    'relative z-[1] flex-1 inline-flex items-center justify-center rounded-md transition-colors',
    !isAnimated && isChecked.value && 'bg-white shadow-sm',
    props.disabled && 'opacity-50 pointer-events-none',
    props.class,
  )
);

const inputClasses = computed(() => 'absolute inset-0 opacity-0 cursor-pointer');

const textClasses = computed(() =>
  cn(
    'pointer-events-none px-3 py-2 text-center whitespace-nowrap',
    TypoMap['label-m'],
    isChecked.value ? colorMap['primary'] : colorMap['secondary'],
  )
);
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <input
      :id="internalId"
      v-model="modelValue"
      type="radio"
      :name="groupName"
      :value="value"
      :checked="isChecked"
      :disabled="disabled"
      :class="inputClasses"
    >
    <span :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>