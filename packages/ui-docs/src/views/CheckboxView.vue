<script setup lang="ts">
import { Checkbox, Container, Divider, Flex, Section, Typo } from '@ui/vue';
import { ref } from 'vue';


interface CheckboxItem {
  label: string;
  name: string;
  value: string;
  disabled?: boolean;
}
const checkboxData = ref<CheckboxItem[]>([
  { label: 'Checkbox1', name: 'checkboxGroup', value: 'checkbox1' },
  { label: 'Checkbox2', name: 'checkboxGroup', value: 'checkbox2' },
  { label: 'Checkbox3', name: 'checkboxGroup', value: 'checkbox3', disabled: true },
  { label: 'Checkbox4', name: 'checkboxGroup', value: 'checkbox4', disabled: true },
]);
const checkboxSelect = ref<string[]>(['checkbox2', 'checkbox4']);


// checked props 대신 v-model + value 사용
const basicChk = ref<string[]>(['basic1', 'basic2']);
const selectedAccount = ref<string[]>(['account1' , 'account2']);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Checkbox</Typo>

      <!-- checkbox data -->
      <Flex gap="6">
        <Checkbox
          v-for="(item, index) in checkboxData"
          :key="index"
          v-model="checkboxSelect"
          :name="item.name"
          :value="item.value"
          :disabled="item.disabled"
        >
          {{ item.label }}
        </Checkbox>
      </Flex>

      <Divider type="thin" my="10" />
      
      <!-- basic type -->
      <Flex direction="col" gap="6">
        <Checkbox v-model="basicChk" name="basicGroup" value="basic1" />
        <Checkbox v-model="basicChk" name="basicGroup" value="basic2">CheckboxBasic1</Checkbox>
        <Checkbox name="basicGroup" checked>CheckboxBasic2</Checkbox>
        <Checkbox name="basicGroup" disabled>CheckboxBasic3</Checkbox>
        <Checkbox name="basicGroup" disabled checked>CheckboxBasic4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- single type -->
      <Flex direction="col" gap="6">
        <Checkbox variant="single" name="singleGroup" />
        <Checkbox variant="single" name="singleGroup">CheckboxSingle1</Checkbox>
        <Checkbox variant="single" name="singleGroup" checked>CheckboxSingle2</Checkbox>
        <Checkbox variant="single" name="singleGroup" disabled>CheckboxSingle3</Checkbox>
        <Checkbox variant="single" name="singleGroup" disabled checked>CheckboxSingle4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- box type -->
      <Flex direction="col" gap="3">
        <Checkbox variant="box" name="boxGroup">CheckboxBox1</Checkbox>
        <Checkbox variant="box" name="boxGroup" checked>CheckboxBox2</Checkbox>
        <Checkbox variant="box" name="boxGroup" disabled>CheckboxBox3</Checkbox>
        <Checkbox variant="box" name="boxGroup" disabled checked>CheckboxBox4</Checkbox>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- 체크박스 확장형 -->
      <Flex wrap gap="4">
        <Checkbox v-model="selectedAccount" value="account1" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500">
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Checkbox>
       
        <Checkbox v-model="selectedAccount" value="account2" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500" disabled>
          <Flex direction="col" gap="3">
            <Typo variant="label-l" class="font-bold">직장인우대종합통장</Typo>
            <Typo color="tertiary">123456-**-***456</Typo>
            <Typo color="tertiary">출금가능금액 <strong>12,000원</strong></Typo>
          </Flex>
        </Checkbox>
        
        <Checkbox v-model="selectedAccount" value="account3" name="accountGroup" class="py-7 pl-6 pr-10 border border-gray-500 rounded-lg items-start has-[:checked]:border-mint-500" disabled>
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