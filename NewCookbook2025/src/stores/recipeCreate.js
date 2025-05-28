import api from '@/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import imgFromString from '@/helpers/images'

export const useRecipeCreateStore = defineStore('recipeCreate', () => {
  const currentRecipeID = ref()
  const responseData = ref()

  const recipeMainTitle = ref('')
  const recipeMainDescription = ref('')
  const recipeMainImage = ref({ image: null, idImage: null })
  const recipePeopleCount = ref(0)
  const recipePreparationDuration = ref(0)
  const recipeIngredients = ref([])
  const recipePreparationSteps = ref([])
  const recipeCategory = ref([])
  const recipeVegan = ref(false)
  const recipeVegetarian = ref(false)
  const recipeLenten = ref(false)
  const recipeAuthor = ref('')
  const recipeCreatedAt = ref('')

  const recipe = ref({
    recipeMainTitle: recipeMainTitle.value,
    recipeMainDescription: recipeMainDescription.value,
    recipeMainImage: recipeMainImage.value,
    recipePeopleCount: recipePeopleCount.value,
    recipePreparationDuration: recipePreparationDuration.value,
    recipeIngredients: recipeIngredients.value,
    recipePreparationSteps: recipePreparationSteps.value,
    recipeCategory: recipeCategory.value,
    recipeVegan: recipeVegan.value,
    recipeVegetarian: recipeVegetarian.value,
    recipeLenten: recipeLenten.value,
    recipeAuthor: recipeAuthor.value,
    recipeCreatedAt: recipeCreatedAt.value,
  })

  function setRecID(id) {
    currentRecipeID.value = id
  }
  function getRecID() {
    return currentRecipeID.value
  }

  function returnData() {
    return {
      recipeMainTitle: recipeMainTitle.value,
      recipeMainDescription: recipeMainDescription.value,
      recipeMainImage: recipeMainImage.value,
      recipePeopleCount: recipePeopleCount.value,
      recipePreparationDuration: recipePreparationDuration.value,
      recipeIngredients: recipeIngredients.value,
      recipePreparationSteps: recipePreparationSteps.value,
      recipeCategory: recipeCategory.value,
      recipeVegan: recipeVegan.value,
      recipeVegetarian: recipeVegetarian.value,
      recipeLenten: recipeLenten.value,
      recipeAuthor: recipeAuthor.value,
      recipeCreatedAt: recipeCreatedAt.value,
    }
  }

  function addIngredient(ingredient) {
    recipeIngredients.value.push(ingredient)
    //console.log('added ingredient in store:', recipeIngredients.value)
  }
  function removeIngredient(idN) {
    for (let i = 0; i <= recipeIngredients.value.length; i++) {
      if (recipeIngredients[i].idI === idN) {
        recipeIngredients[i].splice(1, i)
      }
      if (recipeIngredients.value.length > 0 && recipeIngredients.value.length < i) {
        recipeIngredients[i].idN = i + 1
      }
    }
  }
  function addStep(step) {
    recipePreparationSteps.value.push(step)
    //console.log('added step in store:', recipePreparationSteps.value)
  }
  function removeStep(idN) {
    for (let i = 0; i <= recipePreparationSteps.value.length; i++) {
      if (recipePreparationSteps[i].idS === idN) {
        recipePreparationSteps[i].splice(1, i)
      }
      if (recipePreparationSteps.value.length > 0 && recipePreparationSteps.value.length < i) {
        recipePreparationSteps[i].idN = i + 1
      }
    }
  }
  function addCategory(category) {
    recipeCategory.value = category
  }
  function removeCategory(id) {
    for (let i = 0; i <= recipeCategory.value.length; i++) {
      if (recipeCategory[i] === id) {
        recipeCategory.value.splice(1, i)
      }
    }
  }

  function setPeopleCount(count) {
    recipePeopleCount.value = Number(count)
  }
  function setPreparationDuration(duration) {
    recipePreparationDuration.value = Number(duration)
  }
  function setRecipeMainTitle(title) {
    recipeMainTitle.value = title
  }
  function setRecipeMainDescription(description) {
    recipeMainDescription.value = description
  }
  function setRecipeMainImage(imageblob, imageID) {
    const recImage = {}
    recImage.image = imageblob ? imgFromString(imageblob) : null
    recImage.idImage = imageID ? imageID : null
    recipeMainImage.value = recImage
  }

  ///
  const ingredientCompleted = ref(false)

  function isIngredientCompleted() {
    return ingredientCompleted.value
  }

  function setIngredientCompleted(is) {
    ingredientCompleted.value = is
  }

  /// API
  async function fetchRecByID() {
    const idRec = currentRecipeID.value
    console.log('fetch by ID: ', currentRecipeID.value)
    try {
      const response = await api.readRecipe({ idRec: idRec })
      const resData = response.data
      console.log('fetched Rec: ', resData)
      responseData.value = resData
      handleData(resData)
      return {
        recipe,
        fetchRecByID,
      }
    } catch (err) {
      console.log('err: ', err)
    }
  }

  /// API response data handler
  function handleData(data) {
    const respData = data
    const respCategory = data.category
    const respSteps = data.prepstep
    const respIngredients = data.recingmeasure
    const respRecipe = data.recipe

    console.log('resp data: ', data)

    const steps = []
    for (let i = 0; i <= respSteps.titles.length - 1; i++) {
      const stepTemplate = {}
      stepTemplate.id = i + 1
      stepTemplate.title = respSteps.titles[i]
      stepTemplate.description = respSteps.texts[i]
      stepTemplate.image = imgFromString(respSteps.images[i])

      steps.push(stepTemplate)
    }
    recipePreparationSteps.value = steps
    const ingredients = []
    for (let i = 0; i <= respIngredients.ingTitles.length - 1; i++) {
      const ingTemplate = {}
      ingTemplate.idN = i + 1
      ingTemplate.quantity = respIngredients.mQuants[i]
      ingTemplate.ingredient = respIngredients.ingTitles[i]
      ingTemplate.measure = respIngredients.mTitles[i]

      ingredients.push(ingTemplate)
    }
    recipeIngredients.value = ingredients
    const category = []
    for (let i = 0; i <= respCategory.length; i++) {
      category.push(respCategory[i])
    }
    recipeCategory.value = category
    setPeopleCount(respRecipe.peopleCount)
    setPreparationDuration(respRecipe.prepDuration)
    setRecipeMainTitle(respRecipe.title)
    setRecipeMainDescription(respRecipe.description)
    setRecipeMainImage(respRecipe.img[0].image, respRecipe.idImg)
    recipeAuthor.value = respRecipe.user ? respRecipe.user : 'Unknown Author'
    recipeCreatedAt.value = respRecipe.created ? respRecipe.created : 'Unknown Date'
    recipeVegan.value = respData.vegan === 1 ? true : false
    recipeVegetarian.value = respData.vegetarian === 1 ? true : false
    recipeLenten.value = respData.lenten === 1 ? true : false
  }

  return {
    recipe,
    setRecID,
    getRecID,
    returnData,
    responseData,
    currentRecipeID,
    recipeMainTitle,
    recipeMainDescription,
    recipeMainImage,
    recipePeopleCount,
    recipePreparationDuration,
    recipeIngredients,
    recipePreparationSteps,
    recipeCategory,
    recipeVegan,
    recipeVegetarian,
    recipeLenten,
    recipeAuthor,
    ingredientCompleted,
    addIngredient,
    removeIngredient,
    addStep,
    removeStep,
    addCategory,
    removeCategory,
    setPeopleCount,
    setPreparationDuration,
    setRecipeMainTitle,
    setRecipeMainDescription,
    setRecipeMainImage,
    isIngredientCompleted,
    setIngredientCompleted,
    fetchRecByID,
  }
})
