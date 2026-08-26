<script setup lang="ts">
import { useFocusContainer } from '#/composables/useFocusContainer';
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { computed, inject, onBeforeUnmount, ref, useId, watch, type Ref } from 'vue';

interface Props {
  id?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  readonly?: boolean;
  disabled?: boolean;
  error?: boolean;
  maxLength?: number;
  rows?: number; // 기본 높이(행 수)
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
  showCount?: boolean; // 우측 하단 글자 수 표시 여부
  class?: string;
  floatMode?: boolean; // 데이터 로드 시점 애니메이션 방지용 강제 플로팅
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  required: false,
  placeholder: '',
  readonly: false,
  disabled: false,
  error: false,
  maxLength: undefined,
  rows: 4,
  resize: 'none',
  showCount: false,
  floatMode: false,
});

// textarea error 상태 주입
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false));
const hasError = computed(() => props.error || formGroupError.value);

const modelValue = defineModel<string>({ default: '' });

// 고유 ID 자동 생성 (Label for 속성 매칭용)
const autoId = useId();
const internalId = computed(() => props.id ?? autoId);

const { containerRef, isFocused, handleFocusIn, handleFocusOut } = useFocusContainer();

// 💡 floating label 제어[cite: 5]
const isFloated = computed(() =>
  props.floatMode ||
  isFocused.value ||
  !!modelValue.value
);

// 💡 placeholder 제어 (라벨이 올라갈 시간을 벌어주는 지연 노출)[cite: 5]
const displayPlaceholder = ref('');
let placeholderTimer: ReturnType<typeof setTimeout> | null = null;

watch(
  () => isFloated.value,
  (newVal) => {
    if (!props.label) {
      displayPlaceholder.value = props.placeholder || '';
      return;
    }

    if (placeholderTimer) clearTimeout(placeholderTimer);

    if (newVal) {
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

// Label 스타일 연산
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
      ? cn('top-[8px]', TypoMap['label-xs']) // 떠올랐을 때: 약간 위로 붙으면서 작아짐
      : cn('top-[12px]', TypoMap['label-m']),     // 💡 평상시: 정중앙이 아닌 textarea 기본 상단 패딩(py-4) 위치에 정렬
  )
);

// Wrapper 및 Textarea 클래스 연산
const wrapperClasses = computed(() => cn('flex flex-col gap-3', props.class));

const textareaClasses = computed(() =>
  cn(
    'block w-full px-5 border rounded-lg outline-none transition-colors',
    // 💡 라벨이 있을 때는 텍스트가 겹치지 않게 상단 패딩을 여유롭게(pt-[28px]) 주고, 없을 때는 기본 패딩(py-4) 사용
    props.label ? 'pt-[28px] pb-[12px]' : 'py-[12px]', 
    TypoMap['label-m'],

    // 기본 스타일
    !props.disabled && [
      colorMap['secondary'],
      bgColorMap['white'],
      borderColorMap['tertiary']
    ],
    `placeholder:${colorMap['caption']}`,
    props.readonly && !props.disabled && 'bg-gray-100',
    hasError.value && !props.disabled && borderColorMap['error'],

    // disabled 스타일
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
    },
  )
);

// 글자 수 카운팅[cite: 6]
const textCount = computed(() => modelValue.value.length);
</script>

<template>
  <div :class="wrapperClasses">
    <div
      ref="containerRef"
      class="textarea-wrapper relative"
      @focusin="handleFocusIn"
      @focusout="handleFocusOut"
    >
      <label v-if="label" :for="internalId" :class="labelClasses">
        {{ label }}<span v-if="required" class="text-lg text-destructive ml-[2px]">*</span>
      </label>

      <textarea
        :id="internalId"
        v-model="modelValue"
        :placeholder="displayPlaceholder"
        :readonly="readonly"
        :disabled="disabled"
        :maxlength="maxLength"
        :rows="rows"
        :class="textareaClasses"
      />
    </div>

    <!-- 글자 수 표시[cite: 6] -->
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