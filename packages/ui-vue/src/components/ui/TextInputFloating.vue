<script setup lang="ts">
import { IInputDelete } from '#components';
import { useFocusContainer } from '@/composables/useFocusContainer';
import { type SpacingProps } from '@/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '@/types';
import { cn } from '@/utils/cn';
import { computed, inject, ref, useSlots, type Ref } from 'vue';

export type InputType = 'text' | 'password' | 'tel' | 'numeric';
export type InputAlign = 'left' | 'center' | 'right' ;

interface Props extends SpacingProps {
  id?: string;
  label: string; // 💡 플로팅 라벨 (필수)
  floatMode?: boolean; // 💡 데이터 로드 시점 애니메이션 방지용 강제 플로팅
  type?: InputType;
  align?: InputAlign;
  // placeholder?: string; // 플로팅 라벨이 placeholder 역할을 하므로 제거
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  clearable?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  floatMode: false,
  type: 'text',
  align: 'left',
  readonly: false,
  disabled: false,
  error: false,
  maxLength: undefined,
  clearable: true,
});

// input error 상태
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false));
const hasError = computed(() => props.error || formGroupError.value); 

const modelValue = defineModel<string>({ default: '' });
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

// numeric은 실제로는 text + inputmode로 렌더링
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

// ==========================================
// 💡 플로팅 라벨 상태 및 스타일 제어
// ==========================================
const isFloated = computed(() => 
  props.floatMode || // 1. 강제 플로팅 모드 (데이터 로딩 버그 방지)
  isFocused.value || // 2. 인풋에 포커스가 갔을 때
  !!modelValue.value // 3. 인풋에 값이 존재할 때
);

const labelClasses = computed(() =>
  cn(
    'absolute left-5 transition-all duration-200 pointer-events-none',
    hasError.value && !props.disabled ? colorMap['error'] : colorMap['caption'],
    
    isFloated.value 
      ? 'top-1.5 text-xs' // 위로 작아지며 올라감
      : 'top-1/2 -translate-y-1/2 text-base' // 정중앙 배치 (Placeholder 형태)
  )
);
// ==========================================

const wrapperClasses = computed(() =>
  cn('form-input relative', props.class)
);

const inputClasses = computed(() =>
  cn(
    // 💡 패딩 조정: 라벨이 들어갈 공간(pt-6) 확보 및 텍스트를 약간 내림(pb-2)
    'w-full h-[56px] px-5 pt-6 pb-2 border rounded-lg outline-none transition-colors',
    TypoMap['body-m'],

    !props.disabled && [
      colorMap['secondary'],
      bgColorMap['white'],
      borderColorMap['tertiary']
    ],
    props.readonly && !props.disabled && 'bg-gray-100', 
    hasError.value && !props.disabled && borderColorMap['error'], 

    props.disabled && [
      colorMap['disabled'],
      bgColorMap['disabled'],
      borderColorMap['disabled'],
      'cursor-not-allowed'
    ],
    !props.disabled && !props.readonly && 'focus:border-mint-500', 
    (props.clearable || slots.suffix) && 'pr-10',

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
    <!-- 💡 플로팅 라벨 -->
    <label :for="id" :class="labelClasses">
      {{ label }}
    </label>

    <input
      :id="id"
      ref="inputRef"
      v-model="modelValue"
      :type="nativeType"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="inputClasses"
      placeholder="" 
    >
    <!-- 🚨 플로팅 라벨이 대신하므로 네이티브 placeholder는 반드시 비웁니다 -->

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