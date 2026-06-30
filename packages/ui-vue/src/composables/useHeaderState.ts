import type { HeaderBtn } from '@/components/layout/AppHeader.vue';
import { ref, shallowRef } from 'vue';

export const isVisible = ref(true);
export const align = ref<'left' | 'center'>('center');
export const transparent = ref(false); // 기본값 불투명
export const title = ref('');
export const leftBtn = shallowRef<HeaderBtn | HeaderBtn[] | undefined>(undefined);
export const rightBtn = shallowRef<HeaderBtn | HeaderBtn[] | undefined>(undefined);

export const setHeader = (options: { 
  isVisible?: boolean;
  align?: 'left' | 'center';
  transparent?: boolean;
  title?: string;
  leftBtn?: HeaderBtn | HeaderBtn[]; 
  rightBtn?: HeaderBtn | HeaderBtn[] 
}) => {
  isVisible.value = options.isVisible ?? true;
  align.value = options.align ?? 'center';
  transparent.value = options.transparent ?? false;
  title.value = options.title || '';
  leftBtn.value = options.leftBtn;
  rightBtn.value = options.rightBtn;
};