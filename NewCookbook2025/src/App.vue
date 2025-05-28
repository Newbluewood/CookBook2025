<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloMessage from './components/HelloMessage.vue'
//import SearchBar from './components/CookbokComponents/TemplateComponents/SearchBar.vue'

import { ref, onMounted } from 'vue'
import { useRecipesStore } from './stores/recipes'
import gsap from 'gsap'

onMounted(() => {
  const recStore = useRecipesStore()
  recStore.fetchAllRecipes()
})

const username = 'You'

const prev = ref(false)
function toogleView() {
  prev.value = !prev.value
  const app = document.getElementById('app')
  if (prev.value) {
    app.classList.add('prev')
    gsap.from('header', {
      y: -300,
      opacity: 0,
      stagger: 1,
      ease: 'sine',
    })
    gsap.to('header', {
      opacity: 1,
      stagger: 1,
      delay: 1,
      ease: 'ease',
    })
    gsap.from('main', {
      opacity: 0,
      stagger: 0.8,
      delay: 0.3,
      ease: 'sine',
    })
  } else {
    app.classList.remove('prev')
    gsap.from('header', {
      x: -300,
      opacity: 0,
      stagger: 1,
      ease: 'sine',
    })
    gsap.to('header', {
      opacity: 1,
      stagger: 1,
      delay: 1,
      ease: 'ease',
    })
    gsap.from('main', {
      opacity: 0,
      stagger: 0.8,
      delay: 0.4,
      ease: 'sine',
    })
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <img alt="Vue logo" class="logo" src="/cookbook.png" width="60" height="60" />
      <HelloMessage :msg="'Hello ' + username" />
      <!--<SearchBar />-->

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/recipes">Recipes</RouterLink>
        <RouterLink to="/dish">Dish</RouterLink>
      </nav>
    </div>
    <div class="ad-place">
      <div class="ads">
        <iframe
          width="320"
          height="180"
          src="https://www.youtube.com/embed/jxxF7Vzqpx4"
          title="Avicii, Dua Lipa, Coldplay, Martin Garrix &amp; Kygo, The Chainsmokers Style - Summer Vibes #38"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </header>

  <main>
    <button class="tgl-view" @click="toogleView">Toogle View</button>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  /*position: sticky;
  top: 0;
  z-index: 2;*/

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  /*background-color: var(--color-background);*/

  line-height: 1.5;
  max-height: 100vh;
}

main {
  max-height: 100vh;
  overflow-y: scroll;
}
main::-webkit-scrollbar {
  display: none;
}

.logo {
  position: absolute;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  cursor: default;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  margin-bottom: 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.tgl-view {
  display: none;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ad-place {
  display: none;
}

@media (min-width: 1024px) {
  header {
    padding-right: calc(var(--section-gap) / 2);
    margin-right: 2rem;
  }

  .ad-place {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.034);
    flex: 2;
    width: 100%;
    height: 100%;
    flex: 2;
  }
  .ad {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  main {
    padding: 0 2rem;
  }

  .logo {
    margin: 0 1rem 0 0;
    left: 180px;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex: 1;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
  .tgl-view {
    display: inline-block;
    background-color: transparent;
    border: 1px solid rgb(80, 79, 79);
    color: rgb(80, 173, 142);
    margin-bottom: 10px;
  }
}
@media (min-width: 850px) and (max-width: 950px) {
  main {
    height: fit-content;
    overflow-y: none;
  }
  header .wrapper {
    position: sticky;
    top: 0;
    z-index: 2;
  }
}
</style>
