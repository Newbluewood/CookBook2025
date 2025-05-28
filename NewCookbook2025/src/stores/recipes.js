import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useRecipesStore = defineStore('recipes', () => {
  const recipes = ref([])
  const allRecipes = computed(() => recipes.value)

  async function fetchAllRecipes(search) {
    try {
      const res = await api.searchAll({ search: search })
      const resData = res.data.data
      recipes.value = resData
      console.log('resDataRecipes:', resData)
    } catch (err) {
      console.log(err)
      return err
    }
  }

  return {
    allRecipes,
    fetchAllRecipes,
  }
})
