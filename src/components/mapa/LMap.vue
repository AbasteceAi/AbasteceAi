<script setup>
import { ref, onMounted } from "vue";
import { buscarPostos, obterLoc, ordenarPorDistancia } from "@/services/postos";
import icon from '@/assets/icon/icon.png'
import * as L from 'leaflet';
import { mostrarConteudo } from "@/utils/conteudo";

const postos = ref ([]);
let mapa = null;

async function carregarPostos() {
  const dados = await buscarPostos()

  const comCoordenadas = dados.map(posto => ({
    ...posto,
    coordenadas: [posto.latitude, posto.longitude]
  }))
    try {
    const { lat, lng } = await obterLoc()
     postos.value = ordenarPorDistancia(comCoordenadas, lat, lng)
  } catch {

    postos.value = comCoordenadas
  }

  adicionarMarcadores()
}

function adicionarMarcadores() {
  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })
  postos.value.forEach(ponto => {
 console.log(ponto.nome, ponto.coordenadas)
    L.marker(ponto.coordenadas, {icon: myIcon})
    .bindPopup(mostrarConteudo(ponto))
    .addTo(mapa)
  })
}
onMounted(async () => {
  const key = 'Irt1tqYSdhb5lRg6Gqq2';

  mapa = L.map('map').setView([-26.3045, -48.8487], 14)

  L.tileLayer(`https://api.maptiler.com/maps/streets-v4-dark/{z}/{x}/{y}.png?key=${key}`, {
    tileSize: 512,
    zoomOffset: -1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
  }).addTo(mapa)

  await carregarPostos() // só adiciona marcadores depois que os dados chegarem
})

</script>
<template>
 <div style="display: flex; justify-content: end;">
 <div id="map" style="height: 95vh; width: 100%; "></div>
 </div>
</template>
<style scoped >
:deep(.img){
    width: 60px;
    height: 60px;
}

</style>
