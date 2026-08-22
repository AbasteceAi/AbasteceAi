<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main>
    <RouterLink to="/mapa" class="mapaEstatico">
      <h1>Acesse os postos mais próximos de você</h1>
      <img src="/imgs/mapaEstático.png" alt="Mapa Estático" />
    </RouterLink>
  </main>
</template>

<style scoped>
.mapaEstatico {
  display: block;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  background-color: #FEC12B;
  padding: 20px;
  border-radius: 20px;
  max-width: 1100px;
  margin: 40px auto;
  text-align: center;
}
h1 {
  font-size: 30px;
  color: #002492;
  text-align: center;
  padding-bottom: 20px;
}
.mapaEstatico img {
  display: block;
  margin: 0 auto;
  max-width: 90%;
  border-radius: 14px;
  padding: 0 0 30px 0;
}
</style>
