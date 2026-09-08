<script setup lang="ts">
import { BulletItem, BulletList, Container, Divider, Section, Typo } from '@ui/vue';
import { ref } from 'vue';


interface BulletItemNode {
  label: string;
  type: 'dot' | 'hyphen' | 'number';
  depth?: BulletItemNode[];
}
const bulletData = ref<BulletItemNode[]>([
  {
    label: 'Bullet depth1 항목입니다.',
    type: 'dot',
    depth: [
      { label: 'Bullet depth2 항목입니다.', type: 'hyphen' },
      { label: 'Bullet depth2 항목입니다.', type: 'hyphen' },
    ]
  },
  {
    label: 'Bullet depth1 항목입니다.',
    type: 'dot',
  },
  {
    label: 'Bullet depth1 항목입니다.',
    type: 'dot',
  }
]);
</script>

<template>
  <Container>
    <Section>
      <Typo variant="heading-l" pb="9">BulletList</Typo>

      <!-- bullet data -->
      <BulletList
        v-for="(item, index) in bulletData"
        :key="index"
        :type="item.type"
      >
        <BulletItem>
          {{ item.label }}
      
          <!-- 2depth -->
          <BulletList v-if="item.depth && item.depth.length > 0" :type="item.depth[0].type">
            <BulletItem
              v-for="(child, childIndex) in item.depth"
              :key="`child-${childIndex}`"
            >
              {{ child.label }}
            </BulletItem>
          </BulletList>
        </BulletItem>
      </BulletList>

      <Divider type="thin" my="10" />
      
      <!-- 도트형 -->
      <BulletList type="dot">
        <BulletItem>Bullet dot 첫 번째 항목입니다.</BulletItem>
        <BulletItem>
          Bullet dot 두 번째 항목입니다.
          <template #depth>
            <!-- 2depth -->
            <BulletList type="hyphen">
              <BulletItem>하위 항목 1</BulletItem>
              <BulletItem>하위 항목 2</BulletItem>
            </BulletList>
          </template>
        </BulletItem>
        <BulletItem>Bullet dot 세 번째 항목입니다.</BulletItem>
      </BulletList>

      <Divider type="thin" my="10" />

      <!-- 하이픈형 -->
      <BulletList type="hyphen">
        <BulletItem>Bullet hyphen 첫 번째 항목입니다.</BulletItem>
        <BulletItem>Bullet hyphen 두 번째 항목입니다.</BulletItem>
      </BulletList>
            
      <Divider type="thin" my="10" />
 
      <!-- 숫자형 -->
      <BulletList type="number">
        <BulletItem>
          Bullet number 첫 번째 순서
          <template #depth>
            <!-- 2depth -->
            <BulletList type="dot">
              <BulletItem>하위 항목 1</BulletItem>
              <BulletItem>하위 항목 2</BulletItem>
            </BulletList>
          </template>
        </BulletItem>
        <BulletItem>Bullet number 두 번째 순서</BulletItem>
        <BulletItem>
          Bullet number 세 번째 순서
          <BulletList type="number">
            <BulletItem>
              하위 항목 1
              <template #depth>
                <BulletList type="dot">
                  <BulletItem>더 깊은 항목 1</BulletItem>
                  <BulletItem>더 깊은 항목 2</BulletItem>
                </BulletList>
              </template>
            </BulletItem>
            <BulletItem>하위 항목 2</BulletItem>
          </BulletList>
        </BulletItem>
      </BulletList>
 
    </Section>
  </Container>
</template>