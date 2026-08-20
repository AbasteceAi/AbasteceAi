<script setup>
import { ref, onMounted } from 'vue'
import { buscarFavoritos } from '@/services/favoritos'
import PostoIndi from '@/components/Posto.vue'

const favoritos = ref([])
const carregando = ref(true)

onMounted(async () => {
  favoritos.value = await buscarFavoritos()
  carregando.value = false
})
</script>

<template>
  <div>
    <h2>Meus Postos Favoritos</h2>
    <div v-if="carregando">Carregando...</div>
    <div v-else-if="favoritos.length === 0">Você ainda não favoritou nenhum posto.</div>
    <div v-else>
      <PostoIndi v-for="posto in favoritos" :key="posto.id" :posto="posto" />
    </div>
  </div>
</template>