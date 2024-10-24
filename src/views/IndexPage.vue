<template>
  <div class="index-page">
    <PageHeader class="header" />
    <PersonList />
  </div>
</template>

<style scoped lang="scss">
.index-page{
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 64px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @include mobile{
    padding: 20px 16px;
  }

  .header{
    margin-bottom: 44px;
  }
}
</style>

<script setup lang="ts">
import PersonList from '@/components/PersonList.vue';
import PageHeader from '@/components/PageHeader.vue';
import { onMounted } from 'vue';
import { usePersonsList } from '@/stores/personsList';

const store = usePersonsList()

onMounted(() => {
  store.getPersonsList()
})
</script>