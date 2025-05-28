<script setup>
import { ref, computed, watchEffect } from 'vue'

const prop = defineProps(['korak', 'image', 'click'])
const emit = defineEmits(['load-image'])

const korak = computed(() => prop.korak)
const image = ref(prop.image)
const url = computed(() => (korak.value && korak.value.image ? korak.value.image : image.value))

watchEffect(() => (prop.click ? choseFile() : null))

const imageFile = ref()
const imageURL = computed(() => imageFile.value && URL.createObjectURL(imageFile.value.files[0]))

//niz slika
const file_input = ref()

function choseFile() {
  imageFile.value = file_input.value
  console.log('element:', imageFile.value)
  imageFile.value.click()
}

function loadImage() {
  console.log('Image:', imageURL.value)
  if (korak.value) {
    korak.value.image = imageURL.value
    emit('load-image', imageURL.value, korak.value.id)
    imageFile.value = null
  } else {
    image.value = imageURL.value
    emit('load-image', imageURL.value)
  }
}
</script>

<template>
  <div class="image-wrapper">
    <div class="slike-wrapper">
      <div class="file-upload">
        <div class="slika-koraka-upload">
          <input ref="file_input" type="file" class="images-input-element" @change="loadImage" />
          <div class="image-korak-wrapper">
            <img v-if="url" :src="url" alt="image" />
            <img class="placeholder" v-else src="/image_placeholder1.png" alt=" no image " />
          </div>
        </div>
      </div>
    </div>
    <!--<button class="animated-text btn" @click="choseFile">
          {{ korak.image.value ? 'Zameni Sliku' : ' Ubaci sliku' }}
        </button>-->
  </div>
</template>
<style scoped>
.placeholder {
  width: 60%;
  height: auto;
  padding: 30px;
}
.image-wrapper {
  height: 100%;
  width: 100%;
}
.slike-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(240, 248, 255, 0.463);
}
.slika-koraka-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.image-korak-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-height: 200px;
  background-color: rgba(240, 248, 255, 0.133);
  overflow: hidden;
}
img {
  width: 100%;
  height: auto;
}
.btn {
  margin: 15px 0;
}
.images-input-element {
  display: none;
}
@media (min-width: 1024px) {
  .slika-koraka {
    flex-direction: column;
  }
  .placeholder {
    width: 90%;
  }
}
</style>
