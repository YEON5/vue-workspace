<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue';
import AppHeader from './components/layout/AppHeader.vue';
import AppLayout from './components/layout/AppLayout.vue';
import Container from './components/ui/Container.vue';

</script>

<template>
  <AppLayout>
    <template #header>
      <AppHeader title="메인 페이지" />
    </template>

    <Container as="section" class="py-8">
      <h1>여기가 진짜 본문 내용입니다.</h1>
      <p>Container가 양옆 여백을 예쁘게 잡아줍니다.</p>
    </Container>

    <template #footer>
      <AppFooter />
    </template>
  </AppLayout>
</template>
