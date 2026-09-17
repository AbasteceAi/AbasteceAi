<script setup>
import { ref, watch } from 'vue'
import { atualizarPerfil, uploadFotoPerfil } from '@/services/perfil'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  userId: { type: String, required: true },
  nomeAtual: { type: String, default: '' },
  fotoAtual: { type: String, default: null },
})

const emit = defineEmits(['update:modelValue', 'salvo'])

const nome = ref(props.nomeAtual)
const fotoUrl = ref(props.fotoAtual)
const salvando = ref(false)
const enviandoFoto = ref(false)
const mensagem = ref('')
const erro = ref('')

watch(
  () => props.modelValue,
  (aberto) => {
    if (aberto) {
      nome.value = props.nomeAtual
      fotoUrl.value = props.fotoAtual
      mensagem.value = ''
      erro.value = ''
    }
  },
)

function fechar() {
  if (salvando.value) return
  emit('update:modelValue', false)
}

async function salvar() {
  erro.value = ''
  mensagem.value = ''
  salvando.value = true

  try {
    await atualizarPerfil(props.userId, { nome: nome.value })
    emit('salvo', { nome: nome.value, fotoUrl: fotoUrl.value })
    emit('update:modelValue', false)
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
    fotoUrl.value = await uploadFotoPerfil(file, props.userId)
    emit('salvo', { nome: nome.value, fotoUrl: fotoUrl.value })
  } catch (e) {
    erro.value = e.message
  } finally {
    enviandoFoto.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade-modal">
      <div v-if="modelValue" class="overlay" @click.self="fechar">
        <div class="cartao">
          <div class="topo">
            <button type="button" class="btn-voltar" @click="fechar" aria-label="Fechar">
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
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 9, 41, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  z-index: 1000;
}

.cartao {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  background-color: #334582;
  border-radius: 24px;
  overflow-x: hidden;
  padding-bottom: 40px;
  box-shadow: 0 22px 48px rgba(0, 36, 146, 0.3);
}

.topo {
  position: relative;
  height: 120px;
  background: linear-gradient(100deg, #002492 20%, #334582 42%, #fec12b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.titulo {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: #ffffff;
}

.btn-voltar {
  position: absolute;
  left: 22px;
  width: 44px;
  height: 44px;
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
  width: 22px;
  height: 22px;
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
  margin-top: 28px;
}

.moldura-foto {
  position: relative;
  width: 132px;
  height: 132px;
}

.foto,
.sem-foto {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: 5px solid #fec12b;
  object-fit: cover;
  display: block;
  background-color: #4a5a99;
}

.btn-camera {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fec12b;
  border: 3px solid #334582;
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
  width: 19px;
  height: 19px;
  fill: none;
  stroke: #002492;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.link-alterar {
  margin-top: 16px;
  color: #fec12b;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
}

.link-alterar:hover {
  text-decoration: underline;
}

.campos {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding: 40px 40px 0;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.campo span {
  font-size: 16px;
  font-weight: 600;
  color: #dfe3f2;
}

.campo input {
  width: 100%;
  padding: 16px 18px;
  border: 1px solid #4a5a99;
  border-radius: 12px;
  background-color: #2a3a6f;
  color: #ffffff;
  font-size: 17px;
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
  margin: 18px 40px 0;
  font-size: 15px;
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
  width: calc(100% - 80px);
  margin: 32px 40px 0;
  padding: 18px;
  border: none;
  border-radius: 12px;
  background-color: #fec12b;
  color: #002492;
  font-size: 18px;
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

.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.2s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
</style>