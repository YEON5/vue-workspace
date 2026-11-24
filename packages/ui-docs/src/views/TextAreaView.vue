<script setup lang="ts">
import { Container, Divider, Flex, FormGroup, FormLabel, Section, Select, TextArea, Typo } from '@ui/vue';
import { ref, useId } from 'vue';

// select Data
const selectValue = ref('1');
const selectOptions = [
  {label: '옵션1', value: '1'},
  {label: '옵션2', value: '2'},
  {label: '옵션3', value: '3'}
]
// formData
const formData = ref({
  labelTextarea: '',
  labelTextarea2: '',
})

const selectId = useId()
const formSelect = 'formSelect'
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-lg" pb="15">Select</Typo>

      <Flex direction="col" gap="10">
        <FormGroup label="레이블" pb="9" :input-id="formSelect">
          <Select
            :id="formSelect"
            v-model="selectValue"
            :options="selectOptions"
            placeholder="선택하세요" />
        </FormGroup>
      </Flex>

      <Divider type="thin" my="17" />

      <Typo variant="heading-lg" pb="15">TextArea</Typo>

      <Flex direction="col" gap="10">
        <FormGroup
          label="레이블"
          info-msg="300자 이내로 입력해주세요"
        >
          <TextArea
            v-model="formData.labelTextarea2"
            placeholder="Textarea placeholder"
          />
        </FormGroup>

        <FormGroup
          label="레이블"
        >
          <TextArea
            v-model="formData.labelTextarea2"
            placeholder="Textarea placeholder"
            show-count
            :max-length="100"
          />
        </FormGroup>

        <!-- info msg / count 나란히 배치 (예외케이스) -->
        <Flex direction="col" gap="5">
          <FormLabel>레이블</FormLabel>
          <TextArea 
            v-model="formData.labelTextarea"
            placeholder="Textarea placeholder"
            :max-length="100" 
          />
          <Flex align="center" justify="between">
            <Typo variant="body-sm" color="caption">100자 이내로 입력해주세요</Typo>
            <Typo as="span" variant="body-sm" color="caption">{{ formData.labelTextarea.length }}/100</Typo>
          </Flex>
        </Flex>
        
      </Flex>
    </Section>
  </Container>
</template>