<template>
  <SelectInput title="Select location" :items="locations" @getNextPage="getNextPage" @changeChecked="changeChecked" />
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import SelectInput from '@/components/selectInput.vue';
import { ILocation } from '@/interfaces/Location';
import { usePersonsList } from '@/stores/personsList';
import { ref, onMounted } from 'vue';

const store = usePersonsList()

const locations = ref<ILocation[]>([])

const page = ref<number>(1)
const totalPages = ref<number>(0)
const isLoad = ref<boolean>(false)
const getLocations = () => {
  if (!isLoad.value) {
    isLoad.value = true
    store.getLocations(page.value)
      .then((res) => {
        locations.value = [...locations.value, ...res.data.results]
        totalPages.value = res.data.info.pages
      })
      .catch((err) => {
        if (page.value > 1) {
          page.value--
        }
        console.log(err)
      })
      .finally(() => isLoad.value = false)
  }
}

const getNextPage = () => {
  if (!isLoad.value && page.value < totalPages.value) {
    page.value++
    getLocations()
  }
}

const changeChecked = (checked: number[]) => {
  let result = []
  for (const id of checked) {
    const location = locations.value.find(item => item.id === id)
    const persons = location.residents.map(i => {
      const index = i.lastIndexOf('/')
      return Number(i.slice(index + 1))
    })
    result = [...result, ...persons]
  }
  store.checkedPersons = Array.from(new Set(result))
}

onMounted(() => {
  getLocations()
})
</script>