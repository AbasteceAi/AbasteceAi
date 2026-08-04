<script setup>
import {ref, onMounted} from 'vue'
import { buscarPostos, obterLoc, ordenarPorDistancia } from '@/services/postos';
import PostoSide from './PostoSide.vue';
import LMap from './LMap.vue';
const postos = ref([])
const carregando = ref(true)

async function carregar() {
  const dados = await buscarPostos()

  try {
    const { lat, lng } = await obterLoc()
     postos.value = ordenarPorDistancia(dados, lat, lng) 
  } catch {
   
    postos.value = dados
  }

  carregando.value = false
}

onMounted(carregar)
</script>
<template>
    <main>
    <section>
      <div v-if="carregando" > Carregando Postos ...</div>
      <div v-else>

    <PostoSide v-for="posto in postos"
      :key="posto.id"
      :posto="posto"/>
      </div>
</section>
<section>
 <LMap/>
</section>
      </main>
</template>
<style scoped>
    main {
       display: grid;
       grid-template-columns: repeat(2,1fr);
    }
</style>