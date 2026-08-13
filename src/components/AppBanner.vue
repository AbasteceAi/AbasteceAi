<script setup>

</script>

<template>
<body>        
    <main>
    <section class="banner">
    <div class="texto">
    <h1>Bem Vindo ao <span>Abastece Aí</span></h1>
    <p>Encontre os postos de gasolina mais baratos pela região de Joinville.</p>
    <p>Compare os preços em tempo real e economize toda semana.</p>
    </div>
    <div class="imagem">
    <img src="/bonecoPosto.png" alt="boneco" />
    </div>
    </section>
    </main>
</body>
</template>

<style scoped>
.banner {
    width: 100%;
    height: 315px;
    position: relative;
    background-image: url('/teste3.png');
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.texto {
    position: absolute;
    left: 60px;
    top: 50px;
}

h1 {
    font-size: 28px;
    margin-bottom: 30px;
}

p {
    font-size: 16px;
    line-height: 1.5;
}

.imagem {
    position: absolute;
    right: 70px;
    bottom: 0;
}

.imagem img {
    width: 360px;
    display: block;
}
</style>