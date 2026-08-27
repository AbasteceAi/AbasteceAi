<script setup>
import { onMounted, watch } from "vue";

import icon from '@/assets/icon/icon.png'
import * as L from 'leaflet';
import { mostrarConteudo } from "@/utils/conteudo";


let mapa = null;

const props = defineProps({
  postos: {
    type: Array,
    default: () => []
  },
  combustivelSel: {
    type: String,
    default: ''
  },
  postoSel:{
    type: Object,
    default:null
  }

})
let marcadores = []
 let marcadoresPorId = {}
function adicionarMarcadores() {
  marcadores.forEach(m => mapa.removeLayer(m))
  marcadores =[]
  const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  })
  props.postos.forEach(ponto => {
  if (!ponto.latitude || !ponto.longitude) return
   const coordenadas = [ponto.latitude, ponto.longitude]
   const marker =
    L.marker(coordenadas, {icon: myIcon})
    .bindPopup(mostrarConteudo(ponto, props.combustivelSel), {
      minWidth: 300,
      maxWidth: 400,
    })
    .addTo(mapa)
    marcadores.push(marker)
    marcadoresPorId[ponto.id] = marker
  })
}
onMounted(() => {
  const key = 'Irt1tqYSdhb5lRg6Gqq2';

  mapa = L.map('map').setView([-26.3045, -48.8487], 14)

  L.tileLayer(`https://api.maptiler.com/maps/streets-v4-dark/{z}/{x}/{y}.png?key=${key}`, {
    tileSize: 512,
    zoomOffset: -1,
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    crossOrigin: true
  }).addTo(mapa)

  adicionarMarcadores()
})
watch (() => [props.postos, props.combustivelSel], () =>{
  if (mapa) adicionarMarcadores ()
})
watch (() => props.postoSel, (posto) => {
  if (!posto || !mapa) return
  const coordenadas = [posto.latitude, posto.longitude]
  if ( !coordenadas) return
  mapa.flyTo (coordenadas, 16, {duration:1})
  const marker = marcadoresPorId[posto.id]
  if (marker) marker.openPopup()
})
</script>
<template>
 <div style="display: flex; justify-content: end;">
 <div id="map" style="height: 95vh; width: 100%; "></div>
 </div>
</template>
<style scoped >
:deep(.img){
    width: 40px;
    height: 40px;
}
:deep(.contMapa){
  display: flex;
  flex-direction: column;
 margin: 5px;
 border-left: 2px solid #002492;
 padding-left: 5px;

}
:deep(.cont1){
  display: flex;
  gap: 10px;
  align-items: center;
}
:deep(.cont1 h3){
  font-size: 20px;
  margin: 0;
  color: #002492 ;
  flex-wrap: wrap;
}
:deep(.cont2){
  display: flex;
  margin: 0;
  align-items: center;
}
:deep(.cont2 p){
 font-weight: 700;
 font-size: 15px;
 margin: 0;
 display: flex;
}
:deep(.sim ){
  width: 20px;
  height: 20px;
}
:deep(.preco){
  font-weight:bold ;
  color: black;
  font-size: 20px;
}
:deep(.linha-preco){
  font-size: 15px;
  margin: 5px;
}
</style>
