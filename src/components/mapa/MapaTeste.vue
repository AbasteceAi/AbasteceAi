<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/data/supabaseClient'
const postos = ref([])
const carregando = ref(true)

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

async function carregarPostos() {
  const { data, error } = await supabase
    .from('postos')
    .select(`*, avaliacoes (nota),
    precos(tipo_combustivel, preco_litro, atualizado_em)`)

  if (error) {
    console.error('Erro ao buscar postos:', error)
    carregando.value = false
    return
  }

  // calcula média de avaliação de cada posto
  const comAvaliacoes = data.map(posto => {
    const notas = posto.avaliacoes.map(a => a.nota)
    const media = notas.length > 0
      ? (notas.reduce((soma, n) => soma + n, 0) / notas.length).toFixed(1)
      : null

    return {
      ...posto,
      mediaAvaliacao: media,
      totalAvaliacoes: notas.length
    }
  })

  // pega localização do usuário e calcula distância
  navigator.geolocation.getCurrentPosition((position) => {
    const userLat = position.coords.latitude
    const userLng = position.coords.longitude

    const comDistancia = comAvaliacoes.map(p => ({
      ...p,
      distancia: calcularDistancia(userLat, userLng, p.latitude, p.longitude)
    })).sort((a, b) => a.distancia - b.distancia)

    postos.value = comDistancia
    carregando.value = false
  }, () => {
    // se o usuário negar localização, mostra sem ordenar por distância
    postos.value = comAvaliacoes
    carregando.value = false
  })
}

onMounted(() => {
  carregarPostos()
})
</script>

<template>
  <div v-if="carregando">Carregando postos...</div>

  <div v-else class="lista-postos">
    <div v-for="posto in postos" :key="posto.id" class="card-posto">
      <img v-if="posto.foto_url" :src="posto.foto_url" :alt="posto.nome" width="100%" />
      <h3>{{ posto.nome }}</h3>
      <p>{{ posto.endereco }}</p>
      <p>📞 {{ posto.telefone }}</p>
      <p>🕒 {{ posto.horario }}</p>
      <p>⭐ {{ posto.mediaAvaliacao ?? 'Sem avaliações' }} ({{ posto.totalAvaliacoes }})</p>
      <p v-if="posto.distancia">📍 {{ posto.distancia.toFixed(1) }} km de você</p>
     <p v-for="preco in posto.precos" :key="preco.tipo_combustivel" >{{ preco.tipo_combustivel }} : {{ preco.preco_litro }} <br> atualizado em : {{ preco.atualizado_em }} </p>
    </div>
     
  </div>
</template>
<style scoped>
.lista-postos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.card-posto {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
}

.card-posto img {
  border-radius: 8px;
  margin-bottom: 8px;
  width: 80px;
}
</style>