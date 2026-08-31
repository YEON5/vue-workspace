<script setup lang="ts">
import { BulletItem, BulletList, Container, Divider, Section, Typo } from '@ui/vue';
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">BulletList</Typo>
      
      <!-- 1depth 도트형 -->
      <BulletList type="dot">
        <BulletItem>Bullet dot 첫 번째 항목입니다.</BulletItem>
        <BulletItem>
          Bullet dot 두 번째 항목입니다.
          <template #depth>
            <!-- 2depth - 새로운 BulletList로 type을 hyphen으로 전환, depth는 자동 +1 -->
            <BulletList type="hyphen">
              <BulletItem>하위 항목 1</BulletItem>
              <BulletItem>하위 항목 2</BulletItem>
            </BulletList>
          </template>
        </BulletItem>
        <BulletItem>Bullet dot 세 번째 항목입니다.</BulletItem>
      </BulletList>

      <Divider type="thin" class="my-10" />

      <BulletList type="hyphen">
        <BulletItem>Bullet hyphen 첫 번째 항목입니다.</BulletItem>
        <BulletItem>Bullet hyphen 두 번째 항목입니다.</BulletItem>
      </BulletList>
            
      <Divider type="thin" class="my-10" />
 
      <!-- 숫자형 -->
      <BulletList type="number">
        <BulletItem :index="1">
          Bullet number 첫 번째 순서
          <template #depth>
            <!-- 2depth - 새로운 BulletList로 type을 hyphen으로 전환, depth는 자동 +1 -->
            <BulletList type="dot">
              <BulletItem>하위 항목 1</BulletItem>
              <BulletItem>하위 항목 2</BulletItem>
            </BulletList>
          </template>
        </BulletItem>
        <BulletItem :index="2">Bullet number 두 번째 순서</BulletItem>
        <BulletItem :index="3">Bullet number 세 번째 순서</BulletItem>
      </BulletList>
 
    </Section>
  </Container>
</template>