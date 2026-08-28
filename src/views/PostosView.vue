<script setup>
import { ref, onMounted, computed } from 'vue'
import AppCardsPostos from '../components/AppCardsPostos.vue'
import { buscarPostos, extrairBairro } from '../services/postos'

const postos = ref([])
const carregando = ref(true)
const bairroSelecionado = ref('')

onMounted(async () => {
  postos.value = await buscarPostos()
  carregando.value = false
})

const bairros = computed(() => {
  const lista = postos.value.map(p => extrairBairro(p.endereco)).filter(Boolean)
  return [...new Set(lista)].sort()
})

const postosFiltrados = computed(() => {
  if (!bairroSelecionado.value) return postos.value
  return postos.value.filter(p => extrairBairro(p.endereco) === bairroSelecionado.value)
})
</script>

<template>
  <main class="pagina-postos">
    <section class="cabecalho-postos">
      <h1>Postos de Joinville</h1>

      <select v-model="bairroSelecionado" class="filtro">
        <option value="">Todos os bairros</option>
        <option v-for="bairro in bairros" :key="bairro" :value="bairro">
          {{ bairro }}
        </option>
      </select>
    </section>

    <AppCardsPostos :postos="postosFiltrados" :carregando="carregando" />
  </main>
</template>
<style scoped>

.pagina-postos {
  min-height: 100vh;
  background-color: #F5F6FC;
  padding: 40px 7%;
}

.cabecalho-postos {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 35px;
}

.cabecalho-postos h1 {
  color: #334582;
  font-size: 30px;
}


/* FILTRO */

.filtro {
  background-color: #FEC12B;
  color: #1748b0;
  border: 2px solid #1748b0;
  border-radius: 8px;
  padding: 8px 32px 8px 14px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231748b0' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
}

.filtro:hover {
  background-color: #ffd65c;
}

.filtro:focus {
  outline: none;
  border-color: #002d82;
}
</style>
