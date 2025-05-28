<script setup>
import TemplateItem from './TemplateItem.vue'
import gsap from 'gsap'
import { onMounted } from 'vue'
import { useDishStore } from '@/stores/dish'

const dishStore = useDishStore()

onMounted(() => {
  if (dishStore.allDishes.length > 0) {
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
    dishStore.fetchAllDishes()
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
</script>

<template>
  <div class="placeholder">
    <TemplateItem class="tmpl" v-for="dish in dishStore.allDishes" :key="dish.idDish">
      <template #icon>
        <div class="image-placeholder">
          <img :src="imgFromString(dish.image)" :alt="dish.dishTitle" />
        </div>
      </template>
      <template #heading>{{ dish.dishTitle }}</template>
      {{ dish.subdish }}
      Docs
    </TemplateItem>
  </div>
</template>

<style scoped>
.placeholder {
  width: 100vh;
  padding-bottom: 300px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}
.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
img {
  min-height: 100vh;
  width: auto;
}
.tmpl {
  max-height: 100vh;
}

@media (min-width: 1024px) {
  .placeholder {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
