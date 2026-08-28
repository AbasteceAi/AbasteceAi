<script setup>
import { ref, onMounted } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarPerfil } from '@/services/perfil'
import { buscarAvaliacoesDoUsuario } from '@/services/avaliacoes'
import { RouterLink } from 'vue-router'
const nome = ref('')
const fotoUrl = ref(null)
const carregando = ref(true)
const avaliacoes = ref([])

onMounted(async () => {
  const user = await usuarioAtual()
  if (!user) return

  const perfil = await buscarPerfil(user.id)
  nome.value = perfil?.nome ?? ''
  fotoUrl.value = perfil?.foto_url ?? null
 avaliacoes.value = await buscarAvaliacoesDoUsuario(user.id)

  carregando.value = false
})

</script>

<template>
  <div v-if="carregando" class="carregando"><img src="/imgs/perso.gif" ></div>

  <div v-else class="perfil-container">
   <div class="fotoConta">
   <img v-if="fotoUrl" :src="fotoUrl" alt="Foto Usuario" class="foto">
   <div v-else class="semFto"> sem foto</div>

    <RouterLink to="/perfil/editar" class="edit">
    <svg class="editIcon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.891 0 15.1493 0.0500001 15.4 0.15C15.6507 0.25 15.8673 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM14.6 4.8L16 3.4L14.6 2L13.2 3.4L14.6 4.8Z" fill="#334582"/>
</svg>
    </RouterLink>

   </div>
   <div class="nome">
    <p>{{ nome.charAt(0).toUpperCase() + nome.slice(1) || 'Nome não definido' }}</p>
    <p class="ava"> <span> <svg class="ponto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve"><circle cx="60" cy="60.834" r="54.167"/></svg></span>
    {{ avaliacoes.length }} <span v-if="avaliacoes.length == 1">avaliação</span>
     <span v-else>avaliações</span>
    </p>
   </div>
  </div>
</template>

<style scoped>

* {
  box-sizing: border-box;
}

.perfil-container {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 85%;
  margin: 80px auto 15px;
  color: #334582;
}

.fotoConta {
  position: relative;
  width: 155px;
  height: 155px;
  flex-shrink: 0;
}

.foto {
  width: 155px;
  height: 155px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #fec12b;
  display: block;
}

.semFto {
  width: 155px;
  height: 155px;
  border-radius: 50%;
  border: 2px solid #fec12b;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;
  color: #334582;
  font-size: 16px;
}

.edit {
  position: absolute;
  right: 3px;
  bottom: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fec12b;
  border-radius: 50%;
  text-decoration: none;
  transition: 0.2s ease;
}

.edit:hover {
  transform: scale(1.08);
}

.editIcon {
  width: 17px;
  height: 17px;
}

.nome {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #334582;
}

.nome > p:first-child {
  margin: 0 0 2px;
  font-size: 28px;
  font-weight: 700;
}

.ava {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-size: 17px;
  font-weight: 400;
  color: #222;
}

.ponto {
  width: 8px;
  height: 8px;
  fill: #002492;
  display: block;
}

.avaliacoes-container {
  width: 85%;
  margin: 0 auto;
}

.titulo-avaliacoes {
  margin: 0 0 15px 8px;
  color: #273866;
  font-size: 20px;
  font-weight: 700;
}

.avaliacao-card {
  width: 100%;
  min-height: 87px;
  margin-bottom: 38px;
  padding: 12px 25px;
  display: flex;
  align-items: center;
  background-color: #384e8c;
  border-radius: 20px;
  color: white;
}

.logo-posto {
  width: 62px;
  height: 62px;
  margin-right: 25px;
  border-radius: 50%;
  object-fit: contain;
}

.avaliacao-info {
  flex: 1;
  min-width: 0;
}

.nome-posto {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 4px;
  font-size: 23px;
  font-weight: 700;
}

.estrelas {
  font-size: 22px;
  letter-spacing: 1px;
  white-space: nowrap;
}

.comentario {
  max-width: 650px;
  margin: 0;
  font-size: 11px;
  line-height: 1.4;
  color: white;
}

.data {
  align-self: flex-start;
  margin-left: 20px;
  font-size: 16px;
  white-space: nowrap;
}
</style>
