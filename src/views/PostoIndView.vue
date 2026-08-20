<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import PostoBanner from '@/components/postos/PostoBanner.vue'
import PostoServicos from '@/components/postos/PostoServicos.vue'
import PostoAvaliacao from '@/components/postos/PostoAvaliacao.vue'

 const route = useRoute()
 const posto = ref(await buscarPostoPorId(route.params.id))


const favorito = ref(false)
function alternarFavorito() {
  favorito.value = !favorito.value
}

function irParaAvaliar() {
}
//so pra testar
const avaliacoes = ref([
  {
    id: 1,
    nome: 'Bruna Siebert',
    qtdAvaliacoes: 23,
    data: '25/02/26',
    nota: 5,
    comentario:
      'Melhor preço de etanol que encontrei em Joinville essa semana! Já indiquei para minha família e colegas de trabalho. A loja de conveniência também é bem abastecida.',
    util: 12,
    marcouUtil: false,
    iniciais: 'BS',
    cor: '#334582',
  },
  {
    id: 2,
    nome: 'Giulia Corrêa',
    qtdAvaliacoes: 12,
    data: '20/03/26',
    nota: 5,
    comentario:
      'Abasteci aqui na sexta à noite e o preço da gasolina estava de acordo com o site. Atendimento rápido e o funcionário foi bem educado. Vou voltar sempre.',
    util: 8,
    marcouUtil: false,
    iniciais: 'GC',
    cor: '#FEC12B',
  },
  {
    id: 3,
    nome: 'Ester Viana',
    qtdAvaliacoes: 7,
    data: '16/04/26',
    nota: 5,
    comentario:
      'Posto organizado e bem sinalizado. O atendente me avisou que o diesel S-10 estava em falta e me indicou outro posto próximo, achei isso muito honesto. Nota alta pelo atendimento.',
    util: 7,
    marcouUtil: false,
    iniciais: 'EV',
    cor: '#1e326b',
  },
  {
    id: 4,
    nome: 'Halicya Recalde',
    qtdAvaliacoes: 6,
    data: '20/04/26',
    nota: 3,
    comentario:
      'Preço ok, nem o mais barato nem o mais caro da região. O atendimento foi normal, sem nada de especial. A bomba de ar do pneu estava com defeito no dia que fui, o que foi chato.',
    util: 6,
    marcouUtil: false,
    iniciais: 'HR',
    cor: '#002492',
  },
  {
    id: 5,
    nome: 'Rafael Nunes',
    qtdAvaliacoes: 15,
    data: '02/05/26',
    nota: 4,
    comentario:
      'Boa localização e fácil acesso saindo da BR. Fila andou rápido mesmo em horário de pico. Voltaria a abastecer aqui numa próxima viagem.',
    util: 4,
    marcouUtil: false,
    iniciais: 'RN',
    cor: '#334582',
  },
  {
    id: 6,
    nome: 'João Pedro Alves',
    qtdAvaliacoes: 3,
    data: '10/05/26',
    nota: 4,
    comentario:
      'Banheiro limpo, o que já é diferencial em posto de estrada. Cafeteria com preço justo e o café estava bem quentinho.',
    util: 2,
    marcouUtil: false,
    iniciais: 'JA',
    cor: '#FEC12B',
  },
])
</script>

<template>
  <AppHeader />

  <main class="posto-page">
    <PostoHero :posto="posto" :favorito="favorito" @favoritar="alternarFavorito" @avaliar="irParaAvaliar" />

    <PostoServicos />

    <PostoAvaliacoes :avaliacoes="avaliacoes" />
  </main>

  <AppFooter />
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