<script setup lang="ts">
import { Container, Divider, List, ListItem, ListItemLink, Section, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">List</Typo>

      <List>
        <ListItem>divide 없는 기본형 목록 내용1</ListItem>
        <ListItem>divide 없는 기본형 목록 내용2</ListItem>
      </List>
      
      <Divider type="thin" my="10" />

      <Typo variant="body-l" pb="4">좌우 정렬형</Typo>
      <!-- 좌우 정렬형 -->
      <List divide>
        <ListItem>
          <Typo>주문번호</Typo>
          <Typo color="caption">20240101-001</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
      </List>

      <p class="my-10" />

      <List divide="top">
        <ListItem>
          <Typo>주문번호</Typo>
          <Typo color="caption">20240101-001</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
      </List>
      
      <p class="my-10" />

      <List divide="bottom">
        <ListItem>
          <Typo>주문번호</Typo>
          <Typo color="caption">20240101-001</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
        <ListItem>
          <Typo>결제일시</Typo>
          <Typo color="caption">2024.01.01 14:30</Typo>
        </ListItem>
      </List>

      <Divider type="thin" my="10" />

      <Typo variant="body-l" pb="4">링크형</Typo>
      <!-- 링크형 -->
      <List>
        <ListItemLink to="/settings/profile">
          <Typo>프로필 수정</Typo>
        </ListItemLink>
        <ListItemLink>
          <Typo>비밀번호 변경</Typo>
        </ListItemLink>
        <ListItemLink :show-arrow="false">
          <Typo color="error">로그아웃</Typo>
        </ListItemLink>
      </List>
    </Section>
  </Container>
</template>