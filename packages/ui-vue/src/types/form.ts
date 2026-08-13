// src/types/form.ts
// TextInput, TextArea, Select, AmountInput, DateInput 등
// 폼 컴포넌트 전반에서 공유하는 공통 props

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorMsg?: string;
  infoMsg?: string;
}