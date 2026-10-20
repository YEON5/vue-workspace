// composables/useDismiss.ts
// Popover, Tooltip 바깥 클릭 + ESC

import { onBeforeUnmount, watch, type Ref } from 'vue';

export type DismissReason = 'outside' | 'escape';

interface Options {
  open: Ref<boolean>;
  elements: Ref<HTMLElement | null>[]; // 이 안쪽 클릭은 '바깥'으로 보지 않음 (트리거, 콘텐츠)
  onDismiss: (reason: DismissReason) => void;
  outsidePress?: boolean; // 바깥 클릭 감지
  escape?: boolean;
}

export function useDismiss({ open, elements, onDismiss, outsidePress = true, escape = true }: Options) {
  function onPointerDown(e: PointerEvent) {
    const target = e.target as Node | null;
    if (!target) return;
    if (elements.some(el => el.value?.contains(target))) return;
    onDismiss('outside');
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onDismiss('escape');
  }

  function bind() {
    if (outsidePress) document.addEventListener('pointerdown', onPointerDown, true);
    if (escape) document.addEventListener('keydown', onKeydown);
  }

  function unbind() {
    document.removeEventListener('pointerdown', onPointerDown, true);
    document.removeEventListener('keydown', onKeydown);
  }

  watch(open, v => (v ? bind() : unbind()), { immediate: true });
  onBeforeUnmount(unbind);
}