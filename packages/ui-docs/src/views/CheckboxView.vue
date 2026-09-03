<script setup lang="ts">
import { Checkbox, Container, Divider, Flex, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

// checked props 대신 v-model + value 사용
const basicChk = ref<string[]>(['basic1', 'basic2']);
const selectedAccount = ref<string[]>(['account1' , 'account2']);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Checkbox</Typo>
      
      <!-- basic type -->
      <Flex direction="col" gap="6">
        <Checkbox v-model="basicChk" value="basic1" />
        <Checkbox v-model="basicChk" value="basic2">Checkbox1</Checkbox>
        <Checkbox checked>Checkbox2</Checkbox>
        <Checkbox disabled>Checkbox3</Checkbox>
        <Checkbox disabled checked>Checkbox4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- single type -->
      <Flex direction="col" gap="6">
        <Checkbox variant="single" />
        <Checkbox variant="single">Checkbox1</Checkbox>
        <Checkbox variant="single" checked>Checkbox2</Checkbox>
        <Checkbox variant="single" disabled>Checkbox3</Checkbox>
        <Checkbox variant="single" disabled checked>Checkbox4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- box type -->
      <Flex direction="col" gap="3">
        <Checkbox variant="box">Checkbox1</Checkbox>
        <Checkbox variant="box" checked>Checkbox2</Checkbox>
        <Checkbox variant="box" disabled>Checkbox3</Checkbox>
        <Checkbox variant="box" disabled checked>Checkbox4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- 체크박스 확장형 -->
      <Flex wrap gap="4">
        <Checkbox v-model="selectedAccount" value="account1" class="py-7 pl-6 pr-10 border rounded-lg items-start has-[:checked]:border-mint-500">
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Checkbox>
       
        <Checkbox v-model="selectedAccount" value="account2" class="py-7 pl-6 pr-10 border rounded-lg items-start has-[:checked]:border-mint-500" disabled>
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Checkbox>
        
        <Checkbox v-model="selectedAccount" value="account3" class="py-7 pl-6 pr-10 border rounded-lg items-start has-[:checked]:border-mint-500" disabled>
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Checkbox>
      </Flex>
    </Section>
  </Container>
</template>