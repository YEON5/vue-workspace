// src/composables/useFocusContainer.ts
// text input 및 폼 요소 포커스 관리
import { ref } from 'vue';

export function useFocusContainer() {
  const containerRef = ref<HTMLElement | null>(null);
  const isFocused = ref(false);

  const handleFocusIn = () => {
    isFocused.value = true;
  };

  const handleFocusOut = (event: FocusEvent) => {
    if (containerRef.value && containerRef.value.contains(event.relatedTarget as Node)) {
      return;
    }
    isFocused.value = false;
  };

  return {
    containerRef,
    isFocused,
    handleFocusIn,
    handleFocusOut,
  };
}