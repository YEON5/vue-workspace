<script setup lang="ts">
import { ILeftArrow, IMenu, IMy } from '#components';
import AppFooter from '@/components/layout/AppFooter.vue';
import AppLayout from '@/components/layout/AppLayout.vue';
import Container from '@/components/ui/Container.vue';
import Divider from '@/components/ui/Divider.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import Section from '@/components/ui/Section.vue';
import StickyFooter from '@/components/ui/StickyFooter.vue';
import { useHeaderState } from '@/composables/useHeaderState';


// header 
const { setHeader } = useHeaderState();
setHeader({
  // isVisible: false, // heder 미노출
  title: "페이지 타이틀",
  leftBtn: { icon: ILeftArrow, label: '뒤로가기', action: () => alert('뒤로가기 클릭') },
  rightBtn: [
    { icon: IMy, label: '마이페이지', action: () => console.log('마이 클릭') },
    { icon: IMenu, label: '정보 보기', action: () => console.log('정보 클릭') }
  ]
});
</script>

<template>
  <!-- 일반 페이지 -->
  <AppLayout>

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
