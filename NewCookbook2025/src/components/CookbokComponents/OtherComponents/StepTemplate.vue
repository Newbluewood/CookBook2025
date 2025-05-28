<script setup>
import imagesLoader from './imagesLoader.vue'
import { ref, computed } from 'vue'

const prop = defineProps(['korak', 'click'])
const emit = defineEmits(['image-load', 'title', 'description'])
const korak = computed(() => prop.korak)

const imageURL = ref()
const title = ref()
const description = ref()
const id = korak.value.id

function loadImage(image, id) {
  if (image) {
    imageURL.value = image
  } else {
    imageURL.value = null
  }

  emit('image-load', imageURL.value, id)
  console.log('IMG: ', image)
}

const klik = ref(false)

function triggerCick() {
  if (!klik.value) {
    klik.value = true
    setTimeout(() => {
      klik.value = false
    }, 1000)
  }
}
function emitTitle() {
  emit('title', title.value, id)
}
function emitDecription() {
  emit('description', description.value, id)
}
</script>

<template>
  <div class="step-wrapper">
    <div class="image-wrapper">
      <imagesLoader :korak="korak" :click="klik" @load-image="loadImage" @click="triggerCick" />
      <button class="btt" @click="triggerCick">Upload</button>
    </div>
    <div class="title-desc">
      <div class="title-wrapper">
        <input
          class="title"
          type="text"
          v-model="title"
          :placeholder="korak.title ? korak.title : 'insert step Title...'"
          @input="emitTitle"
        />
      </div>
      <div class="description-vrapper">
        <textarea
          class="description"
          type="text"
          v-model="description"
          :placeholder="korak.description ? korak.description : 'Your description here...'"
          @input="emitDecription"
        ></textarea>
      </div>
      <div class="controls-wrapper"></div>
    </div>
  </div>
</template>

<style scoped>
.step-wrapper {
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
}
.image-wrapper {
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 2;
}
.title-desc {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  flex: 3;
}
.title-wrapper,
.description-vrapper {
  width: 100%;
  height: 100%;
}
.title-wrapper {
  flex: 1;
}
.title {
  font-size: 20px;
}
.description-vrapper {
  flex: 3;
}
.description {
  font-size: 18px;
}
input {
  width: 100%;
}
textarea {
  width: 100%;
  min-height: 100%;
  height: fit-content;
}
.btt {
  border: 1px solid rgba(245, 245, 220, 0.343);
  background-color: rgba(245, 245, 220, 0.064);
  color: rgba(240, 248, 255, 0.604);
}
.btt:disabled {
  border: 1px solid rgba(245, 245, 220, 0.043);
  background-color: rgba(245, 245, 220, 0.036);
  color: rgba(240, 248, 255, 0.069);
}
.btt:hover {
  background-color: rgba(240, 248, 255, 0.199);
  cursor: pointer;
}
@media (min-width: 1024px) {
  .step-wrapper {
    height: 100%;
    flex-direction: row;
  }
  .image-wrapper {
    height: 100%;
    width: fit-content;
    flex: 1;
  }
  .title-desc {
    margin-left: 20px;
    flex: 3;
  }
}
</style>
