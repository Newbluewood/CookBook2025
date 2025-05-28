import { defineStore } from 'pinia'
import api from '@/api'
import { ref, computed } from 'vue'

export const useIngredientsStore = defineStore('ingredients', () => {
  const ingredientsData = ref()
  const measuresData = ref()
  const Ingredients = computed(() => ingredientsData.value)
  const Measures = computed(() => measuresData.value)

  // Ingredient filtred search
  async function fetchIngredients(search, filters, pages) {
    const query = search ? search.toLowerCase() : ''
    const filtr = filters ? filters : []
    const pgNo = pages ? Number(pages) : null

    try {
      const res = await api.searchIngredients({ search: query, filters: filtr, pages: pgNo })
      const resData = res.data.data
      console.log('Ingredients search data: ', resData)
    } catch (err) {
      console.log('err message:', err)
      console.log('backend error: ', err.response.data.message)
    }
  }
  // Separated fetch function for all Measures data
  async function fetchMeasure(searchMeasure) {
    const searchM = searchMeasure ? searchMeasure.toLowerCase() : ''

    try {
      const res = await api.IngAndMeasure({ searchMeasure: searchM })
      const resData = res.data
      console.log('Measures search data: ', resData.dataMeasure)
      measuresData.value = resData.dataMeasure
    } catch (err) {
      console.log('err message:', err)
      console.log('backend error: ', err.response.data.message)
    }
  }
  // Separated fetch function for all Ingredients data
  async function fetchIngredient(searchIngredient) {
    const searchI = searchIngredient ? searchIngredient.toLowerCase() : ''

    try {
      const res = await api.IngAndMeasure({ searchIngredient: searchI })
      const resData = res.data
      console.log('Ingredients search data: ', resData.dataIng)
      ingredientsData.value = resData.dataIng
    } catch (err) {
      console.log('err message:', err)
      console.log('backend error: ', err.response.data.message)
    }
  }

  return {
    Ingredients,
    Measures,
    fetchIngredients,
    fetchMeasure,
    fetchIngredient,
  }
})
