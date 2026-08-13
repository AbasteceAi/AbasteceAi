<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div to="/" class="logo">
      <img src="../../public/Logo 2.png" alt="Logo Abastece Aí" />
      <span>Abastece Aí</span>
    </div>
    <div class="nav-container">
    <nav class="nav">
      <RouterLink to="/mapa">INÍCIO</RouterLink>
      <RouterLink to="/mapa">MAPA</RouterLink>
      <RouterLink to="/postos">POSTOS</RouterLink>
      <RouterLink to="/sobre-nos">SOBRE NÓS</RouterLink>
    </nav>

    <div class="pesquisa">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="#334582"
          stroke-width="2"
          stroke-linecap="round"
        />
      </svg>

      <input type="text" placeholder="Pesquisar" />
    </div>

    <RouterLink to="/favoritos" class="icone-link" aria-label="Favoritos">
      <svg class="star" viewBox="0 0 329.942 329.942" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
          c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
          c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
          c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723
          l85.711-45.059l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15
          c0-1.152-0.13-2.275-0.376-3.352l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"
        />
      </svg>
    </RouterLink>

    <RouterLink to="/perfil" class="perfil" aria-label="Perfil">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
          fill="white"
        />

        <path
          d="M16.807 19.0112C15.4398 19.9504 13.7841 20.5 12 20.5C10.2159 20.5 8.56023 19.9503 7.193 19.0111C6.58915 18.5963 6.33109 17.8062 6.68219 17.1632C7.41001 15.8302 8.90973 15 12 15C15.0903 15 16.59 15.8303 17.3178 17.1632C17.6689 17.8062 17.4108 18.5964 16.807 19.0112Z"
          fill="#334582"
        />

        <path
          d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3432 6 9.00004 7.34315 9.00004 9C9.00004 10.6569 10.3432 12 12 12Z"
          fill="#334582"
        />
      </svg>
    </RouterLink>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 80px;
  margin: 0;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #334582;
  display: flex;
  align-items: center;
  gap: 40px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 220px;
  color: white;
  text-decoration: none;
}

.logo img {
  width: 42px;
  object-fit: contain;
}

.logo span {
  font-size: 20px;
  font-weight: 650;
  white-space: nowrap;
}

.nav {
  display: flex;
  align-items: center;
  gap: 13px;
  flex-shrink: 0;
  justify-content: right;
}

.nav a {
  min-width: 94px;
  height: 32px;
  padding: 0 15px;
  box-sizing: border-box;
  border: 1px solid #fec12b;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav a:hover {
  background-color: #fec12b;
  color: #334582;
}
.nav-container {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
  justify-content: right;
}
.pesquisa {
  height: 34px;
  flex: 1;
  max-width: 230px;
  min-width: 150px;
  background-color: white;
  border-radius: 20px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  box-sizing: border-box;
}

.pesquisa input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #334582;
  font-size: 14px;
  font-weight: 600;
}

.pesquisa input::placeholder {
  color: #334582;
  opacity: 1;
}

.search-icon {
  width: 18px;
  height: 18px;
  margin-right: 5px;
  flex-shrink: 0;
}

.icone-link,
.perfil {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.star {
  width: 27px;
  height: 27px;
  fill: #fec12b;
  transition: transform 0.2s ease;
}

.icone-link:hover .star {
  transform: scale(1.1);
}

.perfil svg {
  width: 34px;
  height: 34px;
  transition: transform 0.2s ease;
}

.perfil:hover svg {
  transform: scale(1.05);
}
</style>
