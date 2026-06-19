<script setup lang="ts">
import { ILeftArrow, IMenu, ISearch } from '#components';

interface Props {
  title?: string;
  showBackBtn?: boolean;
  menuBtn?: boolean;
  myBtn?: boolean;
  searchBtn?: boolean;
  transparent?: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: 'back'): void;
  (e: 'menu'): void;
  (e: 'setting'): void;
}>();
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 flex-none w-full transition-colors duration-200',
      'h-[54px] pt-[env(safe-area-inset-top)]',
      transparent ? 'bg-transparent' : 'bg-background border-b border-border',
    ]"
  >
    <div class="flex items-center justify-between h-full px-4">
      <!-- left area -->
      <div class="flex items-center flex-1">
        <button 
          v-if="showBackBtn"
          class="p-2 -ml-2"
          aria-label="뒤로 가기"
          @click="$emit('back')"
        >
          <ILeftArrow class="size-[32px]" />
        </button>
        <slot v-else name="left" />
      </div>

      <!-- title -->
      <div class="flex-shrink-0 text-lg font-medium text-foreground">
        <slot name="title">
          {{ title }}
        </slot>
      </div>

      <!-- right area -->
      <div class="flex items-center justify-end flex-1 gap-3">
        <button 
          v-if="searchBtn"
          class="p-2 -ml-2"
          aria-label="my 메뉴 열기"
          @click="$emit('setting')"
        >
          <ISearch class="size-[24px]" />
        </button>
        <button 
          v-if="menuBtn"
          class="p-2 -ml-2"
          aria-label="메뉴 열기"
          @click="$emit('menu')"
        >
          <IMenu class="size-[24px]" />
        </button>
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