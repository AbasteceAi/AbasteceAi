<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer>
    <div class="footer">
      <div class="logo">
        <img src="/logoMaior.png" alt="logo" />
        <span>Abastece Aí</span>
      </div>
      <div class="links">
        <h1>NAVEGAÇÃO</h1>
        <RouterLink to="/">Início</RouterLink>
        <RouterLink to="/mapa">Mapa</RouterLink>
        <RouterLink to="/postos">Postos</RouterLink>
        <RouterLink to="/sobre">Sobre Nós</RouterLink>
      </div>
      <div class="links">
        <h1>CONTATO</h1>
        <a href="mailto:abasteceaipostos@gmail.com">Email</a>
        <a href="https://github.com/abasteceai" target="_blank">Github</a>
        <a href="https://wa.me/5547988518536" target="_blank">WhatsApp</a>
        <a href="mailto:abasteceaipostos@gmail.com?subject=Reportar%20erro&body=Descreva%20o%20problema%20encontrado%3A%0A%0ANome%20do%20posto%3A%0APre%C3%A7o%20ou%20localiza%C3%A7%C3%A3o%20incorreta%3A%0A">Reporte um erro</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: left;
  padding: 20px;
  background-image: url('/fundoFooter.png');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  min-height: 380px;
  width: 100%;
}

.footer {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 0 20px 80px
}

.logo img {
  width: 150px;
  height: 150px;
}

.logo span {
  color: #fff;
  font-weight: 700;
  font-size: 30px;
}

.links {
  padding: 100px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.links h1 {
  font-size: 30px;
  color: #000000;
  margin-bottom: 4px;
  border-bottom: 6px solid #1F2B54;
  padding-bottom: 6px;
  width: fit-content;
}

.links a {
  color: #000000;
  text-decoration: none;
  font-size: 20px;
  font-weight: 400;
}

.links a:hover {
  text-decoration: underline;
}
</style>