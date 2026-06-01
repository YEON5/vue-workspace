src/
├── components/
│   ├── layout/            # 레이아웃 구성 요소 (향후 Nuxt에서 수입해 조립할 녀석들)
│   │   ├── AppLayout.vue  # 최상위 래퍼 (기존 Root/PageContainer 병합)
│   │   ├── AppHeader.vue  
│   │   └── AppFooter.vue  
│   │
│   └── ui/                # 디자인 토큰이 적용된 순수 UI 컴포넌트
│       ├── Container.vue  # 본문 패딩, 정렬을 담당하는 만능 박스
