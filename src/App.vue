<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <AppHeader v-if="!route.meta.semHeader" />
  <RouterView  >
  </RouterView>
  <AppFooter v-if="!route.meta.semHeader" />
</template>

<style scoped>

</style>
