<script setup>
import gsap from 'gsap'
import { ref, watchEffect, computed, onMounted } from 'vue'
import { useRecipeCreateStore } from '@/stores/recipeCreate'
import ModEdit from './ModEdit.vue'
import ModRead from './ModRead.vue'

const recipeCreateStore = useRecipeCreateStore()

onMounted(() => {})
const data = computed(() =>
  recipeCreateStore.responseData ? recipeCreateStore.returnData() : null,
)

console.log('Dohvatam trenutni rec ID: ', recipeCreateStore.getRecID())

//import { useRecipeStore } from '@/stores/recipe';
//const recipeStore = useRecipeStore()
//const filledIngredient = computed(()=> recipeStore.ingredientCompleted)
//const ingredientsList = ref([])

const layer1 = ref(false)
const layer2 = ref(true)

const entryValue = ref()
const confirmed = ref(false)

const peopleCount = ref()
const preparationTime = ref()
const recDescription = ref()
const mainDescription = {
  description: recDescription.value,
  duration: preparationTime.value,
  count: peopleCount.value,
}

//const sections = [{id:1, name:"Section One"}, {id:2, name:"Section Two"}, {id:1, name:"Section Tree"}, ] // ako ne treba duze vreme - OBRISATI
const q = [
  {
    id: 1,
    question: ' Give a nice Title to Your New Recipe :) !',
    name: 'Main-Title',
    val: ref(),
  },
  {
    id: 2,
    question: ' Great! Tell us something About the Recipe ?',
    name: 'Main-Description',
    val: ref({
      description: null,
      duration: null,
      count: null,
    }),
  },
  {
    id: 3,
    question: ' Yummy ! Place some sweet picture for this Recipe?',
    name: 'Main-Image',
    val: ref(),
  },
  {
    id: 4,
    question: ' Ok! This is important part... Ingedients !!!',
    name: 'Ingredients',
    val: ref(),
  },
  {
    id: 5,
    question: " Let's describe preparation steps... add some Photos :) ! ",
    name: 'Preparation Steps',
    val: ref(),
  },
]

watchEffect(() => {
  entryValue.value = mainDescription
  mainDescription.description = data.value ? data.value.recipeMainDescription : null
  mainDescription.duration = data.value ? data.value.recipePreparationDuration : null
  mainDescription.peopleCount = data.value ? data.value.recipePeopleCount : null
  q[0].val.value = data.value ? data.value.recipeMainTitle : null
  q[1].val.value = data.value ? mainDescription : null
  q[2].val.value = data.value ? data.value.recipeMainImage.image : null
  q[3].val.value = data.value ? data.value.recipeIngredients : null
  q[4].val.value = data.value ? data.value.recipePreparationSteps : null
})

const questions = computed(() => q)

const tabsForRead = computed(() =>
  questions.value.filter(
    (item) => item.name === 'Ingredients' || item.name === 'Preparation Steps',
  ),
)

const currentSection = ref(1)

function slideIn() {
  layer1.value = false
  layer2.value = true
  shrinks()
  gsap.from('.sliders', {
    opacity: 0,
    /*x:-1000,
    duration:0.6,*/
    ease: 'ease.in',
  })
}
function slideOut() {
  layer1.value = false
  layer2.value = true
  shrinks()
  gsap.from('.sliders', {
    opacity: 0,
    /*x:1000,
    duration:0.6,*/
    ease: 'ease.in',
  })
}

function shrinks() {
  if (layer1.value) {
    gsap.to('.first-layer', {
      width: '0%',
      opacity: 0,
      duration: 0.5,
    })
    gsap.to('.secound-layer', {
      width: '100%',
      opacity: 1,
      /* duration:0.7,*/
    })
    gsap.to('.questions.value', {
      x: -1000,
      width: 0,
      opacity: 0,
      duration: 1,
    })
  } else {
    gsap.to('.first-layer', {
      width: '100%',
      opacity: 1,
      /*duration:0.5,*/
    })
    gsap.to('.secound-layer', {
      width: 0,
      opacity: 0,
      /* duration:0.5,*/
    })
    gsap.to('.questions.value', {
      x: 0,
      width: '100%',
      opacity: 1,
      /* duration:0.5,*/
    })
  }
  toogleLayers()
}

function toogleLayers() {
  layer1.value = !layer1.value
  layer2.value = !layer2.value
}

