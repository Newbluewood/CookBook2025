<script setup>
import { ref } from 'vue'
//////////  ovu komponentu koristim u registration form za ucitavanje slike u formi ////////////

const emits = defineEmits(['get-blob'])

const previewSrc = ref(null)
const blobF = ref(null)

const handleFileChange = (event) => {
  const file = event.target.files[0]
  blobF.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewSrc.value = e.target.result
      resizeImage(file, 200, 150, (blob) => {
        emits('get-blob', file)
        // Ovde prilagodjavamo sliku
        const url = URL.createObjectURL(blob)
        previewSrc.value = url // Prikazivanje prilagođene slike
      })
    }
    reader.readAsDataURL(file)
  }
}

const resizeImage = (file, maxWidth, maxHeight, callback) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height
          height = maxHeight
        }
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(callback, file.type)
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<template>
  <div class="file-handler">
    <div class="izaberi">
      <h3>Dodaj sliku</h3>
      <input
        type="file"
        accept="image/jpeg, image/png, image/gif"
        @change="handleFileChange"
        class="fmng"
      />
    </div>
    <div class="placeholder">
      <img v-if="previewSrc" :src="previewSrc" alt="Image preview" style="display: block" />
    </div>
  </div>
</template>

<style scoped>
.izaberi {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.file-handler {
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgba(253, 253, 253, 0.325);
  border-radius: 1rem;
  padding: 1rem;
}
.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  width: 180px;
  height: 115px;
  border: 2px solid rgb(132, 110, 82);
  border-radius: 1rem;
  background-color: rgba(234, 231, 220, 0.383);
  overflow: hidden;
}
img {
  height: auto;
  width: 100%;
}
</style>
