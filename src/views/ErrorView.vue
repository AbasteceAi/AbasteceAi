<script>
</script>


<template>
    <div class="error-container">
    <h3>Erro</h3>
    <div class="erro404">
    <h1>4</h1>
    <img src="/public/imgs/erroMascote.png" alt="imagem-mascote-erro">
    <h1>4</h1>
    </div>
     <p>Desculpe-nos, não conseguimos encontrar essa página</p>
    <div class="bttn">
        <router-link class="router-link" to="/">Voltar para o Ínicio</router-link>
    </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
.error-container {
    background-color: #334582;
    width: 100%;
    height: 100vh;
    padding: 6rem 0 0 0;
}
    h3{
        text-align: center;
        font-size: 2rem;
        color: #FEC12B;
        padding: 1rem 0;
    }
    img {
        width: 450px;
    }
    .erro404{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: auto 0;
        gap: 1rem;
    }
    .erro404 h1{
        list-style-type: none;
        font-family: 'Bai Jamjuree', sans-serif;
        font-weight: 100;
        color: #FEC12B;
        font-size: 24rem;
    }
    p{
        text-align: center;
        font-size: 1.5rem;
        color: white;
        font-weight: 500;
    }
    .bttn{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2rem;
    }
    .router-link{
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
        color: #FEC12B;
        font-size: 1.5rem;
        font-weight: 500;
        background-color: #002492;
        border: 3px solid #FEC12B;
        border-radius: 40px;
        padding: 1rem 4rem;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    }
</style>
