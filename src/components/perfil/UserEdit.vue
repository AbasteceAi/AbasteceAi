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

.perfil-container {
  min-height: 100vh;
  padding: 25px 40px 40px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.editTit {
  color: #334582;
  margin: 0 0 30px;
  font-size: 2rem;
  font-weight: 700;
}

.foto-section {
  width: 100%;
  max-width: 900px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.foto-wrapper {
  width: 420px;
  height: 420px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
}

.foto-perfil {
  width: 80%;
  height: 80%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
}

.foto-placeholder {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eef1f8;
  color: #334582;
  font-size: 1.2rem;
}

.btn-trocar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #334582;
  color: white;
  padding: 11px 18px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-trocar:hover {
  background-color: #26366d;
  transform: translateY(-1px);
}

.btn-trocar input {
  display: none;
}

.nome-section {
  width: 100%;
  max-width: 900px;
  margin: 30px 160px;
  display: flex;
  align-items: center;
  gap: 12px;
  color: #334582;
}

.nome-section label {
  font-size: 2rem;
  font-weight: 400;
}

.nomePlace {
  width: 190px;
  height: 38px;
  box-sizing: border-box;
  margin: 0;
  padding: 7px 12px;
  border: 2px solid #334582;
  border-radius: 20px;
  font-size: 1rem;
  outline: none;
  transition: 0.2s ease;
}

.nomePlace:focus {
  border-color: #26366d;
  box-shadow: 0 0 0 3px rgba(51, 69, 130, 0.12);
}

.btn-salvar {
  height: 38px;
  padding: 0 16px;
  border-radius: 20px;
  border: 2px solid #334582;
  background-color: white;
  color: #334582;
  font-size: 0.95rem;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-salvar:hover:not(:disabled) {
  background-color: #334582;
  color: white;
}

.btn-salvar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.sucesso,
.erro {
  text-align: center;
  font-size: 1rem;
  margin: 18px 0;
}

.sucesso {
  color: #2f7e3a;
}

.erro {
  color: #7e2f2f;
}

.btn-voltar {
  background-color: #fec12b;
  color: #334582;
  border: none;
  border-radius: 10px;
  padding: 14px 45px;
  margin: 35px auto 0;
  font-size: 1.2rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-voltar:hover {
  background-color: #f5b719;
  transform: translateY(-2px);
}

</style>
