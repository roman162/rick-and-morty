<template>
  <div class="person-item">
    <div class="image-container">
      <img :src="person.image" alt="" class="image">
    </div>
    <div class="text-container">
      <div class="title">
        {{ person.name }}
      </div>
      <div class="desc">
        <div class="label">
          Last known location:
        </div>
        <div class="text">
          {{ person.location.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.person-item{
  display: flex;
  flex-direction: column;
  color: $onSurface;
  cursor: pointer;

  @include mobile {
    flex-direction: row;
  }

  &:hover{
    .image{
      transform: scale(120%);
    }
  }

  .image-container{
    border-radius: 4px;
    overflow: hidden;
    @include mobile{
      height: 150px;
      aspect-ratio: 1/1;
      margin-right: 16px;
      flex-shrink: 0;
    }
    .image{
      transition: transform .3s ease-out;
      width: 100%;
      height: 100%;
    }
  }

  .title{
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    margin-top: 16px;
    letter-spacing: -1%;
    @include mobile{
      margin-top: 0;
    }
  }
  .desc{
    margin-top: 4px;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    letter-spacing: -0.6%;
    display: flex;
    align-items: start;
    @include mobile{
      flex-direction: column;
      margin-top: 8px;
    }
    .label{
      opacity: .4;
      margin-right: 4px;
      white-space: nowrap;
    }
  }
}
</style>

<script setup lang="ts">
import { IPerson } from '@/interfaces/Person';

interface IProps {
  person: IPerson
}

const props = defineProps<IProps>()
</script>