<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="menu">
    <div class="card">
      <RouterLink to="/avaliacoes" class="botao">Acessar Avaliações</RouterLink>
      <RouterLink to="/postos" class="botao">Acessar Postos</RouterLink>
      <RouterLink to="/favoritos" class="botao">Acessar Favoritos</RouterLink>
    </div>

    <img src="/boneco.png" alt="Boneco posto" class="boneco" />
    <div class="card">
      <RouterLink to="/cadastro" class="botao">Cadastrar-se</RouterLink>
      <RouterLink to="/login" class="botao">Login</RouterLink>
      <RouterLink to="/suporte" class="botao">Suporte</RouterLink>
    </div>
  </section>
</template>

<style scoped>
.menu {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 200px;
  padding: 60px 20px;
}

.card {
  background-color: #334582;
  border-radius: 16px;
  padding: 30px;
  width: 400px;
  height: 250px;
  display: flex;
  flex-direction: column;
  gap: 26px;
}

.botao {
  display: block;
  background-color: #FEC12B;
  color: #002492;
  text-decoration: none;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  padding: 18px;
  border-radius: 10px;
  transition: transform 0.15s ease;
}

.botao:hover {
  transform: scale(1.03);
}

.boneco {
  position: absolute;
  bottom: -20px;
  width: 300px;
  z-index: 2;
}
</style>