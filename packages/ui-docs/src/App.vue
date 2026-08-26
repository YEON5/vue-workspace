<script setup lang="ts">
import { computed, ref } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';

const router = useRouter();
const rawRoutes = router.getRoutes();

// 정렬 로직
const navItems = computed(() => {
  const validRoutes = rawRoutes.filter(route => route.name);

  return validRoutes.sort((a, b) => {
    // GuideView를 최상단으로 올리기
    if (a.name === 'Guide' || a.name === 'GuideView') return -1;
    if (b.name === 'Guide' || b.name === 'GuideView') return 1;

    // 알파벳 순서대로 정렬
    const nameA = String(a.name || '');
    const nameB = String(b.name || '');
    return nameA.localeCompare(nameB);
  });
});

// 모바일 사이드바 열림/닫힘 상태
const isSidebarOpen = ref(false);
</script>

<template>
  <div class="app-layout">
    
    <!-- 모바일용 배경 오버레이 -->
    <div 
      v-if="isSidebarOpen" 
      class="sidebar-overlay"
      @click="isSidebarOpen = false"
    />

    <!-- 사이드바 -->
    <aside 
      class="sidebar"
      :class="{ 'is-open': isSidebarOpen }"
    >
      <div class="sidebar-header">
        <h1>UI COMPONENTS</h1>
        <button class="close-btn" @click="isSidebarOpen = false">&times;</button>
      </div>
      
      <nav class="sidebar-nav">
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
    <div class="main-wrapper">
      
      <!-- 모바일용 상단 헤더 -->
      <header class="mobile-header">
        <button class="menu-btn" @click="isSidebarOpen = true">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span class="header-title">UI COMPONENTS</span>
      </header>

      <!-- 콘텐츠 영역 -->
      <main class="main-content">
        <RouterView />
      </main>
      
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  height: 100dvh;
  background-color: #f9fafb;
  overflow: hidden;

  /* 모바일 오버레이 */
  .sidebar-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    background-color: rgba(0, 0, 0, 0.4);

    @media (min-width: 768px) {
      display: none;
    }
  }

  /* 사이드바 */
  .sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    width: 256px;
    padding: 28px 20px;
    border-right: 1px solid #e5e7eb;
    background-color: #ffffff;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%); /* 모바일 기본: 숨김 */

    &.is-open {
      transform: translateX(0); /* 모바일: 열림 */
    }

    @media (min-width: 768px) {
      position: relative;
      transform: translateX(0); /* PC 기본: 항상 노출 */
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;

      h1 {
        margin: 0;
        font-size: 20px;
        font-weight: 700;
      }

      .close-btn {
        border: none;
        background: transparent;
        font-size: 24px;
        line-height: 1;
        color: #6b7280;
        cursor: pointer;

        @media (min-width: 768px) {
          display: none;
        }
      }
    }

    .sidebar-nav {
      display: flex;
      flex-direction: column;
      gap: 16px;

      a {
        text-decoration: none;
        color: #374151;
        transition: color 0.2s;

        &:hover,
        &.router-link-active {
          font-weight: 600;
          color: #10b981; /* 활성화 색상 (원하는 색상으로 변경 가능) */
        }
      }
    }
  }

  /* 메인 영역  */
  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;

    .mobile-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #e5e7eb;
      background-color: #ffffff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      z-index: 30;

      @media (min-width: 768px) {
        display: none;
      }

      .menu-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
        padding: 4px;
        border: none;
        background: transparent;
        color: #374151;
        cursor: pointer;

        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }

      .header-title {
        font-weight: 700;
        font-size: 18px;
      }
    }

    .main-content {
      flex: 1;
      padding: 16px;
      overflow-y: auto;

      @media (min-width: 768px) {
        padding: 32px;
      }
    }
  }
}
</style>