<script setup>
import gsap from 'gsap'
import { onMounted } from 'vue'
import SearchBar from './CookbokComponents/TemplateComponents/SearchBar.vue'

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

onMounted(() => {
  gsap.from('.hallo', {
    rotate: -180,
    x: -300,
    y: -100,
    scale: 0,
    opacity: 0,
    stagger: 0.9,
    delay: 0.2,
    ease: 'sine',
  })

  /*gsap.from('.msg', {
    x: -300,
    y: -100,
    scale: 0,
    opacity: 0,
    stagger: 0.8,
    delay: 0.5,
    ease: 'elastic',
  })
  gsap.to('.msg', {
    opacity: 1,
  })*/

  gsap.from('.search', {
    x: -300,
    y: -100,
    scale: 0,
    opacity: 0,
    stagger: 0.8,
    delay: 1.3,
    ease: 'ease',
  })
  /*gsap.to('.msg', {
    opacity: 1,
  })*/
})
</script>

<template>
  <div class="greetings hallo">
    <h2 class="green user">{{ msg }}</h2>
    <h3 class="hallo text">
      <span>What are we going to cook today?</span>
    </h3>
    <SearchBar class="search" />
  </div>
</template>

<style scoped>
h2 {
  font-weight: 500;
  font-size: 2rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
@media (min-width: 850px) and (max-width: 950px) {
  .user,
  .text {
    display: none;
  }
  .greetings {
    position: sticky;
    top: 0;
  }
}
</style>
