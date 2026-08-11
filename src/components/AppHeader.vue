<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="header">

        <div class="logo">
            <img src="#" alt="Logo" />
            <h1>Abastece Aí</h1>
        </div>

        <nav>
            <RouterLink to="/">HOME</RouterLink>
            <RouterLink to="/mapa">MAPA</RouterLink>
            <RouterLink to="/postos">POSTOS</RouterLink>
            <RouterLink to="/sobre-nos">SOBRE NÓS</RouterLink>
        </nav>

        <div class="pesquisa">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquisar"/>
        </div>

        <RouterLink to="/favoritos" class="estrela">
           
        </RouterLink>

        <RouterLink to="/perfil" class="user">
          
        </RouterLink>

    </header>
</template>

<style scoped>

.app {

  min-height: 100vh;

  background: #eeeeee;

}

.header {

  width: 88%;

  max-width: 1200px;

  height: 76px;

  margin: 180px auto 0;

  padding: 0 24px;

  display: flex;

  align-items: center;

  gap: 20px;

  background: linear-gradient(

    90deg,

    #3949d8,

    #304bd0

  );

}

.logo-area {

  display: flex;

  align-items: center;

  gap: 12px;

  color: white;

  font-size: 15px;

  font-weight: bold;

}

.logo {

  width: 42px;

  height: 42px;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #18328e;

  border-radius: 4px;

  color: white;

  font-size: 24px;

  font-weight: bold;

}

.nav {

  display: flex;

  align-items: center;

  gap: 14px;

  margin-left: auto;

}

.nav a {

  padding: 7px 25px;

  border: 1.5px solid white;

  border-radius: 20px;

  color: white;

  text-decoration: none;

  font-size: 13px;

  font-weight: bold;

  transition: 0.2s;

}

.nav a:hover {

  background: white;

  color: #3949d8;

}

.search {

  width: 255px;

  height: 35px;

  display: flex;

  align-items: center;

  padding: 0 12px;

  background: #f8f8f8;

  border: 1px solid #ddd;

  border-radius: 20px;

}

.search span {

  color: #777;

  font-size: 20px;

  margin-right: 7px;

}

.search input {

  width: 100%;

  border: none;

  outline: none;

  background: transparent;

  font-size: 14px;

}

.search input::placeholder {

  color: #888;

}

.favorite {

  color: #ffd400;

  font-size: 29px;

  text-decoration: none;

}

.user {

  width: 38px;

  height: 38px;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #f4f4f4;

  color: #777;

  text-decoration: none;

  font-size: 18px;

}
</style>