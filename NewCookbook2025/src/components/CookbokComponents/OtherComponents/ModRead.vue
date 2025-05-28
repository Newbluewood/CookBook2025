<script setup>
import { computed } from 'vue'
const prop = defineProps(['segments', 'current'])
const segments = computed(() => prop.segments)

const currentSection = computed(() => prop.current)
</script>
<template>
  <div
    class="first-layer h100 w100"
    v-for="segment in segments"
    :key="segment.id"
    :class="segment.id == currentSection ? '' : 'none'"
  >
    <div else class="Ingredients" v-if="segment.id === currentSection">
      <div class="centred-wrapper Ingredients" v-if="segment.id === 4">
        <div class="recIngredient flex gap10 start" v-for="Ing in segment.val.value" :key="Ing.idN">
          <div>{{ Ing.idN }}. /</div>
          <div class="ing">{{ Ing.ingredient }}</div>
          -
          <div class="flex gap10 spec">
            <div class="qua">{{ Ing.quantity }}</div>
            <div class="mes">{{ Ing.measure }}</div>
            /
          </div>
        </div>
      </div>

      <div class="centred-wrapper Steps" v-if="segment.id === 5">
        <div class="prep-segments" v-for="step in segment.val.value" :key="step.id">
          <div>{{ step.name }}</div>
          <div class="prev-segments">
            <div class="title-desc-wrapper">
              <div class="title">{{ step.title }}</div>
              <div class="description">
                {{ step.description }}
              </div>
            </div>
            <div class="image-segment-wrapper" v-if="step.image">
              <img :src="step.image" :alt="step.title" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.centred-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.first-layer {
  position: absolute;
  left: 0;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  padding-bottom: 30px;
}
.first-layer::-webkit-scrollbar {
  display: none;
}
.Main-Image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-items: center;
}
.recIngredient {
  font-size: 18px;
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
.prep-segments {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
}
.prev-segments {
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
.image-segment-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  overflow: hidden;
}
img {
  width: 90%;
  height: auto;
}
.title-desc-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 10px;
  flex: 3;
}
.title {
  font-size: 22px;
  flex: 1;
  background-color: rgba(40, 40, 40, 0.286);
}
.description {
  flex: 3;
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
  .prev-segments {
    flex-direction: row;
  }
  .image-step-wrapper {
    flex: 1;
  }
  .image-segment-wrapper {
    flex: 1;
  }
}
</style>
