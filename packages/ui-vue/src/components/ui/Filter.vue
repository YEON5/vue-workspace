<script setup lang="ts">
import { useCheckable } from '#/composables/useCheckable';
import { bgColorMap, borderColorMap, colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed } from 'vue';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  checked?: boolean;
  disabled?: boolean;
  iconAlign?: 'left' | 'right';
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  disabled: false,
  iconAlign: 'left',
});

const modelValue = defineModel<unknown>();
const { internalId, isChecked } = useCheckable(props, modelValue);

const wrapperClasses = computed(() =>
  cn(
    'inline-flex',
    props.disabled && 'opacity-50 select-none',
    props.class,
  )
);

// pill 형태 - input이 박스 전체를 차지, 텍스트가 그 위에 겹침 (Checkbox의 box variant와 동일한 방식)
const inputClasses = computed(() =>
  cn(
    'peer absolute inset-0 size-full appearance-none rounded-full border bg-white',
    !isChecked.value && borderColorMap['secondary'],
    isChecked.value && [borderColorMap['primary'], bgColorMap['primary']],
  )
);

const textClasses = computed(() =>
  cn(
    'relative inline-flex items-center h-[34px] z-[1] px-5',
    TypoMap['label-m'],
    isChecked.value ? colorMap['white'] : colorMap['secondary'],
  )
);
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <span class="relative inline-flex">
      <input
        :id="internalId"
        v-model="modelValue"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :class="inputClasses"
      >

      <!-- filter icon slot -->
      <span v-if="label || $slots.default" :class="textClasses">
        <slot v-if="iconAlign !== 'right'" name="icon" />
        <slot>{{ label }}</slot>
        <slot v-if="iconAlign === 'right'" name="icon" />
      </span>
    </span>
  </label>
</template>