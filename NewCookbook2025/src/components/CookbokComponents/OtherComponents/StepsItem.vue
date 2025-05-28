<script setup>
import StepTemplate from './StepTemplate.vue'
import { ref, computed, watchEffect } from 'vue'

const step = ref({
  id: 0,
  name: 'Step',
  title: null,
  description: null,
  image: null,
  idImage: null,
})

const prop = defineProps(['currentList'])
const emit = defineEmits(['confirm'])
const currentList = computed(() => (prop.currentList ? prop.currentList : []))
const steps = ref(currentList.value)

watchEffect(() => {
  let confirm = false
  for (let step of steps.value) {
    confirm = step.description ? true : false
  }
  confirm ? emit('confirm', steps.value, 5) : emit('confirm', null, 5)
})

//const test = ref(steps.value)

function setImage(image, id) {
  if (image) {
    for (let korak of steps.value) {
      if (korak.id === id) {
        korak.image = image
      }
    }
  }
}

function setTitle(title, id) {
  for (let korak of steps.value) {
    if (korak.id === id) {
      korak.title = title
    }
  }
}

function setDescription(description, id) {
  for (let korak of steps.value) {
    if (korak.id === id) {
      korak.description = description
    }
  }
}

function addStep() {
  const st = step.value
  const idS = steps.value.length + 1
  st.id = idS
  steps.value.push(st)
  step.value = { id: 0, name: 'Step', title: null, description: null, image: null, idImage: null }
}
</script>

<template>
  <div class="preparation-steps">
    <div class="steps" v-for="korak in steps" :key="korak.id">
      <StepTemplate
        :korak="korak"
        @image-load="setImage"
        @title="setTitle"
        @description="setDescription"
      />
    </div>
    <button @click="addStep">add step</button>
  </div>
</template>
<style scoped>
.preparation-steps {
  width: 90%;

  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}

@media (max-width: 1240px) {
  .preparation-steps {
    width: 90%;
  }
}
</style>
