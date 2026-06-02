import '@ui/public/fonts.css'; // ui-public 패키지에서 폰트 CSS를 먼저 호출
import '@ui/style/dist/style.css'; // ui-style 패키지에서 빌드된 Tailwind CSS 호출
import { createApp } from 'vue';


import App from './App.vue';

createApp(App).mount('#app')