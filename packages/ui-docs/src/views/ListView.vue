<script setup lang="ts">
import { Container, Divider, List, ListItem, ListItemLink, Section, Typo } from '@ui/vue';

// 기본형
const basicList = [
  { id: 1, text: 'divide 없는 기본형 목록 내용1' },
  { id: 2, text: 'divide 없는 기본형 목록 내용2' },
];

// 좌우 정렬형 (divide / top / bottom 공용)
const infoList = [
  { label: '주문번호', value: '20240101-001' },
  { label: '결제일시', value: '2024.01.01 14:30' },
  { label: '결제일시', value: '2024.01.01 14:30' },
];

// 링크형
interface LinkItem {
  label: string;
  to?: string;
  showArrow?: boolean;
  color?: 'error';
}
const linkList: LinkItem[] = [
  { label: '프로필 수정', to: '/settings/profile' },
  { label: '비밀번호 변경' },
  { label: '로그아웃', showArrow: false, color: 'error' },
];
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">List</Typo>

      <!-- 기본형 -->
      <List>
        <ListItem v-for="item in basicList" :key="item.id">
          <Typo>{{ item.text }}</Typo>
        </ListItem>
      </List>

      <Divider type="thin" my="10" />

      <Typo variant="body-l" pb="4">좌우 정렬형</Typo>

      <List divide>
        <ListItem v-for="(info, i) in infoList" :key="i">
          <Typo>{{ info.label }}</Typo>
          <Typo color="caption">{{ info.value }}</Typo>
        </ListItem>
      </List>

      <Divider type="thin" my="10" />

      <List divide="top">
        <ListItem v-for="(info, i) in infoList" :key="i">
          <Typo>{{ info.label }}</Typo>
          <Typo color="caption">{{ info.value }}</Typo>
        </ListItem>
      </List>

      <Divider type="thin" my="10" />

      <List divide="bottom">
        <ListItem v-for="(info, i) in infoList" :key="i">
          <Typo>{{ info.label }}</Typo>
          <Typo color="caption">{{ info.value }}</Typo>
        </ListItem>
      </List>

      <Divider type="thin" my="10" />

      <Typo variant="body-l" pb="4">링크형</Typo>

      <List>
        <ListItemLink
          v-for="link in linkList"
          :key="link.label"
          :to="link.to"
          :show-arrow="link.showArrow"
        >
          <Typo :color="link.color">{{ link.label }}</Typo>
        </ListItemLink>
      </List>
    </Section>
  </Container>
</template>