import api from './config'

export default {
  /////////// Serach
  getCheckBoxes: (data) => api.get('searchbar/getCheckBoxes', data),
  searchAll: (data) => api.post('searchbar/recipeSearch', data),
  searchByIngredients: (data) => api.post('searchbar/searchByIngredient', data),
  searchFiltered: (data) => api.post('searchbar/searchFiltered', data),

  /// Recipe
  readRecipe: (data) => api.post('recipe/readRecipe', data),

  /// Dishes
  getDishes: () => api.get('dish/readDish'),

  /// Images
  read: (data) => api.get('image/read', { params: { idImg: data } }),
  upload: (data) => api.post('image/upload', data),

  // Ingredients and measures
  IngAndMeasure: (data) => api.get('ingredients/sendIngAndMeasure', { params: data }),
  searchIngredients: (data) => api.post('ingredients/searchIngredients', data),
}
