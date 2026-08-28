<script setup lang="ts">
import { useFocusContainer } from '#/composables/useFocusContainer';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { IInputDelete } from '#components';
import { computed, inject, ref, useSlots, type Ref } from 'vue';
import Button from './Button.vue';

export type InputType = 'text' | 'password' | 'tel' | 'numeric';
export type InputAlign = 'left' | 'center' | 'right';

interface Props {
  id?: string;
  type?: InputType;
  align?: InputAlign;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  clearable?: boolean;
  class?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  align: 'left',
  readonly: false,
  disabled: false,
  error: false,
  maxLength: undefined,
  clearable: true,
});

// input error 상태
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false)); // 상위 FormGroup의 error 상태를 주입받음 (없으면 false)
const hasError = computed(() => props.error || formGroupError.value); // 자기가 직접 error를 받았거나, 상위 FormGroup이 error 상태라면

const modelValue = defineModel<string>({ default: '' });
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

// numeric은 실제로는 text + inputmode로 렌더링 (스피너/maxLength 미적용 문제 회피)
const nativeType = computed(() => (props.type === 'numeric' ? 'text' : props.type));
const inputMode = computed(() => (props.type === 'numeric' ? 'numeric' : undefined));
const inputPattern = computed(() => (props.type === 'numeric' ? '[0-9]*' : undefined));

const { containerRef, isFocused, handleFocusIn, handleFocusOut } = useFocusContainer();

// 입력값 삭제
const handleClear = () => {
  if (props.disabled || props.readonly) return;
  modelValue.value = '';
  inputRef.value?.focus();
};

const wrapperClasses = computed(() =>
  cn('form-input relative', props.class)
);

const inputClasses = computed(() =>
  cn(
    'w-full h-[56px] px-5 border rounded-lg outline-none transition-colors',
    TypoMap['label-m'],

    // 기본 스타일 (비활성화가 아닐 때만 DOM에 노출)
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
    (props.clearable || slots.suffix) && 'pr-10',

    // input 텍스트 정렬
    {
      'text-left': props.align === 'left',
      'text-center': props.align === 'center',
      'text-right': props.align === 'right',
    },
  )
);
</script>

<template>
  <div
    ref="containerRef"
    :class="wrapperClasses"
    @focusin="handleFocusIn"
    @focusout="handleFocusOut"
  >
    <input
      :id="id"
      ref="inputRef"
      v-model="modelValue"
      :type="nativeType"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="inputClasses"
      :aria-label="ariaLabel"
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
</template>