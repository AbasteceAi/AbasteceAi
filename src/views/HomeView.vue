<script setup>
import AppBanner from '../components/AppBanner.vue'
import AppCardsInicio from '../components/AppCardsInicio.vue'
import AppMapaHome from '../components/AppMapaHome.vue'
import AppMenu from '../components/AppMenu.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <AppBanner />
    <AppCardsInicio />
    <AppMapaHome />
    <AppMenu />
  </main>
</template>
