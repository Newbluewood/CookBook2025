<script setup>
import { useRouter } from 'vue-router'
import { useRecipesStore } from '@/stores/recipes'
import { ref } from 'vue'

const recStore = useRecipesStore()
const router = useRouter()
const searchEntry = ref()

function fetch() {
  router.push('/recipes')
  recStore.fetchAllRecipes(searchEntry.value)
}

let timeout = null

function prevent() {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    fetch()
  }, 300)
}
</script>

<template>
  <div class="search-bar">
    <input
      type="text"
      name="main-serchbar"
      id="search"
      placeholder="enter your search..."
      @input="prevent"
      v-model="searchEntry"
    />
  </div>
</template>

<style scoped>
.search-bar {
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
}
input {
  width: 80%;
  height: 100%;
  margin: 0;
  padding: 4px;
  text-align: center;
  border-radius: 3em;
  font-size: 18px;
  background-color: rgba(175, 175, 175, 0.353);
  border: transparent;
}

input:focus {
  color: aliceblue;
}

input::placeholder {
  color: rgb(0, 0, 0);
}
</style>
