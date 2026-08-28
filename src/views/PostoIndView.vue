<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/data/supabaseClient.js'
import PostoBanner from '@/components/postos individuais/PostoBanner.vue'
import PostoServicos from '@/components/postos individuais/PostoServicos.vue'
import PostoAvaliacao from '@/components/postos individuais/PostoAvaliacao.vue'
import ModalAvaliacao from '@/components/postos individuais/ModalAvaliacao.vue'
import { adicionarFavorito, removerFavorito, ehFavorito } from '@/services/favoritos'
import { usuarioAtual } from '@/services/auth.js'
import { buscarAvaliacoesDoPosto } from '@/services/avaliacoes.js'
import { buscarServicosDoPosto } from '@/services/servicos.js'

 const route = useRoute()
 const posto = ref(null)
const carregando = ref(true)
const usuarioLogadoId = ref(null)

const favorito = ref(false)
onMounted(async () => {
  const usuario = await usuarioAtual()
  usuarioLogadoId.value = usuario?.id ?? null

  await carregarPosto()
  favorito.value = await ehFavorito(route.params.id)
})

async function alternarFavorito() {
  try {
    if (favorito.value) {
      await removerFavorito(posto.value.id)
    } else {
      await adicionarFavorito(posto.value.id)
    }
    favorito.value = !favorito.value
  } catch (e) {
    console.error(e)
  }
}

const modalAvaliacaoAberto = ref(false)
function irParaAvaliar() {
  modalAvaliacaoAberto.value = true
}
function aoSalvarAvaliacaoOuPreco() {
  carregarPosto()
}

async function carregarPosto() {
  const id = route.params.id

  const { data, error } = await supabase
    .from('postos')
    .select(`*, avaliacoes (nota), precos (tipo_combustivel, preco_litro)`)
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
  }else { const notas = data.avaliacoes?.map(a => a.nota) ?? []
    const media = notas.length > 0
      ? notas.reduce((soma, n) => soma + n, 0) / notas.length
      : null

    posto.value = {
      ...data,
      mediaAvaliacao: media,
      totalAvaliacoes: notas.length
    }

    avaliacoes.value = await buscarAvaliacoesDoPosto(id, usuarioLogadoId.value)
    servicos.value = await buscarServicosDoPosto(id)
  }
  carregando.value = false
}

const avaliacoes = ref([])
const servicos = ref([])
</script>

<template>


  <main class="posto-page">
  <div v-if="carregando">
    carregando
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