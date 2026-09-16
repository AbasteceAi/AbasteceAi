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
const menorPreco = ref(true)
const bairroSelecionado = ref('')
const combustivelRef = 'gasolina comum'


const bairros = computed(() => {
  const lista = postos.value.map(p => extrairBairro(p.endereco)).filter(Boolean)
  return [...new Set(lista)].sort()
})
function obterPrecoComparavel(posto) {
    const tipo = combustivelSelecionado.value || combustivelRef
    const item = posto.precos?.find(
      p => p.tipo_combustivel.toLowerCase() === tipo.toLowerCase()
    )
    return item ? item.preco_litro : Infinity
}

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
  if (menorPreco.value) {
     resultado =[...resultado].sort(
      (a, b) => obterPrecoComparavel(a) - obterPrecoComparavel(b)
    )
  }
   if (!menorPreco.value) {
     resultado =[...resultado].sort(
      (a, b) => obterPrecoComparavel(b) - obterPrecoComparavel(a)
    )
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
   <div class="filPreco">
      <button v-if="menorPreco" @click="menorPreco = false">Menor Preco <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M320-561h80v287l62-62 58 56-160 160-160-160 58-56 62 62v-287Zm320 160h-80v-287l-64 64-56-56 160-160 160 160-56 56-64-64v287Z"/></svg></button>
      <button v-else-if="!menorPreco" @click="menorPreco = true">Maior Preço <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M320-561h80v287l62-62 58 56-160 160-160-160 58-56 62 62v-287Zm320 160h-80v-287l-64 64-56-56 160-160 160 160-56 56-64-64v287Z"/></svg> </button>
   </div>
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
 <LMap :postos="postosFiltrados" :combustivel-sel="combustivelSelecionado" :posto-sel="postoSel" style="height: 90vh; width: 100%;  "/>
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
    padding: 20px;
    background: #FEC12B;
    gap: 15px;
    }
    .side{
  background-color: #334582;
  width: 98%;
  height: 87vh;
  margin: 5px;
  border-radius: 25px;
  scrollbar-color: #1E3068 #FEC12B;
  overflow-y: auto;
  padding: 10px;
    }
  .text {
    color: #FFF;
    font-size: 1.8rem;
    padding: 30px 60px 0 60px;
    display: flex;
    gap: 40px;
  }
.filtros {
   display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 15px;
  align-items: center;
  margin: 15px;
}
.nomeF {
  grid-column: 1;
  grid-row: 1;
}
.filtroComb {
 grid-column: 3;
  grid-row: 1;
  justify-self: end;
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
    grid-column: 2;
  grid-row: 1;
  margin-right: 0;
}
.filPreco button{
 display: flex;
 align-items: center;
 background-color: #FEC12B;
 border: none;
 padding: 10px 20px;
 font-size: 20px;
 font-weight: 700;
 margin: 20px 0;
 border-radius: 5px;
}
</style>