function next() {
  if (currentSection.value < questions.value.length) {
    slideIn()
    currentSection.value += 1
    confirmed.value = false
    entryValue.value = null
  }
}
function previous() {
  if (currentSection.value > 1) {
    slideOut()
    currentSection.value -= 1
    confirmed.value = false
    entryValue.value = null
  }
}
function goTo(id) {
  if (currentSection.value > id) {
    previous()
    currentSection.value = id
  } else if (currentSection.value < id) {
    next()
    currentSection.value = id
  }
}
function isolateView(viewNo) {
  shrinks()
  goTo(viewNo)
}

function setEntryValue(value) {
  entryValue.value = value
}

const editujemo = computed(() => (data.value ? false : false))
const citamo = computed(() => !editujemo.value)
</script>

<template>
  <div class="centred-wrapper px700h background relative" v-if="data">
    <div class="controls absolute">
      <div class="slides-control">
        <button class="btt" @click.prevent="next" :disabled="currentSection == questions.length">
          Next
        </button>
        <button class="btt" @click.prevent="previous" :disabled="currentSection == 1">
          Previous
        </button>
      </div>
    </div>
    <div class="steps flex absolute top30 gap10 w100 centred">
      <div class="step field" v-for="step in tabsForRead" :key="step.id">
        <div
          @click="goTo(step.id)"
          :class="{ confirmed: step.val.value, 'active-tab': currentSection === step.id }"
        >
          {{ step.name }}
        </div>
      </div>
    </div>
    <button class="btt" @click="shrinks">{{ layer1 ? 'Check' : 'Close' }}</button>
    <div class="h70 w100 background relative sliders tutor-wrapper">
      <!-- first layer -->
      <div class="test-wrapper" v-if="editujemo">
        <ModEdit
          :segments="questions"
          :current="currentSection"
          @set-value="setEntryValue"
          @confirm-entries="confirmed"
        />
      </div>
      <div class="test-wrapper" v-if="citamo">
        <ModRead :segments="tabsForRead" :current="currentSection" />
      </div>

      <!-- secound layer -->
      <div class="secound-layer h100">
        <div v-if="layer2">
          <div class="centred-wrapper">
            <div @click="isolateView(1)">
              <div class="recipe-title headings1">{{ questions[0].val.value }}</div>
            </div>
            <div @click="isolateView(2)">
              <div class="recipe-description headings2">
                {{ questions[1].val.value.description }}
              </div>
            </div>
            <div @click="isolateView(3)">
              <div class="prevImg background margin10 relative">
                <img
                  :src="questions[2].val.value"
                  :alt="questions[2].name"
                  v-if="questions[2].val.value"
                />
                <div class="prep-spec background-marker">
                  <div class="pepole-count">
                    <span>For:</span> {{ questions[1].val.value.count }}
                    <span>{{
                      questions[1].val.value.count <= 2 ? ' consumer' : ' consumers'
                    }}</span>
                  </div>
                  <div class="preparation-time">
                    <span>Preparation Time:</span> {{ questions[1].val.value.duration }}
                    <span>{{ ' min' }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div @click="isolateView(4)">
              <div class="padding10">
                <div
                  class="recIngredient flex gap10 start"
                  v-for="recIng in questions[3].val.value"
                  :key="recIng.idN"
                >
                  <div>{{ recIng.idN }}. /</div>
                  <div class="ing">{{ recIng.ingredient }}</div>
                  -
                  <div class="flex gap10 spec">
                    <div class="qua">{{ recIng.quantity }}</div>
                    <div class="mes">{{ recIng.measure }}</div>
                    /
                  </div>
                </div>
              </div>
            </div>
            <div
              class="prep-steps"
              v-for="step in questions[4].val.value"
              :key="step.id"
              @click="isolateView(5)"
            >
              <div v-if="!questions[4].val.value">{{ questions[4].name }}:</div>
              <div v-else class="prev-steps">
                <div class="title-desc-wrapper">
                  <div class="title">{{ step.title }}</div>
                  <div class="description">
                    {{ step.description }}
                  </div>
                </div>
                <div class="image-step-wrapper" v-if="step.image">
                  <img :src="step.image" :alt="step.title" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--<button class="absolute btt" @click="shrinks">{{ layer1 ? 'Check' : 'Close' }}</button>-->
    </div>
  </div>
</template>

<style scoped>
.active-tab {
  color: rgb(0, 255, 115);
}
.title,
.description {
  width: 100%;
  height: 100%;
  background-color: rgba(240, 248, 255, 0.136);
  white-space: pre-wrap;
  font-size: 18px;
  padding: 10px;
}
.title {
  font-size: 22px;
  flex: 1;
  background-color: rgba(40, 40, 40, 0.286);
}
.description {
  flex: 3;
}
.title-desc-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 3;
}
.steps {
  width: 100%;
}
.prep-steps {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.prev-steps {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: rgba(240, 248, 255, 0.119);
  padding: 10px;
}
.image-step-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  overflow: hidden;
}
.b0r0 {
  bottom: 0;
  right: 0;
}
.prep-spec {
  position: absolute;
  bottom: 0;
  right: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  height: fit-content;
  padding: 5px;
}
.prep-spec > div {
  font-size: 18px;
  font-weight: bold;
  color: rgb(162, 16, 16);
}
.prep-spec > div > span {
  font-family: 'Comic Sans ms';
  color: rgb(0, 0, 0);
}
.background-marker {
  background-color: rgba(240, 248, 255, 0.577);
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
.main-title {
  font-size: 24px;
  color: black;
  z-index: 999;
  text-align: center;
}
.main-description {
  width: 90%;
  height: 100%;
  font-size: 24px;
  color: black;
  z-index: 999;
  text-align: center;
}
.people-and-duration {
  width: 90%;
  height: 100%;
  font-size: 24px;
  color: rgb(164, 164, 164);
  z-index: 999;
  text-align: center;
  margin-top: 20px;
}
.people-and-duration > div {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Comic Sans ms';
  font-size: 20px;
}
.people-and-duration > div > input {
  width: 17%;
  align-self: center;
  font-size: 20px;
  text-align: center;
}
.recipe-title {
  font-size: 28px;
  color: rgb(186, 185, 183);
}
.recipe-description {
  text-align: center;
  font-size: 20px;
  font-family: 'Candara Light';
  color: rgba(244, 255, 179, 0.546);
}
.headings1 {
  text-align: center;
}
.tutor-wrapper {
  overflow: hidden;
}
.first-layer {
  position: absolute;
  left: 0;
  background-color: rgba(127, 194, 127, 0.109);
}
.secound-layer {
  position: absolute;
  right: 0;
  /* background-color: rgba(123, 168, 109, 0.437);*/
  overflow-y: scroll;
  padding-bottom: 30px;
}
.secound-layer::-webkit-scrollbar {
  display: none;
}
.ing {
  color: rgb(205, 210, 201);
}
.qua {
  color: rgba(190, 141, 128, 0.745);
}
.mes {
  font-family: 'Candara Light';
  font-size: 14px;
}
.recIngredient {
  font-size: 18px;
}
.slides-control {
  z-index: 20;
}
.questions.value {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
.question {
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-family: 'Comic Sans ms';
  margin: 30px auto 30px;
}
button {
  cursor: pointer;
  margin: 5px 3px;
}
button:hover {
  background-color: azure;
}
button.disabled {
  background-color: rgba(240, 248, 255, 0.166);
}
input,
textarea {
  background-color: rgba(239, 239, 239, 0.233);
  border: 1px solid rgb(124, 125, 121);
}
.centred-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  overflow: hidden;
  margin-bottom: 20px;
}
.prevImg {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  max-width: 80vw;
  overflow: hidden;
  border-radius: 10px;
  background-color: rgba(240, 248, 255, 0.119);
}
img {
  width: 90%;
  height: auto;
}
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.centred {
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.top {
  top: 0;
}
.top30 {
  top: 30px;
}
.h70 {
  height: 70%;
}
.h100 {
  height: 100%;
}
.w100 {
  width: 100%;
}
.w90 {
  width: 90%;
}
.px700h {
  height: 700px;
}
.padding10 {
  padding: 10px;
}
.margin10 {
  margin: 10px;
}
.start {
  align-items: start;
}
.gap10 {
  gap: 10px;
}
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.none {
  display: none;
}
.confirmed {
  border: 1px solid rgb(32, 121, 32);
  background-color: rgba(148, 184, 172, 0.487);
}
.controls {
  top: 0;
  left: 0;
}
.field {
  width: fit-content;
  min-height: fit-content;
  padding: 0 2px;
  margin-top: 2px;
  border: 1px solid darkolivegreen;
  cursor: pointer;
}
.field:hover {
  background-color: rgba(240, 248, 255, 0.171);
}
.displ {
  flex-direction: column;
}
@media (min-width: 790px) {
  .question {
    width: 100%;
    text-align: center;
    font-size: 34px;
    font-family: 'Comic Sans ms';
    margin: 60px auto 20px;
  }
  .displ {
    display: flex;
  }
  .description {
    font-size: 18px;
  }
  .prev-steps {
    flex-direction: row;
  }
  .image-step-wrapper {
    flex: 1;
  }
}
</style>
