<script setup lang="ts">
import { useFocusContainer } from '#/composables/useFocusContainer';
import { useSpacing, type SpacingProps } from '#/composables/useSpacing';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { IInputDelete } from '#components';
import { computed, inject, onBeforeUnmount, ref, useId, useSlots, watch, type Ref } from 'vue';
import Button from './Button.vue';

export type InputType = 'text' | 'password' | 'tel' | 'numeric';
export type InputAlign = 'left' | 'center' | 'right';

interface Props extends SpacingProps {
  id?: string;
  label?: string;
  required?: boolean;
  type?: InputType;
  align?: InputAlign;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  clearable?: boolean;
  class?: string;
  floatMode?: boolean; // 데이터 로드 시점 애니메이션 방지용 강제 플로팅
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  label: '',
  required: false,
  placeholder: '',
  align: 'left',
  readonly: false,
  disabled: false,
  error: false,
  maxLength: undefined,
  clearable: true,
  floatMode: false,
});

// input error 상태
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false));
const hasError = computed(() => props.error || formGroupError.value);

const modelValue = defineModel<string>({ default: '' });
const { spacingClasses } = useSpacing(props);
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);

// id를 직접 안 받으면 자체 생성 (label의 for와 연결하기 위함 - 이 컴포넌트는 label을 자체 내장)
const autoId = useId();
const internalId = computed(() => props.id ?? autoId);

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

// floating label 제어
const isFloated = computed(() =>
  props.floatMode ||  // 강제 플로팅 모드 (데이터 로딩 버그 방지)
  isFocused.value ||  // 인풋에 포커스가 갔을 때
  !!modelValue.value  // 인풋에 값이 존재할 때
);

// placeholder 제어
const displayPlaceholder = ref('');
let placeholderTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => isFloated.value,
  (newVal) => {
    // 라벨이 아예 없으면 타이머 없이 항상 즉시 노출
    if (!props.label) {
      displayPlaceholder.value = props.placeholder || '';
      return;
    }

    // 기존 타이머가 실행 중이라면 초기화 (버그 방지)
    if (placeholderTimer) clearTimeout(placeholderTimer);

    if (newVal) {
      // 라벨이 떠오를 때: 라벨이 위로 올라갈 시간을 벌어준 뒤 노출 (150ms 지연)
      placeholderTimer = setTimeout(() => {
        displayPlaceholder.value = props.placeholder || '';
      }, 150);
    } else {
      displayPlaceholder.value = '';
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (placeholderTimer) clearTimeout(placeholderTimer);
});


const labelColorClass = computed(() => {
  if (props.disabled) return colorMap['disabled'];
  if (!isFloated.value) return colorMap['secondary'];
  return colorMap['caption'];
});
const labelClasses = computed(() =>
  cn(
    'absolute left-5 transition-all duration-200 pointer-events-none',
    labelColorClass.value,
    isFloated.value
      ? cn('top-[8px]', TypoMap['label-xs']) // 위로 작아지며 올라감
      : cn('top-1/2 -translate-y-1/2', TypoMap['label-m']), // 정중앙 배치 (Placeholder 형태)
  )
);
const wrapperClasses = computed(() =>
  cn('form-input relative', spacingClasses.value, props.class)
);
const inputClasses = computed(() =>
  cn(
    'w-full h-[60px] px-5 border rounded-lg outline-none transition-colors',
    props.label ? 'pt-[22px]' : '', // label이 있을 때만 padding-top 추가
    TypoMap['label-m'],

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
    <label v-if="label" :for="internalId" :class="labelClasses">
      {{ label }}<span v-if="required" class="text-lg text-destructive ml-[2px]">*</span>
    </label>

    <input
      :id="internalId"
      ref="inputRef"
      v-model="modelValue"
      :type="nativeType"
      :inputmode="inputMode"
      :pattern="inputPattern"
      :readonly="readonly"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="inputClasses"
      :placeholder="displayPlaceholder"
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