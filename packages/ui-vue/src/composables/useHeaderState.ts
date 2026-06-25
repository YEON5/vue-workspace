import type { HeaderBtn } from '#components/AppHeader.vue';
import { ref, shallowRef } from 'vue';

export const isVisible = ref(true);
export const title = ref('');
export const leftBtn = shallowRef<HeaderBtn | HeaderBtn[]>([]);
export const rightBtn = shallowRef<HeaderBtn | HeaderBtn[]>([]);

export const setHeader = (options: { 
  isVisible?: boolean;
  title?: string; 
  leftBtn?: HeaderBtn | HeaderBtn[]; 
  rightBtn?: HeaderBtn | HeaderBtn[] 
}) => {
  isVisible.value = options.isVisible ?? true;
  title.value = options.title || '';
  leftBtn.value = options.leftBtn || [];
  rightBtn.value = options.rightBtn || [];
};