<template>
  <div class="header-container">
    <div class="title-container">
      <h1 class="title">
        Сharacters Rick and Morty
      </h1>
      <span v-if="store.total" class="total">
        {{ store.total }}
      </span>
    </div>
    <div class="inputs-container">
      <div class="search-input">
        <SearchInput />
      </div>
      <div class="select-input">
        <locationsInput title="Select location"/>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container{
  .title-container{
    color: $black;
    margin-bottom: 32px;

    .title{
      font-size: 40px;
      font-weight: 600;
      line-height: 40px;
      display: inline;
    }

    .total{
      opacity: .3;
      font-size: 40px;
      font-weight: 600;
      line-height: 40px;
    }
  }
  .inputs-container{
    display: flex;
    align-items: center;
    gap: 16px;

    @include mobile{
      flex-direction: column;
      align-items: stretch;
    }
  }
}
</style>

<script setup lang="ts">
import locationsInput from '@/components/locationsInput.vue';
import { usePersonsList } from '@/stores/personsList';
import SearchInput from './searchInput.vue';

const store = usePersonsList()
</script>