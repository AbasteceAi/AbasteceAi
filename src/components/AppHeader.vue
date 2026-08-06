<script setup>
    import { ref } from 'vue';
</script>

<template>
    <header class="header">

        <div class="logo">
            <img src="#" alt="Logo" />
            <h1>Abastece Aí</h1>
        </div>

        <nav>
            <a href="#">HOME</a>
            <a href="#">MAPA</a>
            <a href="#">POSTOS</a>
            <a href="#">SOBRE NÓS</a>
        </nav>

        <div class="pesquisa">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquisar"/>
        </div>

        <a href="#" class="estrela">
        <i class="fa-solid fa-star"></i>
        </a>

        <a href="#" class="user">
        <i class="fa-solid fa-user"></i>
        </a>

    </header>
</template>