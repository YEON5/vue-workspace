<script setup lang="ts">
import { useFocusContainer } from '#/composables/useFocusContainer';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, ref, type Ref } from 'vue';

interface Props {
  id?: string;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  rows?: number; // 기본 높이(행 수)
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCount?: boolean; // 우측 하단 글자 수
  class?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  readonly: false,
  disabled: false,
  error: false,
  maxLength: undefined,
  rows: 4, // 기본 4줄
  resize: 'none',
  showCount: false,
});

// textarea error 상태
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false)); // 상위 FormGroup의 error 상태를 주입받음 (없으면 false)
const hasError = computed(() => props.error || formGroupError.value); // 자기가 직접 error를 받았거나, 상위 FormGroup이 error 상태라면

const modelValue = defineModel<string>({ default: '' });

const { containerRef, handleFocusIn, handleFocusOut } = useFocusContainer();


const wrapperClasses = computed(() =>
  cn('flex flex-col gap-3', props.class)
);
const textareaClasses = computed(() =>
  cn(
    'block w-full px-5 py-4 border rounded-lg outline-none transition-colors',
    TypoMap['label-m'],

    // 기본 스타일
    !props.disabled && [
      colorMap['secondary'],
      bgColorMap['white'],
      borderColorMap['tertiary']
    ],
    `placeholder:${colorMap['caption']}`, // placeholder
    props.readonly && !props.disabled && 'bg-gray-100', // readonly
    hasError.value && !props.disabled && borderColorMap['error'], // error

    // disabled일 때만
    props.disabled && [
      colorMap['disabled'],
      bgColorMap['disabled'],
      borderColorMap['disabled'],
      'cursor-not-allowed'
    ],
    !props.disabled && !props.readonly && 'focus:border-mint-500', // focus border color

    // resize option
    {
      'resize-none': props.resize === 'none',
      'resize-y': props.resize === 'vertical',
      'resize-x': props.resize === 'horizontal',
      'resize': props.resize === 'both',
    },
  )
);

// 글자 수 카운팅
const textCount = computed(() => modelValue.value.length);
</script>

<template>
  <div :class="wrapperClasses">
    <div
      ref="containerRef"
      class="textarea relative"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <textarea
        :id="id"
        v-model="modelValue"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        :class="textareaClasses"
        :aria-label="ariaLabel"
      />
    </div>

    <!-- 글자 수 표시 (showCount와 maxLength가 있을 때만 노출) -->
    <div v-if="showCount && maxLength" class="flex justify-end">
      <span class="text-xs text-gray-500 shrink-0">
        <span :class="{ 'text-destructive': textCount >= maxLength }">
          {{ textCount }}
        </span>
        / {{ maxLength }}
      </span>
    </div>
  </div>
</template>