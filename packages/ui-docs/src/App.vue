<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter()
const navItems = router.getRoutes()

// 모바일 사이드바 열림/닫힘 상태
const isSidebarOpen = ref(false)
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    
    <!-- 모바일용 배경 오버레이 (사이드바 열렸을 때 뒤에 깔리는 어두운 배경) -->
    <div 
      v-if="isSidebarOpen" 
      class="fixed inset-0 bg-black/40 z-40 md:hidden"
      @click="isSidebarOpen = false"
    />

    <!-- 사이드바 -->
    <!-- md:relative로 PC에선 고정, 모바일(기본)에선 fixed로 화면 위에 띄움 -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r px-5 py-7 transition-transform duration-300 ease-in-out md:relative md:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-xl font-bold">UI COMPONENTS</h1>
        <!-- 모바일용 닫기(X) 버튼 -->
        <button class="md:hidden text-gray-500 text-2xl leading-none" @click="isSidebarOpen = false">&times;</button>
      </div>
      
      <nav class="flex flex-col gap-5">
        <!-- 모바일에서 메뉴 클릭 시 사이드바가 자동으로 닫히도록 이벤트 추가 -->
        <RouterLink 
          v-for="item in navItems" 
          :key="item.path" 
          :to="item.path"
          @click="isSidebarOpen = false"
        >
          {{ item.name }}
        </RouterLink>
      </nav>
    </aside>

    <!-- 메인 영역 래퍼 -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      
      <!-- 모바일용 상단 헤더 -->
      <header class="md:hidden bg-white border-b px-4 py-3 flex items-center shadow-sm z-30">
        <button class="p-1 mr-3 text-gray-700" @click="isSidebarOpen = true">
          <!-- 메뉴 아이콘 -->
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="font-bold text-lg">UI COMPONENTS</span>
      </header>

      <main class="flex-1 p-4 md:p-8 overflow-y-auto">
        <RouterView />
      </main>
      
    </div>
  </div>
</template>