<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="overlay" @click.self="fechar">
        <div class="modal">
          <!-- Cabeçalho -->
          <div class="header">
            <img v-if="logoUrl" :src="logoUrl" class="logo" alt="" />
            <h2 class="titulo">{{ titulo }}</h2>
            <button class="favorito" @click="favoritado = !favoritado" :aria-pressed="favoritado">
              <span :class="{ ativo: favoritado }">★</span>
            </button>
        </div>

          <!-- Corpo -->
          <div class="corpo">
            <div class="usuario">
              <img :src="usuarioAvatar" class="avatar" alt="" />
              <strong class="usuario-nome">{{ usuarioNome }}</strong>
            </div>

            <div class="estrelas">
              <button
                v-for="n in 5"
                :key="n"
                class="estrela"
                :class="{ preenchida: n <= (hoverNota || nota) }"
                @click="nota = n"
                @mouseenter="hoverNota = n"
                @mouseleave="hoverNota = 0"
                :aria-label="`Dar nota ${n}`"
              >★</button>
            </div>

            <textarea
              v-model="comentario"
              class="comentario"
              placeholder="Descreva como foi a sua experiência neste posto"
              rows="4"
            />
          </div>

          <!-- Ações -->
          <div class="acoes">
            <button class="btn btn-cancelar" @click="fechar">Cancelar</button>
            <button class="btn btn-postar" :disabled="!nota" @click="postar">Postar</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },     // v-model para abrir/fechar
  titulo: { type: String, default: 'Avaliação' },
  logoUrl: { type: String, default: '' },
  usuarioNome: { type: String, default: '' },
  usuarioAvatar: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'postar'])

const nota = ref(0)
const hoverNota = ref(0)
const comentario = ref('')
const favoritado = ref(false)

// reseta o formulário toda vez que o modal é reaberto
watch(() => props.modelValue, (aberto) => {
  if (aberto) {
    nota.value = 0
    comentario.value = ''
  }
})

function fechar() {
  emit('update:modelValue', false)
}

function postar() {
  emit('postar', { nota: nota.value, comentario: comentario.value })
  fechar()
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  width: 420px;
  max-width: 90vw;
  background: #2b3a67;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.header {
  background: #f2b705;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.logo { width: 24px; height: 24px; border-radius: 4px; }
.titulo { flex: 1; font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 0; }
.favorito { background: none; border: none; cursor: pointer; font-size: 20px; color: #1a1a1a; }
.favorito .ativo { color: #ffffff; }
.hint-favorito {
  display: block;
  text-align: right;
  font-size: 11px;
  color: #f2b705;
  padding: 2px 16px 0;
}

.corpo { padding: 20px; }
.usuario { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
.usuario-nome { color: #fff; font-size: 16px; }

.estrelas { display: flex; gap: 6px; margin-bottom: 16px; }
.estrela {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 26px;
  color: #6b7aa8;
  transition: color 0.15s;
}
.estrela.preenchida { color: #f2b705; }

.comentario {
  width: 100%;
  background: #3a4a7a;
  border: none;
  border-radius: 8px;
  color: #fff;
  padding: 12px;
  font-size: 14px;
  resize: none;
  box-sizing: border-box;
}
.comentario::placeholder { color: #b7c0dd; }

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 20px;
}
.btn { border: none; border-radius: 8px; padding: 10px 20px; font-size: 15px; cursor: pointer; }
.btn-cancelar { background: transparent; color: #f2b705; }
.btn-postar { background: #f2b705; color: #1a1a1a; font-weight: 600; }
.btn-postar:disabled { opacity: 0.5; cursor: not-allowed; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>