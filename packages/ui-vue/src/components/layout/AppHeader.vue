<script setup lang="ts">
interface Props {
  title?: string;
  showBackButton?: boolean;
  transparent?: boolean;
}

defineProps<Props>();
defineEmits<{
  (e: 'back'): void;
}>();
</script>

<template>
  <header
    :class="[
      'sticky top-0 z-50 flex-none w-full transition-colors duration-200',
      'h-[5.4px] pt-[env(safe-area-inset-top)]',
      transparent ? 'bg-transparent' : 'bg-background border-b border-border',
    ]"
  >
    <div class="flex items-center justify-between h-full px-4">
      <!-- left area -->
      <div class="flex items-center flex-1">
        <button 
          v-if="showBackButton"
          class="p-2 -ml-2 text-foreground"
          aria-label="뒤로 가기"
          @click="$emit('back')"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
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
      <div class="flex items-center justify-end flex-1">
        <slot name="right" />
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