<script setup>
import { useImageStore } from '@/stores/images'
import { ref, computed } from 'vue'

const imageStore = useImageStore()

const emit = defineEmits(['load-image'])

const inputId = ref()
const imageFile = ref()
const imageURL = computed(() => imageFile.value && URL.createObjectURL(imageFile.value.files[0]))

function load() {
  console.log('url', imageURL.value)
  emit('load-image', imageURL.value)
}
</script>

<template>
  <div class="image-handler">
    <h2>Images</h2>
    <div class="wrapper">
      <div class="controls">
        <input type="text" v-model="inputId" placeholder="enter image ID" value="1" />
        <input type="file" name="image" id="image" v-on:change="load" ref="imageFile" />
        <button @click="imageStore.fetchImage(inputId)">fetch Image</button>
      </div>
      <div class="image-wrapper">
        <div v-if="imageStore.images">
          <img :src="imageStore.images" alt="alt" />
        </div>
        <div v-else>
          <img src="/image_placeholder1.png" alt="plch" />
        </div>
      </div>
      <div v-if="imageStore.errorMessage">{{ imageStore.errorMessage }}</div>
      <div v-if="imageStore.errorResponse">{{ imageStore.errorResponse }}</div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  margin-bottom: 40px;
}
.image-handler {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(240, 248, 255, 0.154);
  border-radius: 10px;
  padding: 20px;
}
.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  overflow: hidden;

  border-radius: 20px;
}
img {
  width: 100%;
  height: auto;
  border-radius: 20px;
}
button {
  border-radius: 5px;
  background-color: rgba(240, 248, 255, 0.672);
  outline: none;
  cursor: pointer;
}
</style>
