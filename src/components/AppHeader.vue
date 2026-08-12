<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <header class="header">
        <nav class="nav-bar">
           <div class="logo">
            <img src="#" alt="Logo" />
            <h1>Abastece Aí</h1>
        </div>
          <ul>
            <li> <RouterLink to="/">HOME</RouterLink></li>
            <li> <RouterLink to="/mapa">MAPA</RouterLink></li>
            <li><RouterLink to="/postos">POSTOS</RouterLink></li>
            <li>
            <RouterLink to="/sobre-nos">SOBRE NÓS</RouterLink>
            </li>
          </ul>
        </nav>

        <div class="pesquisa">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Pesquisar"/>
        </div>

        <RouterLink to="/favoritos" >
           <span>
            <svg class="star" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 329.942 329.942" xml:space="preserve">
<path id="XMLID_16_" d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
	c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
	c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
	c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723l85.711-45.059
	l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15c0-1.152-0.13-2.275-0.376-3.352
	l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"/>
</svg>
           </span>
        </RouterLink>
        <RouterLink to="/perfil" class="user">
          <span>
            <svg class="user" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#fff"/>
<path d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z" fill="#334582"/>
<path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z" fill="#334582"/>
</svg>
          </span>
        </RouterLink>
    </header>
</template>

<style scoped>
.star{
  width: 40px;
  height: 40px;
  fill: #FEC12B;
}
.user{
  width: 40px;
  height: 40px;
}
header{
  background-color: #334582;
}
.nav-bar{
  display: flex;
  width: 100%;
}
ul {
  display: flex;
}
.logo {
  display: flex;
}
</style>