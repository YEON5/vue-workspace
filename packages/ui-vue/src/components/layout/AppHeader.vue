<script setup lang="ts">
import type { Component } from 'vue';

export interface HeaderBtn {
  icon: Component | object | any;
  action: () => void;
  label: string; // 접근성
  iconClass?: string
}

interface Props {
  align?: 'left' | 'center'; // title 정렬
  transparent?: boolean;
  title?: string;
  leftBtn?: HeaderBtn | HeaderBtn[];
  rightBtn?: HeaderBtn | HeaderBtn[];
}

const props = withDefaults(defineProps<Props>(), {
  align: 'center',
});
const normalizeBtn = (btns?: HeaderBtn | HeaderBtn[]) => {
  if (!btns) return [];
  return Array.isArray(btns) ? btns : [btns];
};

</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 flex-none w-full transition-colors duration-200',
      'h-[54px] pt-[env(safe-area-inset-top)]',
      transparent ? 'bg-transparent' : 'bg-background border-b border-border',
    ]"
  >
    <div class="relative flex items-center h-full px-4 gap-2">
      <!-- left area -->
      <div
        class="flex items-center"
        :class="align === 'center' ? 'flex-1 min-w-0' : 'flex-none'"      
      >
        <template v-if="leftBtn">
          <button
            v-for="(btn, index) in normalizeBtn(leftBtn)"
            :key="btn.label ?? index"
            class="p-2 -ml-2"
            :aria-label="btn.label"
            @click="btn.action"
          >
            <component 
              :is="btn.icon" 
              class="size-[24px]" 
              :class="btn.iconClass"
            />
          </button>
        </template>
        <slot v-else name="left" />
      </div>
      
      <!-- title area -->
      <div
        :class="[
          'text-lg font-medium text-foreground truncate',
          align === 'center'
            ? 'absolute z-50 inset-x-0 mx-auto text-center px-[80px] pointer-events-none'
            : 'flex-1 min-w-0 text-left',
        ]"
      >
        <slot name="title">{{ title }}</slot>
      </div>

      <!-- right area -->
      <div 
        class="flex items-center justify-end gap-3"
        :class="align === 'center' ? 'flex-1 min-w-0' : 'flex-none'"
      >
        <template v-if="rightBtn">
          <button
            v-for="(btn, index) in normalizeBtn(rightBtn)"
            :key="btn.label ?? index"
            class="p-2 -mr-2"
            :aria-label="btn.label"
            @click="btn.action"
          >
            <component
              :is="btn.icon"
              class="size-[24px]" 
              :class="btn.iconClass"
            />
          </button>
        </template>
        <slot v-else name="right" />
      </div>
    </div>
  </header>
</template>



<!-- Nuxt 환경 header 설정
definePageMeta({ header: { isView: false } })
definePageMeta({ header: { mainType: '키오스크 찾기', rightBtn: { icon: IMy, click: () => {} } } })
definePageMeta({ header: { contentTitle: '키오스크 찾기' } })
definePageMeta({ layout: 'web', webheader: { mainType: '키오스크 찾기', rightBtn: { icon: IMy, click: () => {} } } })

// 오른쪽 아이콘 버튼 배열 처리
definePageMeta({ 
    header: { mainType: '키오스크 찾기',
    rightBtn: [
      { icon: IMy, click: () => {} },
      { icon: IInfo, click: () => {} },
    ],
  },
})
-->