// main.ts
import '@ui/style/dist/style.css';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';

// views 폴더의 모든 .vue 파일을 자동으로 가져옴
const modules = import.meta.glob('./views/*.vue');

const autoRoutes = Object.entries(modules).map(([path, component]) => {
  const name = path
    .replace('./views/', '')
    .replace('View.vue', '')
    .replace('.vue', '');

  return {
    path: `/${name.toLowerCase().replace(/([a-z])([A-Z])/g, '$1-$2')}`,
    name,
    component,
  };
});

const routes = [
  { path: '/', redirect: '/guide' },
  ...autoRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');