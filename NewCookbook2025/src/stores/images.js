import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api'

export const useImageStore = defineStore('images', () => {
  const imageFromSteps = ref()
  const stepImage = computed(() => imageFromSteps.value)

  const ImagesFromSteps = ref([])
  const stepsImages = computed(() => ImagesFromSteps.value)

  function addStepImage(imageBlob) {
    ImagesFromSteps.value.push(imageBlob)
  }

  function setCurrentImage(imageBlob) {
    imageFromSteps.value = imageBlob
  }

  const imageData = ref()
  const images = computed(() => imageData.value)

  const errorMessage = ref()
  const errorResponse = ref()

  async function ImageUpload(image, id) {
    imageData.value = null
    errorMessage.value = ''
    errorResponse.value = ''

    const ID = Number(id)

    try {
      const res = await api.upload({ image: image, idImg: ID })
      const resData = res.data.data
      console.log('img data:', resData)
    } catch (err) {
      console.log('err: ', err)
    }
  }

  async function fetchImage(id) {
    imageData.value = null
    errorMessage.value = ''
    errorResponse.value = ''

    const ID = Number(id)
    try {
      const res = await api.read(ID)
      const resData = res.data
      console.log('images data: ', resData)
      const ImageURL = imgFromString(resData.Image)

      imageData.value = ImageURL
    } catch (err) {
      console.log('err; ', err)
      errorMessage.value = err
      console.log('find msg:', err.response.data.message)
      errorResponse.value = err.response.data.message
      imageData.value.push(null)
    }
  }

  /// Images Transform ///

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

  return {
    images,
    errorMessage,
    errorResponse,
    stepImage,
    stepsImages,
    setCurrentImage,
    addStepImage,
    fetchImage,
    ImageUpload,
  }
})
