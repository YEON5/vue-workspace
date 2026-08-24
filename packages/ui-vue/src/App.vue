<script setup lang="ts">
import { IArrowLeft, IArrowRightS, IMenu, IMy, ISearch, ITime } from '#components';
import AppLayout from '@/components/layout/AppLayout.vue';
import BottomSticky from '@/components/ui/BottomSticky.vue';
import PageHeader from '@/components/ui/PageHeader.vue';
import { setHeader } from '@/composables/useHeaderState';
import { ref, useId } from 'vue';

// ResultView(완료/실패)
// const emit = defineEmits(['click', 'update']);
// const handleBannerClick = () => {
//   // emit('click');
//   console.log('click');
// }

// -------------------------- Header --------------------------
// (heder 미노출 : isVisible: true/false | heder 타이틀 왼쪽 정렬 : align: 'left' | header bg 불투명 : transparent: true)
setHeader({
  isVisible: true,
  // align: 'left',
  // transparent: true,
  title: "Header 타이틀",
  leftBtn: { icon: IArrowLeft, label: '뒤로가기', action: () => alert('뒤로가기 클릭') },
  rightBtn: [
    { icon: IMy, iconClass: 'text-red-500', label: '마이페이지', action: () => console.log('마이페이지 클릭') },
    { icon: IMenu, label: '전체메뉴 보기', action: () => console.log('전체메뉴 클릭') }
  ]
});


// -------------------------- Button click emit --------------------------
const emit = defineEmits(['search', 'resend']);
const handleSearch = () => {
  emit('search')
  console.log('search click!');
}
const requestResend = () => {
  emit('resend');
  console.log('resend click!');
}


// -------------------------- Form --------------------------
// formData (text input, textarea)
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
  labelTextarea: '',
  labelTextarea2: '',
  cardNum: ['1234', '5678', '9012', '3456'],
  bizNum1: '123',
  bizNum2: '45',
  bizNum3: '67890',
  amount: '',
})

// select Data
const selectValue = ref('1');
const selectOptions = [
  {label: '옵션1', value: '1'},
  {label: '옵션2', value: '2'},
  {label: '옵션3', value: '3'}
]
// label for input id 매칭
const nameId = useId()
const searchId = useId()
const amountId = useId()
const floatingId = useId()
</script>

