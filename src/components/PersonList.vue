<template>
  <div v-if="store.filteredPersons.length" class="person-list">
    <PersonItem v-for="person of store.filteredPersons" :person />
  </div>
  <div v-if="store.filteredPersons.length && isPagination" ref="loader" class="loader">
    <Loader />
  </div>
  <NotFound v-if="!store.filteredPersons.length && !store.firstLoad" />
</template>

<style scoped lang="scss">
  .person-list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    column-gap: 32px;
    row-gap: 48px;

    @include mobile{
      grid-template-columns: 100%;
    }
  }
</style>

<script setup lang="ts">
import PersonItem from './PersonItem.vue';
import { watch, onMounted, ref, computed } from 'vue';
import Loader from './loader.vue';
import { usePersonsList } from '@/stores/personsList';
import NotFound from './notFound.vue';

const store = usePersonsList()

let observer: IntersectionObserver | null = null

const loader = ref<HTMLElement>()

watch (
  () => loader.value,
  () => {
    if (isPagination.value) {
      startWatch()
    } else {
      stopWatch()
    }
  }
)

const isPagination = computed(() => {
  return store.total > store.filteredPersons.length
})
const startWatch = function () {
  if (observer && loader.value) {
    observer.observe(loader.value)
  }
}
const stopWatch = function () {
  if (observer && loader.value) {
    observer.unobserve(loader.value)
  }
}
onMounted(() => {
  observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      store.getNextPage()
    }
  })
  if (isPagination.value) {
    startWatch()
  }
})
</script>