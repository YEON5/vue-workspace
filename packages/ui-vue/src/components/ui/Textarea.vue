<script setup lang="ts">
import { IInfo } from '#components';
import { useFocusContainer } from '@/composables/useFocusContainer';
import { useFormField } from '@/composables/useFormField';
import { useSpacing, type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '@/types';
import type { FormFieldProps } from '@/types/form';
import { cn } from '@/utils/cn';
import { computed, useId } from 'vue';

interface Props extends SpacingProps, FormFieldProps {
  placeholder?: string;
  maxLength?: number;
  rows?: number; // 기본 높이(행 수)
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'; 
  showCount?: boolean; // 우측 하단 글자 수
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '',
  readonly: false,
  disabled: false,
  required: false,
  error: false,
  errorMsg: '',
  infoMsg: '',
  maxLength: undefined,
  rows: 4, // 기본 4줄
  resize: 'none',
  showCount: false,
});

const modelValue = defineModel<string>({ default: '' });
const { spacingClasses } = useSpacing(props);

const inputId = useId();

const { containerRef, handleFocusIn, handleFocusOut } = useFocusContainer();
const { labelClasses, errorMsgClasses, infoMsgClasses, showError, showInfo } = useFormField(props);

const formFieldClasses = computed(() =>
  cn(
    'relative flex flex-col gap-3 flex-1',
    spacingClasses.value,
    props.class
  )
);

// textarea 높이 임의 패딩값 px-5 py-4 적용
const textareaClasses = computed(() =>
  cn(
    'w-full px-5 py-4 rounded-lg outline-none transition-colors border',
    TypoMap['body-m'],
    
    !props.disabled && [
      colorMap['label'], 
      bgColorMap['white'], 
      borderColorMap['tertiary']
    ],
    props.readonly && !props.disabled && 'bg-gray-100',
    props.error && !props.disabled && borderColorMap['error'],
    props.disabled && [
      colorMap['disabled'], 
      bgColorMap['disabled'], 
      borderColorMap['disabled'], 
      'cursor-not-allowed'
    ],
    !props.disabled && !props.readonly && 'focus:border-mint-500', 
    
    // resize option
    {
      'resize-none': props.resize === 'none',
      'resize-y': props.resize === 'vertical',
      'resize-x': props.resize === 'horizontal',
      'resize': props.resize === 'both',
    }
  )
);

// 글자 수 카운팅
const textCount = computed(() => modelValue.value.length);
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

    <!-- textarea -->
    <div
      ref="containerRef"
      class="form-input relative flex-1"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <textarea
        :id="inputId"
        v-model="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        :class="textareaClasses"
      />
    </div>

    <!-- 하단 부가 정보 영역 (메시지 & 카운터) -->
    <div class="flex items-start justify-between gap-3">
      <!-- error / info msg -->
      <div class="flex-1">
        <Flex v-if="showError" align="center" gap="2">
          <IInfo class="size-5" />
          <p :class="errorMsgClasses">{{ errorMsg }}</p>
        </Flex>
        
        <Flex v-else-if="showInfo" align="center" gap="2">
          <IInfo class="size-5" />
          <p :class="infoMsgClasses">{{ infoMsg }}</p>
        </Flex>
      </div>

      <!-- 글자 수 표시 (show-count와 :max-length가 있을 때만 노출) -->
      <div 
        v-if="showCount && maxLength" 
        class="text-xs text-gray-400 shrink-0"
      >
        <span :class="{ 'text-error': textCount >= maxLength }">
          {{ textCount }}
        </span>
        / {{ maxLength }}
      </div>
    </div>
  </div>
</template>