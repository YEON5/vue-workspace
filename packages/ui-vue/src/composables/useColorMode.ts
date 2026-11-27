// composables/useColorMode.ts
// ─────────────────────────────────────────────────────────────
// 색상 모드(라이트 / 다크) 관리
//
// 동작 원리
// - <html>에 'dark' 클래스를 붙이거나 뗍니다.
// - @ui/style의 design-tokens.css에 있는 `.dark { --color-… }`가 색상 변수를 dark 값으로 덮어쓰기 때문에
//   컴포넌트 클래스(text-basic, element-primary, surface-elevated-01 …)는 그대로 두고 색만 바뀝니다.
//
// 모드
// - 'light'  : 항상 라이트
// - 'dark'   : 항상 다크
// - 'system' : OS 설정(prefers-color-scheme)을 따름. OS 설정이 바뀌면 바로 반영 (기본값)
// - 선택한 모드는 localStorage('color-mode')에 저장되어 새로고침 후에도 유지됩니다.
//
// 상태 공유
// - 상태는 이 파일(모듈)에 하나만 있어서, 여러 컴포넌트에서 호출해도 같은 값을 공유합니다.
// - 처음 호출될 때 한 번만 초기화됩니다. AppLayout에서 호출하므로 AppLayout을 쓰는 화면은 자동으로 적용됩니다.
//
// 사용 예
//   const { mode, isDark, setMode, toggle } = useColorMode();
//   toggle();             // 라이트 ↔ 다크 전환
//   setMode('system');    // OS 설정 따르기
//   <Switch :model-value="isDark" @update:model-value="toggle" />
//
// 참고
// - 새로고침 직후 Vue가 뜨기 전 잠깐 라이트 화면이 보이는 것을 막으려면
//   index.html <head>에서 같은 규칙으로 'dark' 클래스를 미리 붙이는 스크립트를 넣습니다.
// - 고대비 모드가 추가되면 ColorMode에 값을 추가하고 같은 방식으로 클래스를 붙이면 됩니다.
// ─────────────────────────────────────────────────────────────
import { computed, readonly, ref } from 'vue';

export type ColorMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'color-mode';
const DARK_CLASS = 'dark'; // design-tokens.css의 다크모드 선택자(.dark)와 같아야 함 (@ui/style tokens-config.js MODES)

const mode = ref<ColorMode>('system');
const systemDark = ref(false);
let initialized = false;

// <html> 클래스에 현재 모드 반영
// - 전환하는 순간에만 페이지 전체 transition을 꺼서, transition이 걸린 요소(예: AppHeader)와
//   나머지 화면이 동시에 바뀌도록 합니다. (hover 등 평소 애니메이션에는 영향 없음)
function apply() {
  const isDark = mode.value === 'dark' || (mode.value === 'system' && systemDark.value);

  const style = document.createElement('style');
  style.textContent = '*,*::before,*::after{transition:none!important}';
  document.head.appendChild(style);

  document.documentElement.classList.toggle(DARK_CLASS, isDark);

  // 강제로 스타일을 계산시켜 transition 없이 새 색이 먼저 적용되게 한 뒤 원복
  void window.getComputedStyle(document.body).opacity; // void: 값을 읽기만 하는 의도된 식 (no-unused-expressions)
  document.head.removeChild(style);
}

// 최초 1회: 저장된 모드 불러오기 + OS 설정 변경 감지
function init() {
  if (initialized) return;
  initialized = true;

  const saved = localStorage.getItem(STORAGE_KEY) as ColorMode | null;
  if (saved === 'light' || saved === 'dark' || saved === 'system') mode.value = saved;

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  systemDark.value = media.matches;
  media.addEventListener('change', e => {
    systemDark.value = e.matches;
    apply();
  });

  apply();
}

export function useColorMode() {
  init();

  // 현재 화면이 다크인지 (system 모드면 OS 설정 기준)
  const isDark = computed(() => mode.value === 'dark' || (mode.value === 'system' && systemDark.value));

  function setMode(next: ColorMode) {
    mode.value = next;
    localStorage.setItem(STORAGE_KEY, next);
    apply();
  }

  // 지금 보이는 모드의 반대로 전환 (system 상태에서 누르면 light/dark 중 하나로 고정됨)
  function toggle() {
    setMode(isDark.value ? 'light' : 'dark');
  }

  return { mode: readonly(mode), isDark, setMode, toggle };
}
