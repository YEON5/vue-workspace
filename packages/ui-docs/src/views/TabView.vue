<script setup lang="ts">
import { Container, Divider, Section, Tab, TabList, TabPanel, Tabs, Typo } from '@ui/vue';
import { ref } from 'vue';
// import TabPanelContent from './components/TabPanelContent.vue';

const tab1 = ref('TabItem1');
const tab2 = ref('TabItem1');
const tabIntab = ref('TabInTab1');
const subtab = ref('PillTab1');
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Tab</Typo>

      <!-- 기본형 -->
      <Tabs v-model="tab1">
        <TabList scrollable>
          <Tab value="TabItem1">TabItem1</Tab>
          <Tab value="TabItem2">TabItem2</Tab>
          <Tab value="TabItem3">TabItem3</Tab>
          <Tab value="TabItem4">TabItem4</Tab>
          <Tab value="TabItem5" disabled>TabItem5</Tab>
        </TabList>

        <TabPanel value="TabItem1">
          TabPanel1 내용입니다.
          <!-- <TabPanelContent /> -->
        </TabPanel>
        <TabPanel value="TabItem2">TabPanel2 내용입니다.</TabPanel>
        <TabPanel value="TabItem3">TabPanel3 내용입니다.</TabPanel>
        <TabPanel value="TabItem4">TabPanel4 내용입니다.</TabPanel>
        <TabPanel value="TabItem5">TabPanel5 내용입니다.</TabPanel>
      </Tabs>

      <Divider type="thin" my="10" />

      <!-- 애니메이션 언더바 (animated) -->
      <!-- scrollable는 클릭 시 가운데 정렬이 기본값, 왼쪽끝 정렬은 alignAction="left" -->
      <Tabs v-model="tab2">
        <TabList animated scrollable>
          <Tab value="TabItem1">TabItem1</Tab>
          <Tab value="TabItem2">TabItem2</Tab>
          <Tab value="TabItem3">TabItem3</Tab>
          <Tab value="TabItem4">TabItem4</Tab>
          <Tab value="TabItem5">TabItem5</Tab>
          <Tab value="TabItem6">TabItem6</Tab>
        </TabList>

        <TabPanel value="TabItem1">animated TabPanel1 내용입니다.</TabPanel>
        <TabPanel value="TabItem2">animated TabPanel2 내용입니다.</TabPanel>
        <TabPanel value="TabItem3">animated TabPanel3 내용입니다.</TabPanel>
        <TabPanel value="TabItem4">animated TabPanel4 내용입니다.</TabPanel>
        <TabPanel value="TabItem5">animated TabPanel5 내용입니다.</TabPanel>
        <TabPanel value="TabItem6">animated TabPanel6 내용입니다.</TabPanel>
      </Tabs>

      <Divider type="thin" my="10" />

      <!-- tab in tab -->
      <Tabs v-model="tabIntab">
        <TabList>
          <Tab value="TabInTab1">TabInTab1</Tab>
          <Tab value="TabInTab2">TabInTab2</Tab>
          <Tab value="TabInTab3">TabInTab3</Tab>
        </TabList>
        <TabPanel value="TabInTab1">
          <!-- sub tab -->
          <Tabs v-model="subtab">
            <TabList variant="pill">
              <Tab value="PillTab1">SubTab1</Tab>
              <Tab value="PillTab2">SubTab2</Tab>
              <Tab value="PillTab3">SubTab3</Tab>
            </TabList>
            <TabPanel value="PillTab1">SubTab1 내용입니다.</TabPanel>
            <TabPanel value="PillTab2">SubTab2 내용입니다.</TabPanel>
            <TabPanel value="PillTab3">SubTab3 내용입니다.</TabPanel>
          </Tabs>
          <!-- //sub tab -->
        </TabPanel>
        <TabPanel value="TabInTab2">Tab In Tab2 내용입니다.</TabPanel>
        <TabPanel value="TabInTab3">Tab In Tab3 내용입니다.</TabPanel>
      </Tabs>
    </Section>
  </Container>
</template>