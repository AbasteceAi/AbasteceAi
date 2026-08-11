<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <footer>
    <div class="footer">
        <div class="logo">
            <img src="../../public/imagens/Logo 2.png" alt="logo-AbasteceAí">
            <h1>Abastece Aí</h1>
        </div>
        <div class="navegacao">
            <nav>
                <h2>NAVEGAÇÃO</h2>
                <ul>
                    <li><RouterLink to="/inicio">Ínicio</RouterLink></li>
                    <li><RouterLink to="/postos">Mapa</RouterLink></li>
                    <li><RouterLink to="/postos">Postos</RouterLink></li>
                    <li><RouterLink to="/sobrenos">Sobre Nós</RouterLink></li>
                </ul>
            </nav>
        </div>
        <div class="contato">
            <nav>
                <h2>CONTATO</h2>
                <ul>
                    <li><RouterLink to="/inicio">Ínicio</RouterLink></li>
                    <li><RouterLink to="/postos">Mapa</RouterLink></li>
                    <li><RouterLink to="/postos">Postos</RouterLink></li>
                    <li><RouterLink to="/sobrenos">Sobre Nós</RouterLink></li>
                </ul>
            </nav>
        </div>
    </div>
 <ul>

 </ul>
 </footer>
</template>

<style scoped>
footer {
  background-image: url(../../public/imagens/background.png);
  background-size: 100% 100%; 
  background-repeat: no-repeat;
  background-position: bottom;
  display: flex;
  justify-content: space-between; /* Distribui os blocos igualmente pelas pontas */
align-items: center; /* Alinha o conteúdo verticalmente */
    width: 100%;
   
}
 div.footer {
    margin: 1rem 3rem;
    display: flex;
    padding: 20px;
 }
 div div.logo {
    display: block;
 }
div div nav ul li router-link{
text-decoration: none;
    margin: 0.5rem 0;
}

div.logo h1{
    font-size: 2rem;
    color: white;
}
</style>
