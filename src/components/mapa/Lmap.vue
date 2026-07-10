
<template>
<div style="height: 600px; width: 800px;"> 
<l-map ref="map" v-model:zoom="zoom" :center="[47.41322, -1.219482]">
    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    layer-type="base"
    name="openstreetmap"></l-tile-layer>
</l-map>
</div>
</template>
<script setup >
import { vue } from 'globals';
import 'leaflet/dist/leaflet.css';
import {Lmap, LTileLayer} from "@vue-leaflet/vue-leaflet";
import { ref } from 'vue';
const zoom= ref(2);
</script>
<style scoped>
</style>