<template>
  <div class="input-container">
    <input v-model="text" type="text" class="input" placeholder="Enter character name" :class="{active: text.length}">
    <img src="/search-sm.svg" alt="" class="icon">
  </div>
</template>

<style scoped lang="scss">
.input-container{
  position: relative;
  .input{
    padding: 6px 8px;
    padding-left: 44px;
    background-color: $grayBackground;
    border-radius: 8px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 500;
    border: 2px solid $grayBackground;
    box-shadow: none;
    width: 100%;
    transition: border-color, background-color, .2s ease-out;

    &:hover{
      background-color: $surfaceHover;
      border-color: $surfaceHover;
    }

    &:focus{
      border-color: $brand;
      outline: none;
    }
    &.active{
      border-color: $brand;
    }
  }
  .icon{
    position: absolute;
    top: 8px;
    left: 10px;
  }
}
</style>

<script setup lang="ts">
import { debounce } from 'lodash'
import { ref, watch } from 'vue';
import { usePersonsList } from '../stores/personsList';

const store = usePersonsList()

const text = ref<string>('')

const changeText = () => {
  store.searchText = text.value
}

const debounceChangeText = debounce(changeText, 500)

watch(
  () => text.value,
  () => {
    debounceChangeText()
  }
)

</script>