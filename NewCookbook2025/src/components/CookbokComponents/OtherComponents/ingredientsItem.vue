<script setup>
//import { useRecipeStore } from '@/stores/recipe';
import IngredientTemplate from './IngredientTemplate.vue'
import { ref, /*reactive,*/ computed } from 'vue'

//const recipeStore = useRecipeStore()
//const currentList = computed(() => recipeCreateStore.recipeIngredients)

const emit = defineEmits(['flled-up'])
const props = defineProps(['currentList', 'confirmed'])

const editMode = ref(false)
const editingItemId = ref()

const ingredientTemplate = ref({ idN: null, quantity: null, measure: null, ingredient: null })
const ingredientIdN = ref(0)

const currentList = computed(() => (props.currentList ? props.currentList : null))
const recipeIngredients = ref([])
const addedIngredientsList = computed(() => {
  if (recipeIngredients.value.length > 0) {
    emit('flled-up', recipeIngredients.value)
  }
  return recipeIngredients.value
})

const filledUp = computed((quantity, measure, ingredient) => {
  if (quantity && measure && ingredient) {
    return true
  } else {
    return false
  }
})

function fillIngredientForm(quantity, measure, ingredient) {
  if (editMode.value) {
    let item
    for (let i of currentList.value) {
      if (i.idN === editingItemId.value) {
        item = i
      }
    }

    item.quantity = quantity
    item.measure = measure
    item.ingredient = ingredient

    editingItemId.value = null
    editMode.value = false
  } else {
    ingredientIdN.value = ingredientIdN.value + 1
    ingredientTemplate.value.idN = ingredientIdN.value
    ingredientTemplate.value.quantity = quantity
    ingredientTemplate.value.measure = measure
    ingredientTemplate.value.ingredient = ingredient

    recipeIngredients.value.push(ingredientTemplate.value)

    ingredientTemplate.value = { idN: null, quantity: null, measure: null, ingredient: null }
  }
}

function editIng(idN) {
  if (editingItemId.value && editingItemId.value === idN) {
    editMode.value = false
    editingItemId.value = null
  } else {
    editMode.value = true
    editingItemId.value = idN
  }
}

function deleteIngredient(id) {
  let no = 0
  for (let i of recipeIngredients.value) {
    if (i.idN === id) {
      recipeIngredients.value.splice(no, 1)
    }
    if (recipeIngredients.value.length > 0 && no < recipeIngredients.value.length) {
      recipeIngredients.value[no].idN = no + 1
      no++
    }
    ingredientIdN.value = no
  }
  if (recipeIngredients.value.length === 0) {
    emit('flled-up', null)
  }
}
</script>
<template>
  <div class="main-wrapper flex">
    <IngredientTemplate
      @ingredient-values="fillIngredientForm"
      @completed-status="filledUp"
      :currentList="currentList"
      :editId="editingItemId"
    />
    <div class="selections flex column w100">
      <div v-if="currentList" class="lists">
        <div
          class="recIngredient ings-flex alg-center wrap"
          v-for="recIng in currentList"
          :key="recIng.idN"
          @click="editIng(recIng.idN)"
          :class="editingItemId == recIng.idN && editMode ? 'editingMode' : ''"
        >
          <div>{{ recIng.idN }}.</div>
          <div class="ing">{{ recIng.ingredient }}</div>
          <div class="flex alg-center gap10 spec">
            <div class="qua">{{ recIng.quantity }}</div>
            <div class="mes">{{ recIng.measure }}</div>
          </div>
          <div class="flex but">
            <div class="actions" v-if="editingItemId == recIng.idN && editMode">Cancel</div>
            <div @click.stop="deleteIngredient(recIng.idN)" v-if="!editMode" class="actions end">
              X
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="recIngredient ings-flex alg-center wrap"
          v-for="recIng in addedIngredientsList"
          :key="recIng.idN"
        >
          <div>{{ recIng.idN }}.</div>
          <div class="ing">{{ recIng.ingredient }}</div>
          <div class="flex alg-center gap10 spec">
            <div class="qua">{{ recIng.quantity }}</div>
            <div class="mes">{{ recIng.measure }}</div>
          </div>
          <div class="flex but">
            <div @click.stop="deleteIngredient(recIng.idN)" v-if="!editMode" class="actions end">
              X
            </div>
          </div>
        </div>
      </div>
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
input,
.pl {
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
}
.search-list {
  display: none;
}
.search-list.popup {
  display: flex;
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  scrollbar-width: thin;
  padding-left: 10px;
  margin-top: 8px;
}
.entries {
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: center;
  flex: 3;
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
    overflow-x: scroll;
    padding-left: 10px;
    margin-top: 8px;
  }
  .search-list::-webkit-scrollbar {
    width: 5px;
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
