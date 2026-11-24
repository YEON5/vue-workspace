<script setup lang="ts">
import { useColorMode } from '#/composables/useColorMode';
import { align, isVisible, leftBtn, rightBtn, title, transparent } from '#/composables/useHeaderState'; // header props
import AppHeader from './AppHeader.vue';

// 색상 모드(라이트/다크) 초기화
// - 저장된 모드(localStorage) 또는 OS 설정에 맞춰 <html>에 'dark' 클래스를 붙입니다.
// - 앱 전체를 감싸는 레이아웃에서 한 번 호출하면 모든 화면에 적용됩니다.
// - 모드 변경은 어느 컴포넌트에서든 useColorMode()의 toggle() / setMode()로 합니다.
// const { setMode } = useColorMode();
// setMode('system');    // OS 설정 system | 라이트 light | 다크 dark

// [토글 버튼을 둘 경우] 위 두 줄(setMode 고정)을 지우고 아래 주석을 해제하세요.
// - setMode()로 고정하지 않아야 사용자가 고른 모드(localStorage)가 새로고침 후에도 유지됩니다.
// - isDark: 현재 다크 여부(버튼 문구/아이콘 표시용), toggle(): 라이트 <-> 다크 전환
const { isDark, toggle } = useColorMode();
</script>

<template>
  <div class="flex flex-col min-h-dvh background-default text-basic">
    <AppHeader 
      v-if="isVisible"
      :align="align"
      :transparent="transparent"
      :title="title"
      :left-btn="leftBtn"
      :right-btn="rightBtn" 
    />
    <!-- [토글 버튼을 둘 경우] 주석 해제 (script의 isDark, toggle 주석도 함께 해제) -->
    <button type="button" @click="toggle">{{ isDark ? '라이트 모드' : '다크 모드' }}</button>
    <!-- main -->
    <main class="flex flex-col flex-1">
      <slot />
    </main>
    <!-- //main -->

    <slot name="footer" />
  </div>
</template>