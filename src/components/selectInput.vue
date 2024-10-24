<template>
  <div class="input-container" v-click-outside="() => closeContainer()">
    <div class="input" :class="{active: checked.length}" @click="isVisibleContainer = true">
      <div class="text">{{ title }}</div>
      <img src="/Chevron.svg" alt="" class="icon" :class="{active: isVisibleContainer}">
    </div>
    <div class="result-shadow" :class="{active: isVisibleContainer}">
      <div class="result-container" @scroll="scrollContainer">
        <div class="item" @click="clearChecked">Clear All</div>
        <div v-for="item in items" class="item" @click="changeChecked(item.id)">
          <div class="text">{{ item.name }}</div>
          <div class="checkbox" :class="{active: checked.includes(item.id)}" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-container{
  position: relative;
  .input{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    color: $onSurface;
    letter-spacing: -2%;
    background-color: $grayBackground;
    border-radius: 8px;
    width: 100%;
    cursor: pointer;
    transition: background-color, .2s ease-out;

    &:hover{
      background-color: $surfaceHover;
    }

    &.active{
      background-color: $brandBright;

      &:hover{
        background-color: $brandBrightHover;
      }
    }

    .icon{
      transition: transform .3s ease-in;
      &.active{
        transform: scale(1, -1);
      }
    }
  }
  .result-shadow{
    z-index: 5;
    opacity: 0;
    visibility: hidden;
    transition: opacity .3s ease-in;
    width: 360px;
    z-index: 5;
    max-height: 300px;
    position: absolute;
    top: 44px;
    left: -16px;
    &.active{
      opacity: 1;
      visibility: visible;
    }
    @include mobile{
      width: 100vw;
      height: 100vh;
      background-color: $shadowBackground;
      position: fixed;
      top: 0;
      left: 0;
    }
    .result-container{
      box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.16);
      padding: 12px 8px;
      border-radius: 16px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      max-height: 300px;
      overflow-y: scroll;
      
      

      @include mobile{
        position: fixed;
        left: 8px;
        bottom: 8px;
        top: unset;
        width: calc(100vw - 16px);
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar{
          width: 0;
          height: 0;
        }
      }

      .item{
        display: flex;
        align-items: start;
        justify-content: space-between;
        padding: 10px 12px;
        cursor: pointer;
        background-color: #fff;
        border-radius: 4px;

        &:hover{
          background-color: $grayBackground;
        }

        &.active{
          background-color: $brandBright;
        }

        .checkbox{
          box-shadow: 0px 1.2px 1.2px 0px #0000001F,
            0px 0px 0px 1.2px #3C425729,
            0px 2.4px 6px 0px #3C425714;
          width: 20px;
          height: 20px;
          border-radius: 5px;
          margin-left: 12px;
          background-color: #fff;
          flex-shrink: 0;

          &.active{
            background-color: $brand;
            background-image: url('/checkbox.svg');
            background-repeat: no-repeat;
            background-position: 50% 50%;
          }
        }
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
interface IProps{
  title: string
  items: {id: number, name: string}[]
}

const props = defineProps<IProps>()

const emit = defineEmits<{
  (e: 'getNextPage'): void,
  (e: 'changeChecked', checked: number[]): void
}>()

const checked = ref<number[]>([])

const isVisibleContainer = ref<boolean>(false)

const closeContainer = () => {
  if (isVisibleContainer.value) {
    isVisibleContainer.value = false
    emit('changeChecked', checked.value)
  }
}

const changeChecked = (id: number) => {
  const index = checked.value.findIndex(item => item === id)
  if (index === -1) {
    checked.value.push (id)
  } else {
    checked.value.splice(index, 1)
  }
}

const clearChecked = () => {
  checked.value = []
}

const scrollContainer = (event) => {
  if(event.target.scrollHeight - event.target.clientHeight - event.target.scrollTop < 20) {
    emit('getNextPage')
  }
}

</script>