<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "vue";
import {postosJoinville} from "@/data/dados";
import icon from '@/assets/icon/icon.png'
import * as L from 'leaflet';
const initialMap = ref(['-26.1814, -48.5045']);

onMounted(()=> {
    const key = 'Irt1tqYSdhb5lRg6Gqq2';
    initialMap.value = L.map('map').setView([-26.3045 , -48.8487], 14);
    L.tileLayer(`https://api.maptiler.com/maps/streets-v4-dark/{z}/{x}/{y}.png?key=${key}`, {
        tileSize: 512,
  zoomOffset: -1,
  attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
  crossOrigin: true
    }).addTo(initialMap.value);

    const myIcon = L.icon({
    iconUrl: icon,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
   
});
    postosJoinville.forEach(ponto => {
       

        L.marker(ponto.coordenadas, { icon: myIcon }).addTo(initialMap.value);

    });
});

</script>
<template>
 <h1> mapa </h1>
 <div style="display: flex; justify-content: end;">
 <div id="map" style="height: 90vh; width: 50%; "></div>
 </div>
</template>
<style scoped >
</style>