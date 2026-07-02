<script setup lang="ts">
import { IConfirmCheck, ILeftArrow, IMenu, IMy } from '#components';
import AppLayout from '@/components/layout/AppLayout.vue';
import BottomSticky from '@/components/ui/BottomSticky.vue';
import { setHeader } from '@/composables/useHeaderState';

// const emit = defineEmits(['click', 'update']);
const handleBannerClick = () => {
  // emit('click');
  console.log('click');
}

// header 
// (heder 미노출 : isVisible: false | heder 타이틀 왼쪽 정렬 : align: 'left' | header bg 불투명 : transparent: true)
setHeader({
  isVisible: false,
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
  <!-- <AppLayout>
    <Container>
      <PageHeader
        title="섹션 타이틀"
        sub-description="부제목 텍스트" 
        bottom-spacing="none"
      />
      <Divider full type="bold" />

      <Section class="pb-6">
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

      <OutsetBox class="mt-6">
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
  </AppLayout> -->

  <!-- <AppLayout>
    <!-- 목록 페이지 안 
    <Container>
      <PageHeader title="주문 내역" />
      <EmptyState
        v-if="orders.length === 0"
        :icon="ISearch"
        title="주문 내역이 없습니다"
        description="아직 주문하신 상품이 없어요"
      >
        <template #action>
          <button class="px-4 py-2 bg-primary text-white rounded-lg">쇼핑하러 가기</button>
        </template>
      </EmptyState>
      <OrderList v-else :items="orders" />
    </Container>

    <!-- 작은 카드 안 
    <Card>
      <EmptyState size="sm" title="댓글이 없습니다" />
    </Card>
  </AppLayout> -->

  <!-- 결과 페이지 (세로 중앙 정렬) -->
  <AppLayout>
    <ResultView
      :icon="IConfirmCheck"
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
        <div class="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
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
    </BottomSticky>
  </AppLayout>
  <!-- //결과 페이지 (세로 중앙 정렬) -->
</template>
