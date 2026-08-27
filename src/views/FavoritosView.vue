<script setup>
import { ref, onMounted } from 'vue'
import { buscarFavoritos } from '@/services/favoritos'
import AppCardsPostos from '@/components/AppCardsPostos.vue'

const favoritos = ref([])
const carregando = ref(true)

onMounted(async () => {
  favoritos.value = await buscarFavoritos()
  carregando.value = false
})
</script>

<template>
  <div class="texto">
    <div class="titulo">
      <svg class="star" viewBox="0 0 329.942 329.942" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
          c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
          c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
          c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723
          l85.711-45.059l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15
          c0-1.152-0.13-2.275-0.376-3.352l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z" />
      </svg>
      <h2>Seus Favoritos</h2>
    </div>
    <p>Acompanhe seus postos favoritos e os preços atualizados</p>
  </div>
  <div class="statusFavoritos">
    <div v-if="carregando">Carregando...</div>
    <div v-else-if="favoritos.length === 0">Você ainda não favoritou nenhum posto</div>
    <div v-else>
      <AppCardsPostos :postos="favoritos" :carregando="carregando" />
    </div>
  </div>
</template>

<style scoped>
.star {
  fill: #ffc229;
  width: 35px;
}

h2 {
  font-size: 40px;
  font-weight: 600;
}

.titulo {
  display: flex;
  gap: 20px;
}

.texto {
  padding: 80px 80px 0 80px;
}

.texto p {
  color: 464242;
  padding: 10px 0 0 0;
  font-size: 22px;
}

.statusFavoritos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 350px;
  font-size: 22px;
}
</style>