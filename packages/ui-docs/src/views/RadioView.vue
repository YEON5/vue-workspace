<script setup lang="ts">
import { Container, Divider, Flex, Radio, RadioGroup, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

// pub data
interface RadioItem {
  label: string;
  value: string;
  disabled?: boolean;
}
const radioData: RadioItem[] = [
  { label: 'Radio1', value: 'radio1' },
  { label: 'Radio2', value: 'radio2' },
  { label: 'Radio3', value: 'radio3', disabled: true },
  { label: 'Radio4', value: 'radio4', disabled: true },
];
const radioSelect = ref('radio4');

// 기본형 (v-model)
const selectedOption = ref('option3');

// 확장형 (카드)
interface AccountItem {
  value: string;
  name: string;
  number: string;
  amount: string;
  disabled?: boolean;
}
const accountData: AccountItem[] = [
  { value: 'account1', name: '직장인우대종합통장', number: '123456-**-***456', amount: '12,000원' },
  { value: 'account2', name: '급여하나통장', number: '234567-**-***567', amount: '350,000원', disabled: true },
  { value: 'account3', name: '자유적금통장', number: '345678-**-***678', amount: '0원', disabled: true },
];
const selectedAccount = ref('account2');
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Radio</Typo>

      <!-- radio data -->
      <RadioGroup v-model="radioSelect" aria-label="라디오 예시" gap="6">
        <Radio
          v-for="item in radioData"
          :key="item.value"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </Radio>
      </RadioGroup>

      <Divider type="thin" my="10" />

      <!-- basic: 상태 확인용 (checked props) -->
      <RadioGroup aria-label="basic 상태 예시" direction="col" gap="3">
        <Radio aria-label="라벨 없음" />
        <Radio>Radio1</Radio>
        <Radio>Radio2</Radio>
        <Radio disabled>Radio3</Radio>
        <Radio checked disabled>Radio4</Radio>
      </RadioGroup>

      <Divider type="thin" my="10" />

      <!-- basic: v-model -->
      <RadioGroup v-model="selectedOption" aria-label="옵션 선택" direction="col" gap="3">
        <Radio value="option1" aria-label="옵션 1" />
        <Radio value="option2">Radio1</Radio>
        <Radio value="option3">Radio2</Radio>
        <Radio value="option4" disabled>Radio3</Radio>
      </RadioGroup>

      <Divider type="thin" my="10" />

      <!-- box: 상태 확인용 (checked props) -->
      <RadioGroup aria-label="box 상태 예시" direction="col" gap="3">
        <Radio variant="box">Radio1</Radio>
        <Radio variant="box">Radio2</Radio>
        <Radio variant="box" disabled>Radio3</Radio>
        <Radio variant="box" disabled checked>Radio4</Radio>
      </RadioGroup>

      <Divider type="thin" my="10" />

      <!-- 확장형 (카드) -->
      <RadioGroup v-model="selectedAccount" aria-label="계좌 선택" wrap gap="4">
        <Radio
          v-for="rdi in accountData"
          :key="rdi.value"
          :value="rdi.value"
          :disabled="rdi.disabled"
          class="flex-1 min-w-[240px] py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500"
        >
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">{{ rdi.name }}</Typo>
            <Typo color="tertiary">{{ rdi.number }}</Typo>
            <Typo color="tertiary">출금가능금액 <strong>{{ rdi.amount }}</strong></Typo>
          </Flex>
        </Radio>
      </RadioGroup>
    </Section>
  </Container>
</template>