<script setup lang="ts">
import { Container, Divider, Flex, Radio, Section, Typo } from '@ui/vue';
import { ref } from 'vue';


interface RadioItem {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
}
const radioData = ref<RadioItem[]>([
  { label: 'Radio1', value: 'radio1', name: 'radioGroup1' },
  { label: 'Radio2', value: 'radio2', name: 'radioGroup1' },
  { label: 'Radio3', value: 'radio3', name: 'radioGroup1', disabled: true },
  { label: 'Radio4', value: 'radio4', name: 'radioGroup1', disabled: true },
]);
const radioSelect = ref<string>('radio4');


// // checked props 대신 v-model + value 사용
const selectedOption = ref<string>('option3');
const selectedAccount = ref<string>('account2');
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Radio</Typo>

      <!--  radio data -->
      <Flex gap="6">
        <Radio
          v-for="(item, index) in radioData"
          :key="index"
          v-model="radioSelect"
          :name="item.name"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </Radio>
      </Flex>

      <Divider type="thin" my="10" />
      
      <!-- basic type -->
      <Flex direction="col" gap="3">
        <Radio name="basicGroup" />
        <Radio name="basicGroup">Radio1</Radio>
        <Radio name="basicGroup">Radio2</Radio>
        <Radio name="basicGroup" disabled>Radio3</Radio>
        <Radio name="basicGroup" checked disabled>Radio4</Radio>
      </Flex>

      <Divider type="thin" my="10" />

      <Flex direction="col" gap="3">
        <Radio v-model="selectedOption" value="option1" name="optionGroup" />
        <Radio v-model="selectedOption" value="option2" name="optionGroup">Radio1</Radio>
        <Radio v-model="selectedOption" value="option3" name="optionGroup">Radio2</Radio>
        <Radio v-model="selectedOption" value="option4" name="optionGroup" disabled>Radio3</Radio>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- box type -->
      <Flex direction="col" gap="3">
        <Radio variant="box" name="boxGroup">Radio1</Radio>
        <Radio variant="box" name="boxGroup">Radio2</Radio>
        <Radio variant="box" name="boxGroup" disabled>Radio3</Radio>
        <Radio variant="box" name="boxGroup" disabled checked>Radio4</Radio>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- 체크박스 확장형 -->
      <Flex wrap gap="4">
        <Radio v-model="selectedAccount" value="account1" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500">
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Radio>
       
        <Radio v-model="selectedAccount" value="account2" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500" disabled>
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Radio>
        
        <Radio v-model="selectedAccount" value="account3" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500" disabled>
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Radio>
      </Flex>
    </Section>
  </Container>
</template>