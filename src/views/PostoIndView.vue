<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import PostoBanner from '@/components/postos individuais/PostoBanner.vue'
import PostoServicos from '@/components/postos individuais/PostoServicos.vue'
import PostoAvaliacao from '@/components/postos individuais/PostoAvaliacao.vue'
import ModalAvaliacao from '@/components/postos individuais/ModalAvaliacao.vue'
import { adicionarFavorito, removerFavorito, ehFavorito } from '@/services/favoritos'
import { usuarioAtual } from '@/services/auth.js'
import { buscarPostoPorId } from '@/services/postos.js'
import { buscarAvaliacoesDoPosto } from '@/services/avaliacoes.js'
import { buscarServicosDoPosto } from '@/services/servicos.js'

const route = useRoute()
const posto = ref(null)
const avaliacoes = ref([])
const servicos = ref([])
const carregando = ref(true)
const erro = ref('')
const usuarioLogadoId = ref(null)
const favorito = ref(false)

async function carregarPosto() {
  const id = route.params.id?.trim()
  carregando.value = true
  erro.value = ''
  try {
    const [data, listaAvaliacoes, listaServicos] = await Promise.all([
      buscarPostoPorId(id),                              // GET /postos/:id
      buscarAvaliacoesDoPosto(id, usuarioLogadoId.value),
      buscarServicosDoPosto(id),
    ])

    const notas = data.avaliacoes.map((a) => a.nota)
    const media = notas.length > 0 ? notas.reduce((soma, n) => soma + n, 0) / notas.length : null

    posto.value = { ...data, mediaAvaliacao: media, totalAvaliacoes: notas.length }
    avaliacoes.value = listaAvaliacoes
    servicos.value = listaServicos
    favorito.value = await ehFavorito(id)
  } catch (e) {
    posto.value = null
    erro.value = e.message 
  } finally {
    carregando.value = false
  }
}

onMounted(async () => {
  const usuario = await usuarioAtual()
  usuarioLogadoId.value = usuario?.id ?? null
  await carregarPosto()
})

watch(
  () => route.params.id,
  (novoId, idAntigo) => {
    if (novoId && novoId !== idAntigo) carregarPosto()
  },
)

async function alternarFavorito() {
  try {
    if (favorito.value) await removerFavorito(posto.value.id)
    else await adicionarFavorito(posto.value.id)
    favorito.value = !favorito.value
  } catch (e) {
    erro.value = e.message
  }
}

const modalAvaliacaoAberto = ref(false)
function irParaAvaliar() {
  modalAvaliacaoAberto.value = true
}
function aoSalvarAvaliacaoOuPreco() {
  carregarPosto()
}
</script>

<template>


  <main class="posto-page">
  <div v-if="carregando">
    <img src="/imgs/perso.gif" >
  </div>
  <div  v-else-if="posto">
   <PostoBanner :posto="posto" :favorito="favorito" @favoritar="alternarFavorito" @avaliar="irParaAvaliar" />

    <PostoServicos :servicos="servicos" />

    <PostoAvaliacao :avaliacoes="avaliacoes" :usuario-atual-id="usuarioLogadoId" />

    <ModalAvaliacao
      v-model="modalAvaliacaoAberto"
      :posto="posto"
      @salvo="aoSalvarAvaliacaoOuPreco"
    />
  </div>

  </main>

</template>

<style scoped>
.posto-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px 80px;
  box-sizing: border-box;
}
</style>
