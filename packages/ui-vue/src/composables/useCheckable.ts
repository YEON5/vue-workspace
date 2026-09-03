import { computed, useId, type Ref } from 'vue';

interface CheckableProps {
  id?: string;
  value?: unknown;
  checked?: boolean;
}

export function useCheckable(props: CheckableProps, modelValue: Ref<unknown>) {
  const autoId = useId();
  const internalId = computed(() => props.id ?? autoId);

  const isChecked = computed(() => {
    // v-model이 배열일 때
    if (Array.isArray(modelValue.value)) {
      return modelValue.value.includes(props.value);
    }
    // v-model이 주입되었을 때 (boolean 등)
    if (modelValue.value !== undefined) {
      return !!modelValue.value;
    }
    // v-model 없이 checked 프롭스만 단독으로 쓰였을 때
    return !!props.checked;
  });

  return {
    internalId,
    isChecked,
  };
}