<script setup>
import { ref, onMounted } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarPerfil, atualizarNome, uploadFotoPerfil } from '@/services/perfil'
import { useRouter } from 'vue-router'

const router = useRouter()
const userId = ref(null)
const nome = ref('')
const fotoUrl = ref(null)
const carregando = ref(true)
const salvando = ref(false)
const enviandoFoto = ref(false)
const mensagem = ref('')
const erro = ref('')

onMounted(async () => {
  const user = await usuarioAtual()
  if (!user) return

  userId.value = user.id

  const perfil = await buscarPerfil(user.id)
  nome.value = perfil?.nome ?? ''
  fotoUrl.value = perfil?.foto_url ?? null

  carregando.value = false
})

async function salvarNome() {
  erro.value = ''
  mensagem.value = ''
  salvando.value = true

  try {
    await atualizarNome(userId.value, nome.value)
    mensagem.value = 'Nome atualizado!'
  } catch (e) {
    erro.value = e.message
  } finally {
    salvando.value = false
  }
}

async function handleFotoChange(e) {
  const file = e.target.files[0]
  if (!file) return

  erro.value = ''
  enviandoFoto.value = true

  try {
    fotoUrl.value = await uploadFotoPerfil(file, userId.value)
  } catch (e) {
    erro.value = e.message
  } finally {
    enviandoFoto.value = false
  }
}

function voltar() {
  router.push('/perfil')
}
</script>

<template>
  <div v-if="carregando" class="carregando">Carregando perfil...</div>

  <div v-else class="perfil-container">
    <h1 class="editTit">Editar Perfil</h1>

    <div class="foto-section">
      <div class="foto-wrapper">
        <img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil" class="foto-perfil" />
        <div v-else class="foto-placeholder">Sem foto</div>
      </div>

      <label class="btn-trocar">
        {{ enviandoFoto ? 'Salvando..' : 'Trocar foto' }}
        <input type="file" accept="image/*" @change="handleFotoChange" :disabled="enviandoFoto" hidden />
      </label>
    </div>

    <div class="nome-section">
      <label for="nome">Nome</label>
      <input id="nome" v-model="nome" type="text" placeholder="Seu nome" class="nomePlace" />
      <button @click="salvarNome" :disabled="salvando" class="btn-salvar">
        {{ salvando ? 'Salvando...' : 'Salvar nome' }}
      </button>
    </div>

    <p v-if="mensagem" class="sucesso">{{ mensagem }}</p>
    <p v-if="erro" class="erro">{{ erro }}</p>

    <button class="btn-voltar" @click="voltar">Voltar</button>
  </div>
</template>

<style scoped>
.editTit{
color: #334582;
margin: 20px;
font-size: 2rem;
}
.foto-section{
  display: flex;
  align-items: center;
  gap: 5px;
}
.foto-perfil{
  width: 60%;
  border-radius: 50%;
}
.btn-trocar{
  background-color: #334582;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  left: 5px;
}
.btn-voltar {
  background-color: #FEC12B;
  border: none;
 padding: 20px 40px;
 margin: 10px auto;
 border-radius: 10px;
 font-size: 20px;
 display: flex;
 justify-content: center;
 color: #334582;
}
.nome-section{
  margin: 2vw 20px;
  font-size: 2rem;
  color: #334582;
}
.nome{
  margin: 5px;
}
.nomePlace{
  margin: 10px;
  border: 2px solid #334582;
 border-radius: 20px;
 padding: 5px;
}
.btn-salvar{
  padding: 5px 10px ;
border-radius: 20px;
border: 2px solid #334582;
}
.sucesso{
  text-align: center;
  color: #2F7E3A ;
  font-size: 2rem;
}
.erro{
  text-align: center;
  color: #7E2F2F ;
  font-size: 2rem;
}
</style>
