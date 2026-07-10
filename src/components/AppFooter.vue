<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <footer>
    <div>
        <div class="logo">
            <img src="../../public/imagens/Logo 2.png" alt="logo-AbasteceAí">
            <h1>Abastece Aí</h1>
        </div>
        <div>
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
        <div>
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
footer{
    
    background-image: url(../../public/imagens/background.png);
}
 div {
    margin: 1rem 3rem;
    display: flex;
    padding: 20px;
 }
 div div.logo {
    display: block;
 }

</style>
