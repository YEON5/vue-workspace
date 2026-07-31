<script setup lang="ts">
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '@/types';
import { cn } from '@/utils/cn';
import { computed, useId, useSlots } from 'vue';

export type InputType = 'text' | 'password' | 'tel' | 'number';

interface Props extends SpacingProps {
  type?: InputType;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: boolean;
  errorMsg?: string;
  innerBtn?: string;
  maxLength?: number;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  placeholder: '',
  readonly: false,
  disabled: false,
  required: false,
  error: false,
  errorMsg: '',
  innerBtn: '',
  maxLength: undefined,
});

const modelValue = defineModel<string>({ default: '' });
const { spacingClasses } = useSpacing(props);

const inputId = useId();
const slots = useSlots();

const formFieldClasses = computed(() =>
  cn(
    'relative flex flex-col gap-3 w-full',
    spacingClasses.value,
    props.class
  )
)
const labelClasses = computed(() =>
  cn(
    'inline-flex items-center',
    TypoMap['label-m'],
    colorMap['secondary'],
    props.disabled && colorMap['disabled'],
  )
);
const inputClasses = computed(() =>
  cn(
    'w-full h-[56px] px-5 rounded-lg outline-none transition-colors border',
    TypoMap['body-m'],
    colorMap['secondary'],
    bgColorMap['white'],
    borderColorMap['tertiary'],
    'focus:border-mint-500',
    props.readonly && 'bg-gray-100',
    props.disabled && [colorMap['disabled'], bgColorMap['disabled'], borderColorMap['disabled'], 'cursor-not-allowed'],
    props.error && borderColorMap['error'],
    slots.suffix && 'pr-9',
  )
);
const errorMsgClasses = computed(() =>
  cn('text-xs', colorMap['error']),
);
</script>

<template>
  <div class="form-field" :class="formFieldClasses">
    <!-- label -->
    <div v-if="label">
      <label :for="inputId" :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-lg text-destructive ml-0.5">*</span>
      </label>
    </div>

    <!-- input -->
    <div class="form-input relative flex-1">
      <input 
        :id="inputId"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :class="inputClasses"
      >
      <div v-if="$slots.suffix" class="absolute right-2 top-1/2 -translate-y-1/2">
        <slot name="suffix" />
      </div>
    </div>

    <!-- error msg -->
    <p v-if="error && errorMsg" :class="errorMsgClasses">
      {{ errorMsg }}
    </p>
  </div>
</template>