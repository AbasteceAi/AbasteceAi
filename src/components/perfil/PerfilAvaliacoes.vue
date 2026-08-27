<script setup>
import { ref, onMounted } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarAvaliacoesDoUsuario } from '@/services/avaliacoes'

const avaliacoes = ref([])
const carregando = ref(true)

onMounted(async () => {
  const user = await usuarioAtual()
  if (!user) return

  avaliacoes.value = await buscarAvaliacoesDoUsuario(user.id)
  carregando.value = false
})

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString('pt-BR')
}

</script>
<template>
<div class="avaliacoes">
   <h1>Avaliações Recentes</h1>
  <div v-if="carregando"><img src="/imgs/perso.gif" ></div>
  <div v-else-if="avaliacoes == 0">Você ainda não avaliou nenhum posto</div>
  <div v-else class="lista">
<div v-for="avaliacao in avaliacoes" :key="avaliacao.id" class="card">
 <img :src="avaliacao.postos?.foto_url" alt="avaliacao.postos?.nome" class="img">
 <div class="conteudo">
 <div class="bloco1">
   <h2>{{ avaliacao.postos?.nome ?? 'posto removido'}} </h2>
          <div class="estrelas">
            <span v-for="n in 5" :key="n" :class="{ ativa: n <= avaliacao.nota }">★</span>
          </div>
          <p class="data">{{ formatarData(avaliacao.created_at) }}</p>
</div>
 <div class="comentario">
 <p>{{ avaliacao.comentario }}</p>
 </div>
 </div>
</div>
  </div>
</div>
</template>
<style scoped>
</style>
