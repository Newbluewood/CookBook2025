<script setup>
import gsap from 'gsap'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { useRecipesStore } from '@/stores/recipes'

import { useRecipeCreateStore } from '@/stores/recipeCreate'
const recCreateStore = useRecipeCreateStore()

const recStore = useRecipesStore()
const router = useRouter()

onMounted(() => {
  if (recStore.allRecipes.length > 0) {
    gsap.from('.tmpl', {
      x: -200,
      scale: 0,
      opacity: 0,
      stagger: 0.1,
      delay: 1.3,
      ease: 'sean',
    })
    gsap.to('.tmpl', {
      opacity: 1,
    })
  } else {
    recStore.fetchAllRecipes()
  }
})

function imgFromString(input) {
  if (input) {
    // Convert the input to a string
    let str = String(input).trim()

    // Ensure the Base64 string is properly padded
    while (str.length % 4 !== 0) {
      str += '='
    }
    // Check if the Base64 string is valid
    const base64Pattern = /^[A-Za-z0-9+/]+={0,2}$/
    if (!base64Pattern.test(str)) {
      throw new Error('Invalid Base64 string')
    }
    // Conversion
    const base64String = str
    const imageUrl = `data:image/png;base64,${base64String}`

    return imageUrl
  } else {
    return
  }
}

function readRecipe(id) {
  console.log('saljem ID: ', id)
  recCreateStore.setRecID(id)
  recCreateStore.fetchRecByID()
  router.push('/about')
}
</script>

<template>
  <div class="recipes">
    <h1 class="heading">Recipes</h1>
    <div class="placeholder" v-if="recStore.allRecipes.length > 0">
      <div
        class="recipe tmpl"
        v-for="rec in recStore.allRecipes"
        :key="rec.id"
        @click="readRecipe(rec.idRec)"
      >
        <div class="mainImg">
          <img :src="imgFromString(rec.image)" :alt="rec.idRec" />
        </div>
        <div class="title">{{ rec.recTitle }}</div>
      </div>
    </div>
    <div v-else class="no-result">Sorry! No such a search !</div>
  </div>
</template>

<style scoped>
.heading {
  margin: 1rem 0 2rem 0;
  place-self: start;
  padding: 5px 10px;
  background-color: rgba(240, 248, 255, 0.035);
  border-radius: 10px;
}

.placeholder {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 20px;
  row-gap: 40px;
}
.recipes {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.recipe {
  position: relative;
  display: flex;
  border: 2px solid rgb(55, 163, 79);

  height: 200px;
  overflow: hidden;
}

.mainImg {
  height: auto;
  width: 100%;
  background-color: rgb(240, 248, 255);
}

.title {
  width: 100%;
  position: absolute;
  background-color: aliceblue;
  padding: 0 30px;
  text-align: center;
  color: black;
  box-shadow: 3px 5px 1px rgba(0, 0, 0, 0.299);
}

img {
  width: 100%;
  height: auto;
}

@media (min-width: 1024px) {
  /*.recipes {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }*/

  .placeholder {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
