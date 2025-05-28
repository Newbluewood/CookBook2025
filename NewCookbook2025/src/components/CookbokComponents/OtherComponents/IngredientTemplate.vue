<script setup>
import gsap from 'gsap'
import { useIngredientsStore } from '@/stores/ingredients'
import { ref, computed, watchEffect, onMounted } from 'vue'

onMounted(() => {
  ingredientStore.fetchMeasure(measure.value)
  ingredientStore.fetchIngredient(ingredient.value)
  for (let i = 1; i <= 1000; i = i + 0.25) {
    arrayQuantitysNo.value.push(i)
  }
})

const ingredientStore = useIngredientsStore()

const emit = defineEmits(['ingredient-values', 'completed-status'])
const props = defineProps(['currentList', 'editId'])

const currentList = computed(() => props.currentList)
const editId = computed(() => props.editId)
const editingItemId = ref()

const quantity = ref()
const measure = ref()
const ingredient = ref()

watchEffect(() => {
  editingItemId.value = editId.value
  let item
  if (currentList.value) {
    for (let i of currentList.value) {
      item = i
    }
  }
  quantity.value = editId.value ? item.quantity : null
  measure.value = editId.value ? item.measure : null
  ingredient.value = editId.value ? item.ingredient : null
})

const popupQuantity = ref(false)
const popupMeasure = ref(false)
const popupIngredient = ref(false)

const filledUp = computed(() => {
  if (quantity.value && measure.value && ingredient.value) {
    return true
  } else {
    return false
  }
})

function confirm() {
  if (filledUp.value) {
    emit('ingredient-values', quantity.value, measure.value, ingredient.value)
    emit('completed-status', true)
    quantity.value = null
    measure.value = null
    ingredient.value = null
  }
}

const arrayQuantitysNo = ref([]) // generisana lista brojeva od 1 do 1000 sa korakom 0.25 ( onMounted )

function filterMeasures() {
  ingredientStore.fetchMeasure(measure.value)
}
function filterIngredients() {
  ingredientStore.fetchIngredient(ingredient.value)
}

