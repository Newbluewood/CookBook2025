<script setup>
import { ref, computed, watchEffect } from 'vue'
import ImagesLoader from './imagesLoader.vue'
import StepsItem from './StepsItem.vue'
import IngredientsItem from './ingredientsItem.vue'

const prop = defineProps(['segments', 'current'])
const emit = defineEmits(['set-value', 'confirm-entries'])
const steps = computed(() => prop.segments)

const entryValue = ref()
const currentSection = computed(() => prop.current)
watchEffect(() =>
  entryValue.value ? emit('set-value', entryValue.value) : emit('set-value', null),
)

const confirmed = ref()

function loadImage(list) {
  if (list === null) {
    entryValue.value = list
    confirm(2)
  } else {
    entryValue.value = list
  }
}

function loadIngredients(list) {
  if (list === null) {
    entryValue.value = list
    confirm(4)
  } else {
    entryValue.value = list
    console.log('Current List Ingredients: ', list)
  }
}
function loadSteps(list, id) {
  if (list === null) {
    entryValue.value = list
    confirm(id)
  } else {
    entryValue.value = list
    console.log('Current List  Steps: ', list)
  }
}
function confirm(id) {
  for (let s of steps.value) {
    if (s.id == id) {
      if (entryValue.value) {
        s.val.value = entryValue.value
        confirmed.value = true
      } else {
        s.val.value = null
        confirmed.value = false
      }
      entryValue.value = null
    }
  }
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
</script>
<template>
  <div class="edit-mode">
    <div
      class="first-layer h100 w100"
      v-for="step in steps"
      :key="step.id"
      :class="step.id == currentSection ? '' : 'none'"
    >
      <div else class="steps" v-if="step.id === currentSection">
        <div class="step">{{ step.step }}</div>
        <div class="centred-wrapper" v-if="step.id === 1">
          <textarea
            name="answer"
            class="main-title"
            v-model="entryValue"
            :class="confirmed ? 'confirmed' : ''"
            :placeholder="step.val.value"
          ></textarea>
        </div>
        <div class="centred-wrapper" v-if="step.id === 2">
          <textarea
            name="answer"
            class="main-description"
            v-model="recDescription"
            :class="confirmed ? 'confirmed' : ''"
            :placeholder="step.val.value.description"
          ></textarea>
          <div class="people-and-duration">
            <div class="people-count">
              <span> Preparation Time ( in minutes )</span
              ><input
                type="number"
                v-model="preparationTime"
                :class="confirmed ? 'confirmed' : ''"
                :placeholder="step.val.value.duration"
              />
            </div>
            <div class="duration-time">
              <span> For How Many People ?</span
              ><input
                type="number"
                v-model="peopleCount"
                :class="confirmed ? 'confirmed' : ''"
                :placeholder="step.val.value.count"
              />
            </div>
          </div>
        </div>
        <div class="centred-wrapper" v-if="step.id === 3">
          <ImagesLoader @load-image="loadImage" :image="steps[2].val.value" :click="klik" />
          <button class="btt" @click="triggerCick">Upload</button>
        </div>
        <div class="centred-wrapper" v-if="step.id === 4">
          <IngredientsItem
            @flled-up="loadIngredients"
            :currentList="steps[3].val.value"
            :confirmed="confirmed"
          />
        </div>
        <div class="centred-wrapper" v-if="step.id === 5">
          <StepsItem @confirm="loadSteps" :currentList="steps[4].val.value" />
        </div>
        <button class="btt" @click="confirm(step.id)" :disabled="!entryValue">Confirm</button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
