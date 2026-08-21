<script setup>
import {ref, onMounted} from 'vue'
import { buscarPostos, obterLoc, ordenarPorDistancia } from '@/services/postos';
import PostoSide from './PostoSide.vue';
import LMap from './LMap.vue';
import FiltroCombustivel from './FiltroCombustivel.vue';

const postos = ref([])
const carregando = ref(true)
const combustivelSelecionado = ref('gasolina comum')
const postoSel = ref(null)

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
    <div class="text">
<h1>Postos de Joinville</h1>
<FiltroCombustivel v-model="combustivelSelecionado" />
</div>
<div class="grid">
    <section class="side">
      <div v-if="carregando" > Carregando Postos ...</div>
      <div v-else>

    <PostoSide v-for="posto in postos"
      :key="posto.id"
      :posto="posto"
      :combustivel-sel="combustivelSelecionado"
      @clique="postoSel = $event"
      />
      </div>
</section>
<section>
 <LMap :postos="postos" :combustivel-sel="combustivelSelecionado" :posto-sel="postoSel"/>
</section>
</div>
      </main>
</template>
<style scoped>
main{
    height: 100%;
    background-color: #0A1D58;
    
}
   .grid {
    display: grid;
    grid-template-columns: 600px 1fr;
    padding: 50px;
    gap: 30px;
    }
    .side{
  background-color: #334582;
  width: 98%;
  height: 95vh;
  margin: 5px;
  border-radius: 20px;
  scrollbar-color: #002492 #FEC12B;
  overflow-y: auto;
  padding: 10px;
    }
  .text {
    color: #FFF;
    font-size: 1.8rem;
    padding: 60px 60px 0 60px;
  }

</style>