<template>
  <AppLayout>
    <Container>
      <PageHeader
        title="본문페이지 <span class='text-mint-500'>타이틀</span> 텍스트"
        description="본문페이지 설명 텍스트 입니다.<br>줄바꿈도 가능해요" 
        pb="6"
      />

      <!-- 다국어 또는 admin 등록 시 template으로 -->
      <!-- <PageHeader
      >
        <template #title>
          본문페이지 <span class="text-mint-700">타이틀</span> 텍스트
        </template>
        <template #description>
          본문페이지 설명 텍스트 입니다.<br>
          줄바꿈도 됩니다.
        </template>
      </PageHeader> -->

      <Divider full type="bold" />

      <Section pb="6">
        <Typo text="lg" weight="medium" ellipsis>
          말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다. 말줄임 1줄 내용입니다.
        </Typo>
      </Section>

      <Divider my="8" class="bg-red-500" />

      <Section>
        <Typo :multi-ellipsis="2">
          말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다. 말줄임 2줄 내용입니다.
        </Typo>
      </Section>

      <Section>
        <Flex wrap align="center" justify="start" gap="3" mb="5" p="4" rounded="md" class="bg-gray-100">
          <Typo variant="body-l">variant body-l</Typo>
          <Divider direction="vertical" />
          <Typo variant="body-m">variant body-m</Typo>
          <Divider direction="vertical" />
          <Typo variant="body-s">variant body-s</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-l">variant label-l</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-m">variant label-m</Typo>
          <Divider direction="vertical" />
          <Typo variant="label-s">variant label-s</Typo>
          <Divider direction="vertical" />
          <Typo variant="caption-1">variant caption-1</Typo>
          <Divider direction="vertical" />
          <Typo variant="caption-2">variant caption-2</Typo>
        </Flex>
      </Section>

      <Divider full />
      
      <Section as="article">
        <Typo variant="body-l" color="display" class="pb-6">Button</Typo>
        <Flex gap="6">
          <Button variant="fill" size="sm">버튼 fill</Button>
          <Button variant="outline" size="md" color="secondary">버튼 outline</Button>
          <Button variant="fill" size="md" disabled>버튼 disabled</Button>

          <Button variant="fill" size="lg" icon-align="left">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼L
          </Button>
          <Button variant="outline" size="lg" color="tertiary" icon-align="right">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼R
          </Button>
          <Button variant="outline" size="lg" icon-align="top" class="h-auto p-3">
            <template #icon>
              <IMy class="size-6" />
            </template>
            텍스트+icon 버튼T
          </Button>
          
          <Button variant="icon" class="size-[32px] p-2">
            <IMy class="size-[24px]" />
          </Button>

          <Button variant="fill" size="lg" full>버튼 full</Button>
        </Flex>
        <Flex align="center" justify="between" gap="4" mt="5">
          <Button color="secondary" size="lg" class="flex-1">버튼 lg</Button>
          <Button color="tertiary" size="lg" class="flex-1">버튼 lg</Button>
        </Flex>
      </Section>

      <Divider type="thin" />

      <Section>
        <Typo class="pb-6">TextButton</Typo>
        <Flex gap="5">
          <TextButton size="sm">텍스트 버튼</TextButton>
          <TextButton size="md" disabled>텍스트 버튼</TextButton>
          <TextButton size="md" color="secondary">텍스트 버튼</TextButton>
          <TextButton size="lg" color="tertiary">텍스트 버튼</TextButton>
          <TextButton size="lg" icon-align="right">
            <template #icon>
              <IArrowRightS class="size-6" />
            </template>
            텍스트+icon 버튼
          </TextButton>
        </Flex>
      </Section>

      <Divider full />

      <Section>
        <Typo class="pb-6">Tag</Typo>
        <Flex gap="4">
          <Tag variant="solid" color="success">완료</Tag>
          <Tag variant="solid" color="warning">주의</Tag>
          <Tag variant="outline" color="error" type="rounded">실패</Tag>
          <Tag variant="outline" color="success" type="rounded">완료</Tag>
          <Tag variant="solid" color="info">
            <template #icon>
              <IMy class="size-4" />
            </template>
            모집중
          </Tag>
        </Flex>
      </Section>

      <Divider full />

      <Section>
        <Typo class="pb-6">Badge</Typo>
        <Box>
          <Typo as="span" class="relative">
            내용5
            <Badge type="dot" />
          </Typo>
  
          <Flex align="center" gap="2">
            <Typo>내용5</Typo>
            <Badge type="count" color="warning" :count="99" />
          </Flex>
  
          <Flex align="center" gap="2">
            <Typo>내용5</Typo>
            <Badge type="count" color="warning" :count="1000" />
          </Flex>
  
          <button class="relative p-2">
            <ITime class="size-8" />
            <Badge type="dot" class="top-[5px] right-[6px] size-3" />
          </button>
        </Box>
      </Section>

      <Divider full />

      <Section>
        <Typo class="pb-6">Text Input</Typo>
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

        <Divider type="thin" />

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

          <FormGroup label="인증번호">
            <TextInput
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

          <FormGroup label="휴대폰번호">
            <TextInput
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

        <Divider type="thin" />

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
          >
            <Flex align="center" gap="3">
              <TextInput class="flex-1" :max-length="6" placeholder="앞 6자리" />
              <span class="text-gray-500">-</span>
              <TextInput type="password" class="flex-1" :max-length="7" placeholder="뒤 7자리" />
            </Flex>
          </FormGroup>
          
          <FormGroup
            label="주소"
            required
          >
            <Flex direction="col" gap="3">
              <TextInput
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
              <TextInput
                disabled
                placeholder="placeholder"
              />
            </Flex>
          </FormGroup>

          <FormGroup
            label="카드번호"
          >
            <Flex align="center" gap="2">
              <template v-for="i in 4" :key="i">
                <TextInput
                  v-model="formData.cardNum[i - 1]"
                  class="flex-1"
                  align="center"
                  :max-length="4"
                  :clearable="false"
                />
                <span v-if="i < 4" class="text-gray-400">-</span>
              </template>
            </Flex>
          </FormGroup>

          <FormGroup
            label="사업자등록번호"
          >
            <Flex align="center" gap="3">
              <TextInput v-model="formData.bizNum1" class="w-[80px]" align="center" :max-length="3" :clearable="false" />
              <span>-</span>
              <TextInput v-model="formData.bizNum2" class="w-[70px]" align="center" :max-length="2" :clearable="false" />
              <span>-</span>
              <TextInput v-model="formData.bizNum3" class="flex-1" :max-length="5" :clearable="false" />
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
                <Typo variant="body-s" color="tertiary">오른쪽 문구</Typo>
              </Flex>
            </template>

            <TextInput placeholder="placeholder" />
          </FormGroup>
        </Flex>

        <Divider type="thin" />

        <Flex direction="col" gap="6">
          <FormGroup
            label="레이블"
            info-msg="300자 이내로 입력해주세요"
          >
            <Textarea
              v-model="formData.labelTextarea2"
              placeholder="Textarea placeholder"
            />
          </FormGroup>
  
          <FormGroup
            label="레이블"
          >
            <Textarea
              v-model="formData.labelTextarea2"
              placeholder="Textarea placeholder"
              show-count
              :max-length="100"
            />
          </FormGroup>

          <!-- info msg / count 나란히 배치 (예외케이스) -->
          <Flex direction="col" gap="3">
            <FormLabel>레이블</FormLabel>
            <Textarea 
              v-model="formData.labelTextarea"
              placeholder="Textarea placeholder"
              :max-length="100" 
            />
            <Flex align="center" justify="between">
              <Typo variant="body-s" color="caption">100자 이내로 입력해주세요</Typo>
              <Typo as="span" variant="body-s" color="caption">{{ formData.labelTextarea.length }}/100</Typo>
            </Flex>

          </Flex>
        </Flex>

        <Divider type="thin" />

        <Flex direction="col" gap="6">
          <FormGroup label="레이블" pb="5">
            <Select
              v-model="selectValue"
              :options="selectOptions"
              placeholder="선택하세요" />
          </FormGroup>
        </Flex>
      </Section>

      <Divider full />

      <Section>
        <Typo class="pb-6">Textinput Floating</Typo>
        <Flex direction="col" gap="6">
          <FormGroup
            info-msg="정보메세지"
          >
            <TextInputFloating
              label="레이블"
              placeholder="-없이 입력"
              required
            />
            <TextInputFloating 
              placeholder="placeholder"
            />
          </FormGroup>
          <FormGroup
            error
            error-msg="에러메시지"
          >
            <TextInputFloating
              label="레이블고정"
            />
          </FormGroup>
          <FormGroup>
            <TextInputFloating
              label="레이블고정"
              readonly
            />
          </FormGroup>
          <FormGroup
            disabled
          >
            <TextInputFloating
              label="레이블고정"
              disabled
            />
          </FormGroup>
        </Flex>
      </Section>

      <Divider full />

      <OutsetBox mt="6">
        <Section class="bg-gray-100">
          <Box as="article" py="7" px="5">음수마진박스</Box>
        </Section>
      </OutsetBox>

      <Section>
        <Typo>Lottie Player</Typo>
        <Lottie 
          path="/lottie/lottie-test.json"
          :width="326"
          :height="220"
          class="mx-auto"
        />
      </Section>
    </Container>

    <BottomSticky>
      <Button size="cta" color="tertiary">취소</Button>
      <Button size="cta">확인</Button>
    </BottomSticky>

    <!-- <template #footer>
      <AppFooter />
    </template> -->


    <!-- 결과 페이지 : Container로 감쌀 필요 없음 -->
    <!-- lottie 대신 svg 아이콘으로 들어가는 경우 : :icon="IConfirmCheck" -->
    <!-- <ResultView
      title="완료되었습니다"
      description="처리 결과를 확인해주세요."
    >
      
      <template #action>
        <Flex
          align="center"
          gap="3"
        >
          <button type="button" class="text-primary underline">영수증 보기</button>
          <Divider direction="vertical" />
          <button type="button" class="text-primary underline">영수증 보기</button>
        </Flex>
      </template>

      <template #extra>
        <div class="p-4 bg-muted rounded-lg text-sm text-muted-foreground text-center">
          문의사항은 고객센터로 연락주세요.
        </div>
      </template>
      
      <template #banner>
        <button
          type="button"
          @click="handleBannerClick"
        >
          <img src="/images/temp-banner.webp">
        </button>
      </template>
    </ResultView>

    <BottomSticky>
      <button class="w-full ...">확인</button>
    </BottomSticky> -->
    <!-- //결과 페이지 : Container로 감쌀 필요 없음 -->
  </AppLayout>
</template>
