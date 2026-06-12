<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import Container from '@/components/ui/Container.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import Section from '@/components/ui/Section.vue';
import StickyFooter from '@/components/ui/StickyFooter.vue';
</script>

<template>
  <!-- <AppLayout>
    <template #header>
      <AppHeader title="Header" />
    </template>

    <Container>
      <h1>여기가 진짜 본문 내용입니다.</h1>
      <p>Container가 양옆 여백을 예쁘게 잡아줍니다.</p>
    </Container>

    <Container as="section" class="py-8">
      <h1>여기가 진짜 본문 내용입니다.</h1>
      <p>Container가 양옆 여백을 예쁘게 잡아줍니다.</p>
    </Container>

    <template #footer>
      <AppFooter />
    </template>
  </AppLayout> -->

  <!-- 일반 페이지 -->
  <AppLayout>
    <template #header>
      <AppHeader title="페이지 타이틀" show-back-button @back="router.back()" />
    </template>

    <Container>
      <PageHeader title="섹션 타이틀" description="부제목 텍스트" />

      <Section>
      <!-- 컨텐츠 -->
      </Section>

      <Section divider>
      <!-- 구분선 있는 섹션 -->
      </Section>
    </Container>

    <StickyFooter>
      <button class="w-full ...">확인</button>
    </StickyFooter>

    <template #footer>
      <AppFooter />
    </template>
  </AppLayout>

  <!-- 결과 페이지 (세로 중앙 정렬) -->
  <!-- <AppLayout>
    <Container :padded="false" centered>
      <div class="flex flex-col items-center gap-4 text-center">
        <i>✅</i>
        <h2>완료되었습니다</h2>
        <p>처리 결과를 확인해주세요.</p>
      </div>
    </Container>

    <StickyFooter>
      <button class="w-full ...">확인</button>
    </StickyFooter>
  </AppLayout> -->
</template>
