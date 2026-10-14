<script setup lang="ts">
import { Checkbox, Container, Divider, Flex, Section, Typo } from '@ui/vue';
import { ref } from 'vue';

// pub data
interface CheckboxItem {
  label: string;
  value: string;
  disabled?: boolean;
}
const checkboxData: CheckboxItem[] = [
  { label: 'Checkbox1', value: 'checkbox1' },
  { label: 'Checkbox2', value: 'checkbox2' },
  { label: 'Checkbox3', value: 'checkbox3', disabled: true },
  { label: 'Checkbox4', value: 'checkbox4', disabled: true },
];
const checkboxSelect = ref<string[]>(['checkbox2', 'checkbox4']);


// basic
const basicChk = ref<string[]>(['basic1', 'basic2']);

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
const selectedAccount = ref<string[]>(['account1', 'account2']);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Checkbox</Typo>

      <!-- checkbox data -->
      <Flex wrap gap="6" role="group" aria-label="체크박스 예시">
        <Checkbox
          v-for="item in checkboxData"
          :key="item.value"
          v-model="checkboxSelect"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- basic -->
      <Flex direction="col" gap="6">
        <Checkbox v-model="basicChk" value="basic1" aria-label="CheckboxBasic 라벨 없음" />
        <Checkbox v-model="basicChk" value="basic2">CheckboxBasic1</Checkbox>
        <Checkbox checked>CheckboxBasic2</Checkbox>
        <Checkbox disabled>CheckboxBasic3</Checkbox>
        <Checkbox disabled checked>CheckboxBasic4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- single -->
      <Flex direction="col" gap="6">
        <Checkbox variant="single" aria-label="CheckboxSingle 라벨 없음" />
        <Checkbox variant="single">CheckboxSingle1</Checkbox>
        <Checkbox variant="single" checked>CheckboxSingle2</Checkbox>
        <Checkbox variant="single" disabled>CheckboxSingle3</Checkbox>
        <Checkbox variant="single" disabled checked>CheckboxSingle4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- box -->
      <Flex direction="col" gap="3">
        <Checkbox variant="box">CheckboxBox1</Checkbox>
        <Checkbox variant="box" checked>CheckboxBox2</Checkbox>
        <Checkbox variant="box" disabled>CheckboxBox3</Checkbox>
        <Checkbox variant="box" disabled checked>CheckboxBox4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- 확장형 (카드) -->
      <Flex wrap gap="4" role="group" aria-label="계좌 선택">
        <Checkbox
          v-for="chk in accountData"
          :key="chk.value"
          v-model="selectedAccount"
          :value="chk.value"
          :disabled="chk.disabled"
          class="flex-1 min-w-[240px] py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500"
        >
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">{{ chk.name }}</Typo>
            <Typo color="tertiary">{{ chk.number }}</Typo>
            <Typo color="tertiary">출금가능금액 <strong>{{ chk.amount }}</strong></Typo>
          </Flex>
        </Checkbox>
      </Flex>
    </Section>
  </Container>
</template>