<script setup lang="ts">
import { useRadioable } from '#/composables/useRadioable';
import { colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, ref, type ComputedRef, type Ref } from 'vue';

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

// 부모 Segment가 내려준 선택값/그룹명/animated 여부
const segmentModel = inject<Ref<unknown>>('segmentModel', ref());
const groupName = inject<ComputedRef<string>>('segmentName', computed(() => ''));
const isAnimated = inject<ComputedRef<boolean>>('segmentAnimated', computed(() => false));

const { internalId, isChecked } = useRadioable(props, segmentModel);

const wrapperClasses = computed(() =>
  cn(
    'relative z-[1] flex-1 inline-flex items-center justify-center rounded-md transition-colors',
    // animated면 부모의 슬라이딩 indicator가 배경 역할을 대신함
    !isAnimated.value && isChecked.value && 'bg-white shadow-sm',
    props.disabled && 'opacity-50 pointer-events-none',
    props.class,
  )
);

const inputClasses = 'absolute inset-0 opacity-0 cursor-pointer';

const textClasses = computed(() =>
  cn(
    'pointer-events-none px-3 py-3 text-center whitespace-nowrap',
    TypoMap['label-m'],
    isChecked.value ? colorMap['primary'] : colorMap['secondary'],
  )
);
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <input
      :id="internalId"
      v-model="segmentModel"
      type="radio"
      :name="groupName"
      :value="value"
      :disabled="disabled"
      :class="inputClasses"
    >
    <span :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>