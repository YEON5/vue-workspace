import { computed, useId, type Ref } from 'vue';

interface RadioableProps {
  id?: string;
  value?: unknown;
  checked?: boolean;
}

export function useRadioable(props: RadioableProps, modelValue: Ref<unknown>) {
  const autoId = useId();
  const internalId = computed(() => props.id ?? autoId);

  const isChecked = computed(() => {
    // v-model이 주입되었을 때 - 내 value와 같은지 비교
    if (modelValue.value !== undefined) {
      return modelValue.value === props.value;
    }
    // v-model 없이 checked props만 단독으로 쓰였을 때
    return !!props.checked;
  });

  return {
    internalId,
    isChecked,
  };
}