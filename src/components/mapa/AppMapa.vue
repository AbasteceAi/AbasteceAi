<script setup>
import {ref, onMounted, computed} from 'vue'
import { buscarPostos, obterLoc, ordenarPorDistancia } from '@/services/postos';
import PostoSide from './PostoSide.vue';
import LMap from './LMap.vue';
import FiltroCombustivel from './FiltroCombustivel.vue';
import FiltroNome from './FiltroNome.vue';
const postos = ref([])
const carregando = ref(true)
const combustivelSelecionado = ref('')
const postoSel = ref(null)
const buscaNome = ref('')

const postosFiltrados = computed(() => {
  let resultado = postos.value;
  if( buscaNome.value.trim()){
    const termo = buscaNome.value.toLowerCase()
    resultado = resultado.filter(p => p.nome.toLowerCase().includes(termo))
  }
  if (combustivelSelecionado.value) {
  resultado = resultado.filter(p =>
    p.precos?.some(preco => preco.tipo_combustivel.toLowerCase() === combustivelSelecionado.value.toLowerCase()))
  }

  return resultado
})

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

</div>
<div class="grid">
    <section class="side">
<div class="filtros">
<FiltroNome v-model="buscaNome"/>
<FiltroCombustivel v-model="combustivelSelecionado" class="filtroComb"/>
</div>
      <div v-if="carregando" > Carregando Postos ...</div>
      <div v-else-if="postosFiltrados.length === 0"> Posto não encontrado</div>
      <div v-else>

    <PostoSide v-for="posto in postosFiltrados"
      :key="posto.id"
      :posto="posto"
      :combustivel-sel="combustivelSelecionado"
      @clique="postoSel = $event"
      />
      </div>
</section>
<section>
 <LMap :postos="postosFiltrados" :combustivel-sel="combustivelSelecionado" :posto-sel="postoSel"/>
</section>
</div>
      </main>
</template>
<style scoped>
main{
   height: 100%;
      background-color: #002492;
}
   .grid {
    display: grid;
    grid-template-columns: 600px 1fr;

    }
    .side{
  background-color: #334582;
  width: 98%; /* ajusta pra proporção que você quiser */
  height: 95vh;
  margin: 5px;
  border-radius: 20px;
  scrollbar-color: #002492 #FEC12B;
  overflow-y: auto;
    }
  .text {
    color: #FFF;
    font-size: 1.8rem;
    padding: 10px;
  }
.filtros {
  display: flex;
  gap: 15px;
  align-items: center;
  margin: 5px;
  
}
</style>
