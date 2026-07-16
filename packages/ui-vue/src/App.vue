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
        title="본문페이지 <span class='text-mint-500'>타이틀</span> 텍스트"
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
        <Typo text="lg" weight="medium" ellipsis>
          말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다.
        </Typo>
      </Section>

      <Section>
        <Typo :multi-ellipsis="2">
          말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다.
        </Typo>
      </Section>

      <Section>
        <Flex wrap align="center" justify="start" gap="3" mb="5" p="4" rounded="md" class="bg-gray-100">
          <Typo variant="body-l">variant body-l</Typo>
          <Divider direction="vertical" />
          <Typo variant="body-m">variant body-m</Typo>
          <Divider direction="vertical" />
          <Typo variant="body-s">variant body-s</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-l">variant label-l</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-m">variant label-m</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-s">variant label-s</Typo>
          <Divider direction="vertical" />
          <Typo variant="caption-1">variant caption-1</Typo>
        </Flex>
      </Section>

      <Divider type="thin" />
      
      <Section as="article">
        <Typo variant="body-l" color="display" class="pb-6">Button</Typo>
        <Flex gap="6">
          <Button variant="fill" size="sm">버튼 fill</Button>
          <Button variant="outline" size="md" color="secondary">버튼 outline</Button>
          <Button variant="fill" size="md" disabled>버튼 disabled</Button>

          <Button variant="fill" size="lg" icon-align="left">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼L
          </Button>
          <Button variant="outline" size="lg" color="tertiary" icon-align="right">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼R
          </Button>
          <Button variant="outline" size="lg" icon-align="top" class="h-auto p-3">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼T
          </Button>
          
          <Button variant="icon" class="size-[32px] p-2">
            <IMy class="size-[24px]" />
          </Button>

          <Button variant="fill" size="lg" full>버튼 full</Button>
        </Flex>
        <Flex align="center" justify="between" gap="4" mt="5">
          <Button color="secondary" size="lg" class="flex-1">버튼 lg</Button>
          <Button color="tertiary" size="lg" class="flex-1">버튼 lg</Button>
        </Flex>
      </Section>

      <Divider full />

      <Section>
        <Typo class="pb-6">TextButton</Typo>
        <Flex gap="5">
          <TextButton size="sm">텍스트 버튼</TextButton>
          <TextButton size="md" disabled>텍스트 버튼</TextButton>
          <TextButton size="md" color="secondary">텍스트 버튼</TextButton>
          <TextButton size="lg" color="tertiary">텍스트 버튼</TextButton>
          <TextButton size="lg" icon-align="right">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼
          </TextButton>
        </Flex>
      </Section>

      <Section>
        <Typo>내용4</Typo>
      </Section>

      <Divider class="my-[33px] bg-red-500" />

      <Section py="2" px="5">
        <Typo>내용5</Typo>
      </Section>

      <OutsetBox mt="6">
        <Section class="bg-gray-100">
          <Box as="article" p="5">음수마진박스</Box>
        </Section>
      </OutsetBox>

    </Container>

    <BottomSticky>
      <Button size="cta" color="tertiary">취소</Button>
      <Button size="cta">확인</Button>
    </BottomSticky>

    <!-- <template #footer>
      <AppFooter />
    </template> -->


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
