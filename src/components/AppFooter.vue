<script setup>
import { RouterLink } from 'vue-router'

function voltarAoTopo() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <footer>
    <button class="btn-topo" @click="voltarAoTopo" aria-label="Voltar ao topo">
      <img src="/public/imgs/seta.png" alt="">
    </button>
    <div class="footer">
      <div class="logo">
        <img src="/imgs/logoMaior.png" alt="logo" />
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
  position: relative;
  display: flex;
  justify-content: left;
  padding: 20px;
  background-image: url('/imgs/fundoFooter.png');
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  height: 300px;
  margin: 0;
 
}

.footer {
  width: 100%;
  max-width: 1200px;
  margin: 0;
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
  width: 100px;
  height: 100px;
}

.logo span {
  color: #fff;
  font-weight: 700;
  font-size: 24px;
}

.links {
  padding: 100px 0 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.links h1 {
  font-size: 22px;
  color: #000000;
  margin-bottom: 4px;
  border-bottom: 6px solid #1F2B54;
  padding-bottom: 6px;
  width: fit-content;
}

.links a {
  color: #000000;
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
}

.links a:hover {
  text-decoration: underline;
}
.btn-topo {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ffffff;
  border: none;
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn-topo img {
  width: 60%;
}
</style>
