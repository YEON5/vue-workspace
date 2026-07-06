<script setup lang="ts">
import { ILeftArrow, IMenu, IMy } from '#components';
import AppLayout from '@/components/layout/AppLayout.vue';
import BottomSticky from '@/components/ui/BottomSticky.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { setHeader } from '@/composables/useHeaderState';

// ResultView(완료/실패)
// const emit = defineEmits(['click', 'update']);
// const handleBannerClick = () => {
//   // emit('click');
//   console.log('click');
// }

// header 
// (heder 미노출 : isVisible: true/false | heder 타이틀 왼쪽 정렬 : align: 'left' | header bg 불투명 : transparent: true)
setHeader({
  isVisible: true,
  // align: 'left',
  // transparent: true,
  title: "Header 타이틀",
  leftBtn: { icon: ILeftArrow, label: '뒤로가기', action: () => alert('뒤로가기 클릭') },
  rightBtn: [
    { icon: IMy, iconClass: 'text-red-500', label: '마이페이지', action: () => console.log('마이페이지 클릭') },
    { icon: IMenu, label: '전체메뉴 보기', action: () => console.log('전체메뉴 클릭') }
  ]
});
</script>

<template>
  <AppLayout>
    <Container>
      <PageHeader
        title="본문페이지 <span class='text-mint-700'>타이틀</span> 텍스트"
        description="본문페이지 설명 텍스트 입니다.<br>줄바꿈도 가능해요" 
        pb="6"
      />

      <!-- 다국어 또는 admin 등록 시 template으로 -->
      <!-- <PageHeader
      >
        <template #title>
          본문페이지 <span class="text-mint-700">타이틀</span> 텍스트
        </template>
        <template #description>
          본문페이지 설명 텍스트 입니다.<br>
          줄바꿈도 됩니다.
        </template>
      </PageHeader> -->

      <Divider full type="bold" />

      <Section pb="6">
        <p>내용1</p>
      </Section>

      <Section>
        <p>내용2</p>
      </Section>

      <Section>
        <Flex wrap align="center" justify="start" gap="3">
          <p>내용 div1</p>
          <Divider direction="vertical" />
          <p>내용 div2</p>
          <Divider direction="vertical" />
          <p>내용 div3</p>
          <Divider direction="vertical" />
          <p>내용 div4</p>
          <Divider direction="vertical" />
          <p>내용 div5</p>
        </Flex>
      </Section>

      <Divider type="thin" />
      
      <Section as="article">
        <p>내용 article</p>
      </Section>

      <Divider full />

      <Section>
        <p>내용3</p>
      </Section>

      <Section>
        <p>내용4</p>
      </Section>

      <Divider class="my-[33px] bg-red-500" />

      <Section>
        <p>내용5</p>
      </Section>

      <OutsetBox mt="6">
        <Section class="bg-gray-100">
          <div>음수마진박스</div>
        </Section>
      </OutsetBox>

    </Container>

    <BottomSticky>
      <button class="w-full ...">확인</button>
    </BottomSticky>

    <template #footer>
      <AppFooter />
    </template>


    <!-- 결과 페이지 : Container로 감쌀 필요 없음 -->
    <!-- lottie 대신 svg 아이콘으로 들어가는 경우 : :icon="IConfirmCheck" -->
    <!-- <ResultView
      title="완료되었습니다"
      description="처리 결과를 확인해주세요."
    >
      
      <template #action>
        <Flex
          align="center"
          gap="3"
        >
          <button type="button" class="text-primary underline">영수증 보기</button>
          <Divider direction="vertical" />
          <button type="button" class="text-primary underline">영수증 보기</button>
        </Flex>
      </template>

      <template #extra>
        <div class="p-4 bg-muted rounded-lg text-sm text-muted-foreground text-center">
          문의사항은 고객센터로 연락주세요.
        </div>
      </template>
      
      <template #banner>
        <button
          type="button"
          @click="handleBannerClick"
        >
          <img src="/images/temp-banner.webp">
        </button>
      </template>
    </ResultView>

    <BottomSticky>
      <button class="w-full ...">확인</button>
    </BottomSticky> -->
    <!-- //결과 페이지 : Container로 감쌀 필요 없음 -->
  </AppLayout>
</template>
