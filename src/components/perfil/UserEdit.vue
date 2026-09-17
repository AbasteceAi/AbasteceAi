<script setup>
import { ref, onMounted } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarPerfil, atualizarPerfil, uploadFotoPerfil } from '@/services/perfil'
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

async function salvar() {
  erro.value = ''
  mensagem.value = ''
  salvando.value = true

  try {
    await atualizarPerfil(userId.value, { nome: nome.value })
    mensagem.value = 'Alterações salvas!'
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
  <main class="pagina">
    <div v-if="carregando" class="carregando"><img src="/imgs/perso.gif" alt="Carregando" /></div>

    <div v-else class="cartao">
      <div class="topo">
        <button type="button" class="btn-voltar" @click="voltar" aria-label="Voltar">
          <svg viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
        </button>

        <h1 class="titulo">Editar perfil</h1>
      </div>

      <div class="area-foto">
        <div class="moldura-foto">
          <img v-if="fotoUrl" :src="fotoUrl" alt="Foto de perfil" class="foto" />
          <div v-else class="sem-foto"></div>

          <label class="btn-camera" :title="enviandoFoto ? 'Enviando...' : 'Trocar foto'">
            <svg viewBox="0 0 24 24">
              <path
                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
              />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <input
              type="file"
              accept="image/*"
              @change="handleFotoChange"
              :disabled="enviandoFoto"
              hidden
            />
          </label>
        </div>

        <label class="link-alterar">
          {{ enviandoFoto ? 'Enviando foto...' : 'Alterar foto' }}
          <input
            type="file"
            accept="image/*"
            @change="handleFotoChange"
            :disabled="enviandoFoto"
            hidden
          />
        </label>
      </div>

      <div class="campos">
        <label class="campo">
          <span>Nome</span>
          <input v-model="nome" type="text" placeholder="Seu nome" />
        </label>
      </div>

      <p v-if="mensagem" class="sucesso">{{ mensagem }}</p>
      <p v-if="erro" class="erro">{{ erro }}</p>

      <button type="button" class="btn-salvar" :disabled="salvando" @click="salvar">
        {{ salvando ? 'Salvando...' : 'Salvar alterações' }}
      </button>
    </div>
  </main>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.pagina {
  min-height: 100vh;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 70px 20px;
  background-color: #ffffff;
}

.carregando {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.cartao {
  width: 100%;
  max-width: 460px;
  background-color: #334582;
  border-radius: 20px;
  overflow: hidden;
  padding-bottom: 32px;
  box-shadow: 0 18px 40px rgba(0, 36, 146, 0.22);
}

.topo {
  position: relative;
  height: 100px;
  background: linear-gradient(100deg, #002492 20%, #334582 42%, #fec12b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.titulo {
  margin: 0;
  font-size: 22px;
  font-weight: 800;
  color: #ffffff;
}

.btn-voltar {
  position: absolute;
  left: 16px;
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-voltar:hover {
  background-color: rgba(255, 255, 255, 0.38);
}

.btn-voltar svg {
  width: 19px;
  height: 19px;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.area-foto {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
}

.moldura-foto {
  position: relative;
  width: 112px;
  height: 112px;
}

.foto,
.sem-foto {
  width: 112px;
  height: 112px;
  border-radius: 50%;
  border: 4px solid #fec12b;
  object-fit: cover;
  display: block;
  background-color: #4a5a99;
}

.btn-camera {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #fec12b;
  border: 2px solid #334582;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-camera:hover {
  transform: scale(1.08);
}

.btn-camera svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #002492;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.link-alterar {
  margin-top: 12px;
  color: #fec12b;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.link-alterar:hover {
  text-decoration: underline;
}

.campos {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px 32px 0;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.campo span {
  font-size: 14px;
  font-weight: 600;
  color: #dfe3f2;
}

.campo input {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid #4a5a99;
  border-radius: 10px;
  background-color: #2a3a6f;
  color: #ffffff;
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: 0.2s ease;
}

.campo input::placeholder {
  color: #9aa6ce;
}

.campo input:focus {
  border-color: #fec12b;
  box-shadow: 0 0 0 3px rgba(254, 193, 43, 0.22);
}

.sucesso,
.erro {
  margin: 16px 32px 0;
  font-size: 14px;
  font-weight: 600;
  text-align: center;
}

.sucesso {
  color: #9ff0b0;
}

.erro {
  color: #ffb4b4;
}

.btn-salvar {
  display: block;
  width: calc(100% - 64px);
  margin: 26px 32px 0;
  padding: 15px;
  border: none;
  border-radius: 10px;
  background-color: #fec12b;
  color: #002492;
  font-size: 16px;
  font-weight: 800;
  font-family: inherit;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-salvar:hover:not(:disabled) {
  background-color: #f5b719;
  transform: translateY(-2px);
}

.btn-salvar:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>