<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer>
    <div class="logo">
      <img src="/public/logo.png" alt="logo" />
      <span>Abastece Aí</span>
    </div>
    <div class="links">
      <h1>Navegação</h1>
      <RouterLink to="/">Início</RouterLink>
      <RouterLink to="/mapa">Mapa</RouterLink>
      <RouterLink to="/postos">Postos</RouterLink>
      <RouterLink to="/sobre">Sobre Nós</RouterLink>
    </div>
    <div class="links">
      <h1>Contato</h1>
      <a href="https://github.com/abasteceai" target="_blank">Github</a>
      <a href="mailto:abasteceaipostos@gmail.com">Email</a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-image: url('/public/fundoFooter.png'); 
}
</style>