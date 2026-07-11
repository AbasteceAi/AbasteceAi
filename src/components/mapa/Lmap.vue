<script setup>
import "leaflet/dist/leaflet.css";
import { ref, onMounted } from "vue";
import { pontosTuristicos } from "@/data/dados";
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
    pontosTuristicos.forEach(ponto => {
        const conteudoPopup = `
            <div style="font-family: sans-serif; line-height: 1.4; color: #333; min-width: 180px;">
                <h3 style="margin: 0 0 5px 0; color: #1e3a8a;">${ponto.nome}</h3>
                <p style="margin: 0 0 8px 0; font-size: 13px; color: #4b5563;">${ponto.descricao}</p>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 8px 0;">
                <p style="margin: 0; font-size: 11px;"><b>Endereço:</b> ${ponto.endereco}</p>
                <p style="margin: 4px 0 0 0; font-size: 11px;"><b>Preço:</b> <span style="color: #16a34a; font-weight: bold;">${ponto.preco}</span></p>
            </div>
        `;

        L.marker(ponto.coordenadas, { icon: myIcon })
            .bindPopup(conteudoPopup)
            .addTo(initialMap.value);

    });
});

</script>
<template>
 <h1> mapa </h1>
 <div id="map" style="height: 90vh; width: 100%;"></div>
</template>
<style scoped >
</style>