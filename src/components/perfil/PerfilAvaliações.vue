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
<div>
</div>
</template>
<style scoped>
</style>
