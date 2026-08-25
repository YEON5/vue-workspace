<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router';
const router = useRouter()
const navItems = router.getRoutes()
</script>

<template>
  <div class="flex h-screen bg-gray-50 overflow-hidden">
    <aside class="w-64 bg-white border-r px-5 py-7">
      <h1 class="text-xl font-bold mb-8">UI COMPONENTS</h1>
      <nav class="flex flex-col gap-5">
        <RouterLink v-for="item in navItems" :key="item.path" :to="item.path">
          {{ item.name }}
        </RouterLink>
      </nav>
    </aside>
    <main class="flex-1 p-8 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>