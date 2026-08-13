// src/composables/useFormField.ts
// TextInput, TextArea, Select 등 폼 컴포넌트의 공통 스타일/상태 로직
import { TypoMap, colorMap } from '@/types';
import type { FormFieldProps } from '@/types/form';
import { cn } from '@/utils/cn';
import { computed } from 'vue';

export function useFormField(props: FormFieldProps) {
  const labelClasses = computed(() =>
    cn(
      'inline-flex items-center',
      TypoMap['label-m'],
      props.disabled ? colorMap['disabled'] : colorMap['secondary'],
    )
  );

  const errorMsgClasses = computed(() =>
    cn('text-xs', colorMap['error']),
  );

  const infoMsgClasses = computed(() =>
    cn('text-xs', colorMap['tertiary']),
  );

  // error가 있으면 errorMsg 우선, 없으면 infoMsg
  const showError = computed(() => props.error && !!props.errorMsg);
  const showInfo = computed(() => !showError.value && !!props.infoMsg);

  return {
    labelClasses,
    errorMsgClasses,
    infoMsgClasses,
    showError,
    showInfo,
  };
}