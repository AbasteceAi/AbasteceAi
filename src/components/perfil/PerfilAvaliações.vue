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


</script>
<template>
<div class="avaliacoes">
   <h1>Avaliações Recentes</h1>
  <div v-if="carregando"><img src="/imgs/perso.gif" ></div>
  <div v-else>

  </div>
</div>
</template>
<style scoped>
</style>
