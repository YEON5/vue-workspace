<script setup lang="ts">
import { useCheckable } from '#/composables/useCheckable';
import { bgColorMap, borderColorMap, colorMap, TypoMap } from '#/types';
import { cn } from '#/utils/cn';
import { ICheck } from '#components';
import { computed } from 'vue';

export type CheckboxVariant = 'basic' | 'single' | 'box';

interface Props {
  id?: string;
  label?: string;
  value?: unknown;
  variant?: CheckboxVariant;
  checked?: boolean;
  disabled?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'basic',
  checked: false,
  disabled: false,
});

const modelValue = defineModel<unknown>();
const { internalId, isChecked } = useCheckable(props, modelValue);

const wrapperClasses = computed(() =>
  cn(
    'inline-flex items-center gap-3',
    props.variant !== 'box' && 'self-start',
    props.disabled && 'opacity-50 select-none',
    props.variant === 'box' && 'relative w-full h-[50px] justify-center', // box
    props.class,
  )
);

// input checkbox 스타일 - variant별로 완전히 다름
const inputClasses = computed(() => {
  if (props.variant === 'basic') {
    return cn(
      'peer relative size-[24px] shrink-0 appearance-none rounded',
      'border bg-white',
      !isChecked.value && !props.disabled && borderColorMap['secondary'],                          // unchecked
      !isChecked.value && props.disabled && [bgColorMap['disabled'], borderColorMap['tertiary']],  // disabled
      isChecked.value && !props.disabled && [borderColorMap['primary'], bgColorMap['primary']],    // checked
      isChecked.value && props.disabled && ['bg-mint-300', 'border-mint-300'],                     // checked & disabled
    );
  }
  if (props.variant === 'single') {
    return cn(
      'peer relative size-[24px] shrink-0 appearance-none border-none bg-transparent',
    );
  }
  // box
  return cn(
    'peer absolute inset-0 inline-flex appearance-none rounded-lg border bg-white',
    !isChecked.value && !props.disabled && borderColorMap['secondary'],                 // unchecked
    !isChecked.value && props.disabled && [bgColorMap['disabled'], borderColorMap['tertiary']],  // disabled
    isChecked.value && !props.disabled && borderColorMap['primary'],                    // checked
    isChecked.value && props.disabled && 'border-mint-300',                             // checked & disabled
  );
});

// 체크 아이콘 - basic/single만 노출, box는 숨김
const iconClasses = computed(() => {
  if (props.variant === 'box') return 'hidden';

  return cn(
    'absolute left-1/2 top-1/2 size-[24px] -translate-x-1/2 -translate-y-1/2',
    props.variant === 'basic' && [
      isChecked.value ? 'text-white' : 'text-gray-300', // unchecked
    ],
    props.variant === 'single' && [
      !props.disabled && (isChecked.value ? colorMap['primary'] : 'text-gray-300'),
      props.disabled && (isChecked.value ? 'text-mint-300' : 'text-gray-200'), // checked & disabled
    ],
  );
});

const textClasses = computed(() => {
  let colorClass = colorMap['secondary']; // text 기본 색상

  if (props.variant === 'box' && isChecked.value) {
    colorClass = props.disabled ? 'text-mint-300' : colorMap['primary'];
  } else if (props.disabled) {
    colorClass = colorMap['disabled'];
  }

  return cn(
    TypoMap['label-m'],
    colorClass,
    props.variant === 'box' && 'relative',
  );
});
</script>

<template>
  <label :for="internalId" :class="wrapperClasses">
    <span v-if="variant !== 'box'" class="relative inline-flex">
      <input
        :id="internalId"
        v-model="modelValue"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :class="inputClasses"
      >
      <ICheck :class="iconClasses" />
    </span>

    <template v-else>
      <input
        :id="internalId"
        v-model="modelValue"
        type="checkbox"
        :value="value"
        :checked="isChecked"
        :disabled="disabled"
        :class="inputClasses"
      >
    </template>

    <span v-if="label || $slots.default" :class="textClasses">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>