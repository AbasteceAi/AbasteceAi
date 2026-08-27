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
.perfil-container{
  display: flex;
  align-items: center;
  margin: 20px;
}
.fotoConta{
  position: relative;
}
.edit{
  position: absolute;
  background-color:#FEC12B ;
  padding: 10px;
  bottom: 5px;
 border-radius: 50%;

}
.editIcon{
  width: 30px;
  height: 30px;
}
.foto{
  width: 50%;
  border-radius: 50%;
  border: 5px solid #FEC12B;
}
.nome {
  font-size: 3rem;
  color: #334582;
  font-weight: bold;
}
.ponto{
  height: 10px;
  width: 10px;
   fill: #002492;
}
.ava{
  font-size: 20px;
 color: rgba(0, 0, 0, 0.753);
}
</style>
