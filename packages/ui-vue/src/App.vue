<script setup lang="ts">
import AppFooter from '@/components/layout/AppFooter.vue';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import Container from '@/components/ui/Container.vue';
import Divider from '@/components/ui/Divider.vue';
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
      <AppHeader title="페이지 타이틀" show-back-btn menu-btn search-btn />
      <!-- <AppHeader title="페이지 타이틀" show-back-button @back="router.back()" /> -->
    </template>

    <Container>
      <PageHeader title="섹션 타이틀" description="부제목 텍스트" />

      <Section>
        <p>내용1</p>
      </Section>

      <Section>
        <p>내용2</p>
      </Section>

      <Section as="div">
        <p>내용 div</p>
      </Section>

      <Divider type="thin" />
      
      <Section as="article">
        <p>내용 article</p>
      </Section>

      <Divider full type="base" />

      <Section>
        <p>내용3</p>
      </Section>

      <Divider full type="bold" />

      <Section>
        <p>내용4</p>
      </Section>

      <Divider class="my-[33px] bg-red-500" />

      <Section>
        <p>내용5</p>
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
