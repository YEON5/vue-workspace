// src/types/form.ts
// FormGroup, useFormField에서 사용하는 공통 필드 props
// label, required, disabled는 기본형(TextInput/TextArea/Select + FormGroup) 조합에서 사용됨.
//
// 참고: TextInputFloating 형태로 전면 전환되면
// TextInputFloating은 label을 컴포넌트가 자체 내장하므로 label, required, disabled와
// FormGroup.vue의 props, label 렌더링 영역 함께 제거할 것.


export interface FormFieldProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMsg?: string;
  infoMsg?: string;
}