<script setup lang="ts">
import { IInfo, IInputDelete } from '#components';
import { useFocusContainer } from '@/composables/useFocusContainer';
import { useFormField } from '@/composables/useFormField';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap, type FormFieldProps } from '@/types';
import { cn } from '@/utils/cn';
import { computed, ref, useId, useSlots } from 'vue';

export type InputType = 'text' | 'password' | 'tel' | 'number';

interface Props extends SpacingProps, FormFieldProps {
  type?: InputType;
  placeholder?: string;
  maxLength?: number;
  clearable?: boolean;
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
  infoMsg: '',
  maxLength: undefined,
  clearable: true,
});

const modelValue = defineModel<string>({ default: '' });
const { spacingClasses } = useSpacing(props);

const inputId = useId();
const slots = useSlots();

const inputRef = ref<HTMLInputElement | null>(null);

const { containerRef, isFocused, handleFocusIn, handleFocusOut } = useFocusContainer();
const { labelClasses, errorMsgClasses, infoMsgClasses, showError, showInfo } = useFormField(props);

// 입력값 삭제
const handleClear = () => {
  if (props.disabled || props.readonly) return;
  modelValue.value = '';
  inputRef.value?.focus(); // 입력값 삭제 후 input에 다시 focus
};

const formFieldClasses = computed(() =>
  cn(
    'relative flex flex-col gap-3 flex-1',
    spacingClasses.value,
    props.class
  )
)
const inputClasses = computed(() =>
  cn(
    'w-full h-[56px] px-5 rounded-lg outline-none transition-colors border',
    TypoMap['body-m'],

    // 기본 스타일 (비활성화가 아닐 때만 DOM에 노출)
    !props.disabled && [
      colorMap['label'], 
      bgColorMap['white'], 
      borderColorMap['tertiary']
    ],
    props.readonly && !props.disabled && 'bg-gray-100', // readonly
    props.error && !props.disabled && borderColorMap['error'], // error
    
    // disabled일 때만
    props.disabled && [
      colorMap['disabled'], 
      bgColorMap['disabled'], 
      borderColorMap['disabled'], 
      'cursor-not-allowed'
    ],
    !props.disabled && !props.readonly && 'focus:border-mint-500', // focus    
    (props.clearable || slots.suffix) && 'pr-10',
  )
);
</script>

<template>
  <div class="form-field" :class="formFieldClasses">
    <!-- label -->
    <div v-if="label" class="form-label">
      <label :for="inputId" :class="labelClasses">
        {{ label }}
        <span v-if="required" class="text-lg text-destructive ml-0.5">*</span>
      </label>
    </div>

    <!-- input -->
    <div
      ref="containerRef"
      class="form-input relative flex-1"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <input
        :id="inputId"
        ref="inputRef"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :class="inputClasses"
      >
      <div 
        v-if="clearable || slots.suffix" 
        class="flex items-center gap-1.5 absolute right-3 top-1/2 -translate-y-1/2"
      >
        <!-- clear button (입력값 삭제) -->
        <Button
          v-if="clearable && modelValue && isFocused && !disabled && !readonly"
          variant="icon"
          aria-label="입력 내용 지우기"
          class="p-1"
          @click="handleClear"
        >
          <IInputDelete class="size-[20px]" />
        </Button>

        <!-- input 안에 버튼 및 내용 추가 slot -->
        <slot name="suffix" />
      </div>
    </div>

    <!-- error msg -->
    <Flex v-if="showError" align="center" gap="2">
      <IInfo class="size-5" />
      <p :class="errorMsgClasses">
        {{ errorMsg }}
      </p>
    </Flex>
    
    <!-- info msg -->
    <Flex v-else-if="showInfo" align="center" gap="2">
      <IInfo class="size-5" />
      <p :class="infoMsgClasses">
        {{ infoMsg }}
      </p>
    </Flex>
  </div>
</template>