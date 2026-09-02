<script setup lang="ts">
import { Button, Container, Divider, Flex, FormGroup, FormLabel, ISearch, Section, TextButton, TextInput, Typo } from '@ui/vue';
import { ref, useId } from 'vue';


// Button click
const emit = defineEmits(['search', 'resend']);
const handleSearch = () => {
  emit('search')
  console.log('search click!');
}
const requestResend = () => {
  emit('resend');
  console.log('resend click!');
}

// formData
const formData = ref({
  labelText: '입력데이터',
  labelSearch: '',
  labelCertNum: '',
  labelNum: '',
  labelTextPassword: '',
  labelRequired: '필수입력데이터 required',
  labelError: '입력데이터 error',
  labelReadonly: '입력데이터 readonly',
  labelDisabled: '입력데이터 disabled',
  cardNum: ['1234', '5678', '9012', '3456'],
  cardCvc: '',
  expiryMonth: '',
  expiryYear: '',
  bizNum1: '123',
  bizNum2: '45',
  bizNum3: '67890',
  amount: '',
})

// label for input id 매칭
const nameId = useId()
const searchId = useId()
const amountId = useId()
const certId = useId()
const telId = useId()
const idNum = useId()
const addressId = useId()
const cardNum1Id = useId();
const cvc = 'card-cvc'
const expiryMonthId = useId()
const bizNum1Id = useId()
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">Text Input</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          label="레이블"
          info-msg="정보 메시지"
          :input-id="nameId"
        >
          <TextInput
            :id="nameId"
            v-model="formData.labelText"
            placeholder="placeholder"
          />
        </FormGroup>
        <FormGroup label="레이블">
          <TextInput
            v-model="formData.labelTextPassword"
            type="password"
            :max-length="15"
            placeholder="password"
          />
        </FormGroup>
        <FormGroup
          label="레이블"
          required
        >
          <TextInput
            v-model="formData.labelRequired"
            placeholder="required"
          />
        </FormGroup>
        <FormGroup
          label="레이블"
          required
          error
          error-msg="에러 메시지"
        >
          <TextInput
            v-model="formData.labelError"
            placeholder="error"
          />
        </FormGroup>
        <FormGroup
          label="레이블"
        >
          <TextInput
            v-model="formData.labelReadonly"
            readonly
            placeholder="readonly"
          />
        </FormGroup>
        <FormGroup
          label="레이블"
          disabled
        >
          <TextInput
            v-model="formData.labelDisabled"
            disabled
            placeholder="disabled"
          />
        </FormGroup>
      </Flex>

      <Divider type="thin" my="10" />

      <Typo variant="heading-s" class="pb-5">폼 조합</Typo>

      <Flex direction="col" gap="6">
        <FormGroup
          label="검색"
          :input-id="searchId"
        >
          <TextInput
            :id="searchId"
            v-model="formData.labelSearch"
            placeholder="검색어 입력"
          >
            <template #suffix>
              <Button
                variant="icon"
                class="p-2 mr-2"
                @click="handleSearch"
              >
                <ISearch class="size-[24px]" />
              </Button>
            </template>
          </TextInput>
        </FormGroup>

        <FormGroup label="인증번호" :input-id="certId">
          <TextInput
            :id="certId"
            v-model="formData.labelCertNum"
            placeholder="인증번호 입력"
          >
            <template #suffix>
              <div class="flex items-center gap-2 mr-3">
                <!-- 타이머 -->
                <span class="text-destructive text-sm font-medium">02:59</span>
                <Divider direction="vertical" />
                <TextButton 
                  size="sm" 
                  color="success"
                  @click="requestResend"
                >
                  재발송
                </TextButton>
              </div>
            </template>
          </TextInput>
        </FormGroup>

        <FormGroup label="휴대폰번호" :input-id="telId">
          <TextInput
            :id="telId"
            v-model="formData.labelNum"
            type="tel"
            :max-length="11"
            placeholder="-없이 숫자만"
          />
        </FormGroup>

        <FormGroup label="금액" :input-id="amountId">
          <TextInput
            :id="amountId"
            v-model="formData.amount"
            type="numeric"
            placeholder="금액 입력"
          >
            <template #suffix>
              <span class="text-md text-gray-900 mr-3">원</span>
            </template>
          </TextInput>
        </FormGroup>
      </Flex>

      <Divider type="thin" my="10" />

      <!-- 입력폼 조합 -->
      <Flex direction="col" gap="6">
        <FormGroup
          label="레이블"
          required
          info-msg="정보 메시지"
        >
          <Flex align="center" gap="3">
            <TextInput class="flex-1" placeholder="placeholder" />
            <span class="text-gray-500">-</span>
            <TextInput class="flex-1" placeholder="placeholder" />
          </Flex>
        </FormGroup>

        <FormGroup
          label="주민등록번호"
          required
          error
          error-msg="에러 메시지"
          :input-id="idNum"
        >
          <Flex align="center" gap="3">
            <TextInput :id="idNum" class="flex-1" :max-length="6" placeholder="앞 6자리" aria-label="주민등록번호 앞 6자리" />
            <span class="text-gray-500">-</span>
            <TextInput type="password" class="flex-1" :max-length="7" placeholder="뒤 7자리" aria-label="주민등록번호 뒤 7자리" />
          </Flex>
        </FormGroup>
        
        <FormGroup
          label="주소"
          required
          :input-id="addressId"
        >
          <Flex direction="col" gap="3">
            <TextInput
              :id="addressId"
              v-model="formData.labelSearch"
              placeholder="검색어 입력"
              aria-label="주소 검색"
            >
              <template #suffix>
                <Button
                  variant="icon"
                  class="p-2 mr-2"
                  @click="handleSearch"
                >
                  <ISearch class="size-[24px]" />
                </Button>
              </template>
            </TextInput>
            <TextInput
              disabled
              placeholder="상세주소"
              aria-label="상세주소"
            />
          </Flex>
        </FormGroup>

        <FormGroup label="카드번호" :input-id="cardNum1Id">
          <Flex align="center" gap="2">
            <TextInput :id="cardNum1Id" v-model="formData.cardNum[0]" type="numeric" class="flex-1" align="center" :max-length="4" :clearable="false" aria-label="카드번호 첫번째 4자리" />
            <span>-</span>
            <TextInput v-model="formData.cardNum[1]" type="password" inputmode="numeric" class="flex-1" align="center" :max-length="4" :clearable="false" aria-label="카드번호 두번째 4자리" />
            <span>-</span>
            <TextInput v-model="formData.cardNum[2]" type="password" inputmode="numeric" class="flex-1" align="center" :max-length="4" :clearable="false" aria-label="카드번호 세번째 4자리" />
            <span>-</span>
            <TextInput v-model="formData.cardNum[3]" type="numeric" class="flex-1" align="center" :max-length="4" :clearable="false" aria-label="카드번호 네번째 4자리" />
          </Flex>
        </FormGroup>

        <!-- <FormGroup label="카드번호" :input-id="cardNum1Id">
          <Flex align="center" gap="2">
            <template v-for="i in 4" :key="i">
              <TextInput
                :id="i === 1 ? cardNum1Id : undefined"
                v-model="formData.cardNum[i - 1]"
                :type="i === 2 || i === 3 ? 'password' : 'text'"
                class="flex-1"
                align="center"
                :max-length="4"
                :clearable="false"
                :aria-label="`카드번호 ${i}번째 4자리`"
              />
              <span v-if="i < 4" class="text-gray-400">-</span>
            </template>
          </Flex>
        </FormGroup> -->

        <FormGroup label="CVC" :input-id="cvc">
          <TextInput
            :id="cvc"
            v-model="formData.cardCvc"
            type="password"
            inputmode="numeric"
            placeholder="CVC 3자리"
            :max-length="3"
            :clearable="false"
            aria-label="카드 CVC"
          />
        </FormGroup>

        <FormGroup label="유효기간" class="flex-1" :input-id="expiryMonthId">
          <Flex align="center" gap="2">
            <TextInput
              :id="expiryMonthId"
              v-model="formData.expiryMonth"
              type="numeric"
              placeholder="MM"
              align="center"
              :max-length="2"
              :clearable="false"
              aria-label="유효기간 월"
            />
            <span>/</span>
            <TextInput
              v-model="formData.expiryYear"
              type="numeric"
              placeholder="YY"
              align="center"
              :max-length="2"
              :clearable="false"
              aria-label="유효기간 년"
            />
          </Flex>
        </FormGroup>

        <FormGroup label="사업자등록번호" :input-id="bizNum1Id">
          <Flex align="center" gap="3">
            <TextInput :id="bizNum1Id" v-model="formData.bizNum1" class="w-[80px]" align="center" :max-length="3" :clearable="false" aria-label="사업자등록번호 첫번째" />
            <span>-</span>
            <TextInput v-model="formData.bizNum2" class="w-[70px]" align="center" :max-length="2" :clearable="false" aria-label="사업자등록번호 두번째" />
            <span>-</span>
            <TextInput v-model="formData.bizNum3" class="flex-1" :max-length="5" :clearable="false" aria-label="사업자등록번호 세번째" />
          </Flex>
        </FormGroup>

        <!-- label 오른쪽 필요 시 (예외케이스) -->
        <FormGroup>
          <template #label="{ forId }">
            <Flex align="center" justify="between">
              <FormLabel :for-id="forId">레이블</FormLabel>
              <!-- <TextButton size="sm" color="black" icon-align="right">
                <template #icon>
                  <IArrowRightS class="size-4 text-black" />
                </template>
                버튼
              </TextButton> -->
              <Typo variant="body-s" color="tertiary">오른쪽 문구 및 버튼 필요시</Typo>
            </Flex>
          </template>

          <TextInput placeholder="placeholder" />
        </FormGroup>
      </Flex>
    </Section>
  </Container>
</template>