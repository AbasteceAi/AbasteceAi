<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/data/supabaseClient.js'
import PostoBanner from '@/components/postos/PostoBanner.vue'
import PostoServicos from '@/components/postos/PostoServicos.vue'
import PostoAvaliacao from '@/components/postos/PostoAvaliacao.vue'

 const route = useRoute()
 const posto = ref(null)
const carregando = ref(true)

const favorito = ref(false)
function alternarFavorito() {
  favorito.value = !favorito.value
}
function irParaAvaliar() {
}

async function carregarPosto() {
  const id = route.params.id

  const { data, error } = await supabase
    .from('postos')
    .select(`*, avaliacoes (nota, comentario), precos (tipo_combustivel, preco_litro)`)
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
  }
  carregando.value = false
}

onMounted(carregarPosto)
const avaliacoes = ref([
  {
    id: 1,
    nome: 'Bruna Siebert',
    qtdAvaliacoes: 23,
    data: '25/02/26',
    nota: 5,
    comentario: 'Melhor preço de etanol que encontrei em Joinville essa semana! Já indiquei para minha família e colegas de trabalho. A loja de conveniência também é bem abastecida.',
    util: 12,
    marcouUtil: false,
    iniciais: 'BS',
    cor: '#334582',
  },
  // ...resto dos dados de teste
])
</script>

<template>


  <main class="posto-page">
  <div v-if="carregando">
    carregando
  </div>
  <div  v-else-if="posto">
   <PostoBanner :posto="posto" :favorito="favorito" @favoritar="alternarFavorito" @avaliar="irParaAvaliar" />

    <PostoServicos />

    <PostoAvaliacao :avaliacoes="avaliacoes" />
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
