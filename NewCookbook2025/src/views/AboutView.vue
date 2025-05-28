<script setup>
import TutorItem from '@/components/CookbokComponents/OtherComponents/TutorItem.vue'
</script>

<template>
  <div class="about">
    <TutorItem />
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    max-height: 100vh;
    display: flex;
    align-items: center;
  }
  .about {
    flex-direction: column;
  }
}
</style>
