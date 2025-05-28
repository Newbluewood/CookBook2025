import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useDishStore = defineStore('dishes', () => {
  const dishes = ref([])

  const allDishes = computed(() => dishes.value)

  async function fetchAllDishes() {
    try {
      const res = await api.getDishes()
      const resData = res.data.data
      dishes.value = resData
      console.log('resDataDishes:', resData)
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return {
    allDishes,
    fetchAllDishes,
  }
})
