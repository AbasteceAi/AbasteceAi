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
    <img src="/imgs/pereTronco.png" alt="boneco" />
    </div>
    </section>
    </main>
</body>
</template>

<style scoped>
.banner {
    width: 100%;
    height: 555px;
    position: relative;
    background-image: url('/imgs/banner2.png');
    background-size: cover;
    background-position: center;
    overflow: hidden;
}

.texto {
    position: absolute;
    left: 100px;
    top: 100px;
}

h1 {
    font-size: 3rem;
    margin-bottom: 25px;
    color: #ffffff;
}

h1 span {
    color: #fec12b;
}

p {
    font-size: 25px;
    line-height: 1.5;
    font-weight: 200;
    color: #ffffff;
}

.imagem {
    position: absolute;
    right: 70px;
    bottom: 0;
}

.imagem img {
    width: 666px;
    display: block;
    margin: 0 60px 0 0;
}
</style>
