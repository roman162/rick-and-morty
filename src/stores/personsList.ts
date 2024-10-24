import { IPerson } from "@/interfaces/Person";
import Http from "@/services/http";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";

export const usePersonsList = defineStore('personsList', () => {
  const page = ref<number>(1)
  const total = ref<number>(0)

  const persons = ref<IPerson[]>([])
  const isLoad = ref<boolean>(false)
  const firstLoad = ref<boolean>(true)
  const filteredPersons = computed(() => {
    if (checkedPersons.value.length && searchText.value) {
      return persons.value.filter(item => item.name.toLowerCase().includes(searchText.value.toLowerCase()))
    } else {
      return persons.value
    }
  })

  const checkedPersons = ref<number[]>([])
  const searchText = ref<string>('')

  watch(
    () => checkedPersons,
    () => {
      if (checkedPersons.value.length) {
        getCheckedPersons()
      } else {
        page.value = 1
        persons.value = []
        getPersonsList()
      }
    },
    { deep: true }
  )

  watch(
    () => searchText.value,
    () => {
      if (checkedPersons.value.length) {
        persons.value.filter(item => item.name.includes(searchText.value))
      } else {
        page.value = 1
        persons.value = []
        getPersonsList()
      }
    }
  )

  const getCheckedPersons = () => {
    if (!isLoad.value) {
      isLoad.value = true
      Http.get(`/character/${checkedPersons.value}`)
        .then((res) => {
          persons.value = Array.isArray(res.data) ? res.data : [res.data]
          total.value = Array.isArray(res.data) ? res.data.length : 1
          isLoad.value = false
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => isLoad.value = false)
    }
  }

  const getPersonsList = () => {
    if (!isLoad.value) {
      isLoad.value = true
      Http.get(`/character?page=${page.value}${searchText.value ? '&name=' + searchText.value : ''}`)
        .then((res) => {
          persons.value = [...persons.value, ...res.data.results]
          total.value = res.data.info.count
          isLoad.value = false
          firstLoad.value = false
        })
        .catch((err) => {
          if (page.value > 1) {
            page.value--
          }
          persons.value = []
          total.value = 0
          console.log(err)
        })
        .finally(() => isLoad.value = false)
    }
  }

  const getNextPage = () => {
    if (!isLoad.value && !checkedPersons.value.length) {
      page.value++
      getPersonsList()
    }
  }

  const getLocations = (page: number) => {
    return Http.get(`/location?page=${page}`)
  }

  return{
    getPersonsList,
    getLocations,
    getNextPage,
    filteredPersons,
    total,
    checkedPersons,
    searchText,
    firstLoad
  }
})