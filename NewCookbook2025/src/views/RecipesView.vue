<script setup>
import TheRecipes from '@/components/CookbokComponents/TemplateComponents/TheRecipes.vue'
</script>

<template>
  <TheRecipes />
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
}

.recipe {
  position: relative;
  display: flex;
  border: 2px solid rgb(55, 163, 79);
  border-radius: 10px;
  height: 200px;
  overflow: hidden;
}

.mainImg {
  height: auto;
  width: 100%;
  background-color: rgba(240, 248, 255, 0.049);
  border-radius: 10px;
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
  .recipes {
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .placeholder {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
