<script setup>
import {ref, onMounted, computed} from 'vue'
import { buscarPostos, obterLoc, ordenarPorDistancia, extrairBairro } from '@/services/postos';import PostoSide from './PostoSide.vue';
import LMap from './LMap.vue';
import FiltroCombustivel from './FiltroCombustivel.vue';
import FiltroNome from './FiltroNome.vue';
const postos = ref([])
const carregando = ref(true)
const combustivelSelecionado = ref('')
const postoSel = ref(null)
const buscaNome = ref('')

const bairroSelecionado = ref('')
const bairros = computed(() => {
  const lista = postos.value.map(p => extrairBairro(p.endereco)).filter(Boolean)
  return [...new Set(lista)].sort()
})
const postosFiltrados = computed(() => {
  let resultado = postos.value;
  if (buscaNome.value.trim()) {
    const termo = buscaNome.value.toLowerCase()
    resultado = resultado.filter(p => p.nome.toLowerCase().includes(termo))
  }
  if (combustivelSelecionado.value) {
    resultado = resultado.filter(p =>
      p.precos?.some(preco => preco.tipo_combustivel.toLowerCase() === combustivelSelecionado.value.toLowerCase()))
  }
  if (bairroSelecionado.value) {
    resultado = resultado.filter(p => extrairBairro(p.endereco) === bairroSelecionado.value)
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
  <FiltroNome v-model="buscaNome" class="nomeF"/>
  <FiltroCombustivel v-model="combustivelSelecionado" class="filtroComb"/>
  <select v-model="bairroSelecionado" class="filtroBairro">
    <option value="">Todos os bairros</option>
    <option v-for="bairro in bairros" :key="bairro" :value="bairro">
      {{ bairro }}
    </option>
  </select>
</div>
      <div v-if="carregando"  ><img src="/imgs/perso.gif" class="gif"  alt=""></div>
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
    background-color: #1E3068;
    
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
  scrollbar-color: #1E3068 #FEC12B;
  overflow-y: auto;
  padding: 10px;
    }
  .text {
    color: #FFF;
    font-size: 1.8rem;
    padding: 60px 60px 0 60px;
  }
.filtros {
  display: flex;
  gap: 15px;
  align-items: center;
  margin: 15px;
  position: relative;
}
.nomeF{
  flex: 1;
  min-width: 0;
}
.filtroComb{
  position: absolute;
  text-align: end;
  top: 0;
 right: 0;
}
.gif{
  width: 80%;
  display: flex;
 align-items: center;
 justify-content: center;
 margin: 0 auto;
  }
 .filtroBairro{
  background-color: #FEC12B;
  border: none;
  border-radius: 5px;
  padding: 5px 5px;
  height: 40px;
  color: #002492;
  font-weight: bold;
  cursor: pointer;
  margin-right: 50px;
}
</style>
