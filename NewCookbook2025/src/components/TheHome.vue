<script setup>
import HomeItem from './HomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  gsap.from('.tmpl', {
    x: -200,
    scale: 0,
    opacity: 0,
    stagger: 0.1,
    delay: 1.3,
    ease: 'sean',
  })
  gsap.to('.tmpl', {
    opacity: 1,
  })
})

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <HomeItem class="tmpl">
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Documentation</template>

    Docs
  </HomeItem>

  <HomeItem class="tmpl">
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    Tools
    <br />

    More instructions are available in
    <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a
    >.
  </HomeItem>

  <HomeItem class="tmpl">
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Ecosystem
  </HomeItem>

  <HomeItem class="tmpl">
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck?
  </HomeItem>

  <HomeItem class="tmpl">
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support</template>

    <a href="/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </HomeItem>
</template>
