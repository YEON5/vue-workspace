// src/composables/useFormField.ts
// TextInput, TextArea, Select 등 폼 컴포넌트의 공통 스타일/상태 로직
// label, 에러메시지(errorMsg), 정보메시지(infoMsg)
// labelClasses는 기본형(FormGroup이 label을 그리는 조합)에서만 사용됨.
//
// 참고: TextInputFloating 형태로 전면 전환되면
// labelClasses와 FormGroup.vue의 props, label 렌더링 영역 함께 제거할 것.


import { TypoMap, colorMap } from '#/types';
import type { FormFieldProps } from '#/types/form';
import { cn } from '#/utils/cn';
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
    cn('text-xs', colorMap['caption']),
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