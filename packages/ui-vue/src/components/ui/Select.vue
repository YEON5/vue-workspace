<script setup lang="ts">
import { TypoMap, bgColorMap, borderColorMap, colorMap } from '#/types';
import { cn } from '#/utils/cn';
import { IArrowSelect } from '#components';
import { computed, inject, ref, type Ref } from 'vue';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface Props {
  id?: string;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '선택해주세요',
  disabled: false,
  error: false,
});

// 상위 FormGroup의 error 상태 주입
const formGroupError = inject<Ref<boolean>>('formGroupError', ref(false));
const hasError = computed(() => props.error || formGroupError.value);

// v-model (초기값이 없으면 빈 문자열로 두어 placeholder가 선택되게 함)
const modelValue = defineModel<string | number>({ default: '' });

const wrapperClasses = computed(() =>
  cn('form-select relative', props.class)
);

const selectClasses = computed(() =>
  cn(
    'w-full h-[56px] px-5 pr-12 border rounded-lg outline-none transition-colors appearance-none',
    TypoMap['label-m'],

    !props.disabled && [
      colorMap['secondary'],
      bgColorMap['white'],
      borderColorMap['tertiary']
    ],
    
    // 값이 없을 때(placeholder 상태)는 텍스트 색상을 흐리게 처리
    !modelValue.value && colorMap['caption'], // placeholder
    
    hasError.value && !props.disabled && borderColorMap['error'], // error

    // disabled일 때만
    props.disabled && [
      colorMap['disabled'],
      bgColorMap['disabled'],
      borderColorMap['disabled'],
      'cursor-not-allowed'
    ],
    !props.disabled && 'focus:border-mint-500',
  )
);
</script>

<template>
  <div :class="wrapperClasses">
    <select
      :id="id"
      v-model="modelValue"
      :disabled="disabled"
      :class="selectClasses"
    >
      <!-- Placeholder 역할 (선택 불가, 숨김 처리) -->
      <option value="" disabled hidden>
        {{ placeholder }}
      </option>
      
      <!-- 실제 옵션 목록 -->
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- 커스텀 드롭다운 화살표 아이콘 -->
    <div class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
      <IArrowSelect class="size-5" />
    </div>
  </div>
</template>