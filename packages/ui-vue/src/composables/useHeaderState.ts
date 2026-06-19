import type { HeaderBtn } from '#components/AppHeader.vue';
import { ref, shallowRef } from 'vue';

const isVisible = ref(true);
const title = ref('');
const leftBtn = shallowRef<HeaderBtn | HeaderBtn[]>([]);
const rightBtn = shallowRef<HeaderBtn | HeaderBtn[]>([]);

export const useHeaderState = () => {
  const setHeader = (options: { 
    isVisible?: boolean; // header hidden
    title?: string; 
    leftBtn?: HeaderBtn | HeaderBtn[]; 
    rightBtn?: HeaderBtn | HeaderBtn[] 
  }) => {
    isVisible.value = options.isVisible ?? true;
    title.value = options.title || '';
    leftBtn.value = options.leftBtn || [];
    rightBtn.value = options.rightBtn || [];
  };

  return { isVisible, title, leftBtn, rightBtn, setHeader };
};