function popupHandler(type) {
  let pop = '.pop-' + type
  if (type === 'quantity') {
    popupQuantity.value = !popupQuantity.value
  }
  if (type === 'measure') {
    popupMeasure.value = !popupMeasure.value
  }
  if (type === 'ingredient') {
    popupIngredient.value = !popupIngredient.value
  }
  // animations GSAP
  if (!popupQuantity.value || !popupMeasure.value || !popupIngredient.value) {
    gsap.from(pop, {
      opacity: 0,
      duration: 1,
      ease: 'ease',
    })
  } else {
    gsap.from(pop, {
      opacity: 0,
      duration: 1,
      ease: 'ease',
    })
  }
}
</script>
<template>
  <div class="main-wrapper flex">
    <!-- Panel selection -->
    <div class="flex column w100 fl1 left-side">
      <div class="entries flex">
        <!-- quantity -->
        <div class="quantity-wrapper">
          <h3 class="headings">Quantity</h3>
          <div class="field" @click="popupHandler('quantity')">Quantity</div>
          <div class="search-wrapper">
            <div class="inputs"><input type="text" v-model="quantity" /></div>
            <!-- search -->
            <div class="search-list pop-quantity" :class="popupQuantity ? 'popup' : ''">
              <div
                class="titles"
                v-for="(n, index) in arrayQuantitysNo"
                :key="index"
                @click="((quantity = n), (popupQuantity = false))"
              >
                {{ n }}
              </div>
            </div>
          </div>
        </div>
        <!-- measures -->
        <div class="measures-wrapper">
          <h3 class="headings">Measures</h3>
          <div class="field" @click="popupHandler('measure')">Measures</div>
          <div class="search-wrapper">
            <div class="inputs">
              <input type="text" v-model="measure" @input="filterMeasures" />
            </div>
            <!-- search -->
            <div class="search-list pop-measure" :class="popupMeasure ? 'popup' : ''">
              <div
                class="titles"
                v-for="mea in ingredientStore.Measures"
                :key="mea.idM"
                @click="((measure = mea.mTitle), (popupMeasure = false))"
              >
                {{ mea.mTitle }}
              </div>
            </div>
          </div>
        </div>
        <!-- ingredients -->
        <div class="ingedients-wrapper">
          <h3 class="headings">Ingredients</h3>
          <div class="field" @click="popupHandler('ingredient')">Ingredients</div>
          <div class="search-wrapper">
            <div class="inputs">
              <input type="text" v-model="ingredient" @input="filterIngredients" />
            </div>
            <!-- search -->
            <div class="search-list pop-ingredient" :class="popupIngredient ? 'popup' : ''">
              <div
                class="titles"
                v-for="ing in ingredientStore.Ingredients"
                :key="ing.idIng"
                @click="((ingredient = ing.ingTitle), (popupIngredient = false))"
              >
                {{ ing.ingTitle }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <button :disabled="!filledUp" @click="confirm()">
        {{ editingItemId ? 'Confirm Changes' : 'Add Ingredient to list' }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.recIngredient {
  width: 100%;
  height: fit-content;
  justify-content: space-between;
}
.recIngredient.editingMode {
  background-color: rgba(229, 243, 243, 0.09);
  border: 1px solid rgba(0, 255, 255, 0.226);
  padding: 0px 10px;
}
.recIngredient:nth-child(odd) {
  background-color: rgba(240, 248, 255, 0.065);
}
.ings-flex {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.ing {
  font-size: 20px;
  color: aliceblue;
  flex: 3;
}
.spec {
  flex: 2;
  flex-direction: column;
}
.but {
  flex: 1;
}
.qua {
  color: rgb(185, 104, 49);
  font-size: 18px;
}
.mes {
  font-family: 'Candara';
}
.quant.pop {
  display: block;
}
.popup {
  position: absolute;
  top: 5vh;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.825);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-wrapper {
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 10px;
}
input {
  font-family: 'Comic Sans ms';
  font-size: 18px;
  text-align: center;
  border: none;
  background-color: rgba(240, 248, 255, 0.181);
}
.measures-wrapper,
.ingedients-wrapper,
.quantity-wrapper {
  width: 100%;
  height: 100%;
}
.search-wrapper {
  height: 100%;
  width: 100%;
  margin-right: 3px;
}
.inputs input {
  width: 100%;
  height: fit-content;
  border-left: 1px solid rgb(62, 62, 62);
}
.search-list {
  display: none;
}
.search-list.popup {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  padding-left: 10px;
  margin-top: 8px;
}
.entries {
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: center;
}
.selections {
  justify-content: start;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.field {
  width: fit-content;
  min-height: fit-content;
  padding: 2px 5px;
  margin-top: 2px;
  border: 1px solid rgb(178, 178, 178);
  background-color: rgba(91, 90, 90, 0.282);
  cursor: pointer;
  place-self: center;
  margin-bottom: 10px;
}
.titles {
  width: 100%;
  font-size: 20px;
  text-align: center;
}
.titles:hover {
  color: rgb(246, 235, 228);
  cursor: pointer;
}
.titles:nth-child(odd) {
  background-color: rgba(240, 248, 255, 0.055);
}

.headings {
  display: none;
}
.flex {
  display: flex;
}
.wrap {
  flex-wrap: wrap;
}
.fl1 {
  flex: 2;
}
.column {
  flex-direction: column;
}
.jst-center {
  justify-content: center;
}
.alg-center {
  align-items: center;
}
.end {
  place-self: end;
}
.w100 {
  width: 100%;
}
.w90 {
  width: 90%;
}
.h100 {
  height: 100%;
}
.h90 {
  height: 90%;
}
.border {
  border: 1px solid black;
}
.background {
  background-color: rgba(240, 248, 255, 0.151);
}
.b-rad10 {
  border-radius: 10px;
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
.fixed {
  position: fixed;
}
.actions {
  border: 1px solid darkolivegreen;
  padding: 0 5px;
  margin: 5px;
}
.actions:hover {
  background-color: rgba(240, 248, 255, 0.206);
}
.selections::-webkit-scrollbar {
  display: none;
}
@media (min-width: 790px) {
  .main-wrapper {
    flex-direction: row;
    width: 90%;
  }
  .search-wrapper {
    height: 100%;
    width: 100%;
    margin-right: 3px;
  }
  .search-list {
    display: inline-block;
    height: 100%;
    width: 100%;
    overflow: scroll;
    padding-left: 10px;
    margin-top: 8px;
  }

  .selections {
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: start;
    flex: 1;
    overflow-y: scroll;
  }
  .selections::-webkit-scrollbar {
    display: none;
  }
  .popup.search-wrapper {
    width: 50%;
  }
  .headings {
    display: inline-block;
  }
  .lists {
    width: 100%;
    padding-left: 20px;
  }
  .left-side {
    border-radius: 10px;
  }
  .recIngredient {
    width: 100%;
    padding-left: 10px;
  }
  .field {
    display: none;
  }
  input {
    display: inline-block;
  }
  .pl {
    display: none;
  }
  .ing {
    font-size: 17px;
    color: aliceblue;
    flex: 1;
  }
  .spec {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 2;
  }
  .but {
    flex: 1;
  }
}
</style>
