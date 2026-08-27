<script setup>
import { ref, computed, watch } from 'vue'
import { usuarioAtual } from '@/services/auth.js'
import { enviarAvaliacao, atualizarPreco } from '@/services/postos.js'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  posto: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue', 'salvo'])

const nota = ref(0)
const hoverNota = ref(0)
const comentario = ref('')

const quererAtualizarPreco = ref(false)
const tipoCombustivelSelecionado = ref('')
const novoPreco = ref('')
const cnpjDigitado = ref('')

const enviando = ref(false)
const erro = ref('')

const tiposCombustivelDoPosto = computed(() => props.posto?.precos?.map((p) => p.tipo_combustivel) ?? [])

watch(
  () => props.modelValue,
  (aberto) => {
    if (aberto) {
      nota.value = 0
      comentario.value = ''
      quererAtualizarPreco.value = false
      tipoCombustivelSelecionado.value = ''
      novoPreco.value = ''
      cnpjDigitado.value = ''
      erro.value = ''
    }
  },
)

function alternarAtualizarPreco() {
  quererAtualizarPreco.value = !quererAtualizarPreco.value
  erro.value = ''
}

function fechar() {
  if (enviando.value) return
  emit('update:modelValue', false)
}

function normalizarCnpj(valor) {
  return (valor ?? '').replace(/[^\d]/g, '')
}

async function salvar() {
  erro.value = ''

  if (nota.value === 0 && !quererAtualizarPreco.value) {
    erro.value = 'Selecione uma nota para avaliar o posto.'
    return
  }

  if (quererAtualizarPreco.value) {
    if (!tipoCombustivelSelecionado.value) {
      erro.value = 'Selecione o tipo de combustível.'
      return
    }
    if (!novoPreco.value || Number(novoPreco.value) <= 0) {
      erro.value = 'Informe um preço válido.'
      return
    }
    if (!cnpjDigitado.value) {
      erro.value = 'Informe o CNPJ do posto para confirmar a atualização.'
      return
    }
    if (normalizarCnpj(cnpjDigitado.value) !== normalizarCnpj(props.posto.cnpj)) {
      erro.value = 'CNPJ incorreto. Verifique o número e tente novamente.'
      return
    }
  }

  const usuario = await usuarioAtual()
  if (!usuario) {
    erro.value = 'Você precisa estar logado para enviar uma avaliação.'
    return
  }

  enviando.value = true
  try {
    if (nota.value > 0) {
      await enviarAvaliacao({
        postoId: props.posto.id,
        usuarioId: usuario.id,
        nota: nota.value,
        comentario: comentario.value,
      })
    }

    if (quererAtualizarPreco.value) {
      await atualizarPreco({
        postoId: props.posto.id,
        tipoCombustivel: tipoCombustivelSelecionado.value,
        novoPreco: Number(novoPreco.value),
      })
    }

    emit('salvo')
    emit('update:modelValue', false)
  } catch {
    erro.value = 'Não foi possível salvar. Tente novamente em instantes.'
  } finally {
    enviando.value = false
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="overlay" @click.self="fechar">
        <div class="modal">
          <div class="cabecalho">
            <img v-if="posto.foto_url" :src="posto.foto_url" class="logo-posto" alt="" />
            <h2 class="titulo">{{ posto.nome }}</h2>
          </div>

          <div class="corpo">
            <p class="rotulo">Sua avaliação</p>
            <div class="estrelas">
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                class="estrela"
                :class="{ preenchida: n <= (hoverNota || nota) }"
                @click="nota = n"
                @mouseenter="hoverNota = n"
                @mouseleave="hoverNota = 0"
                :aria-label="`Dar nota ${n}`"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                  />
                </svg>
              </button>
            </div>

            <textarea
              v-model="comentario"
              class="comentario"
              placeholder="Descreva como foi a sua experiência neste posto"
              rows="4"
            />

            <button type="button" class="btn-atualizar-preco" @click="alternarAtualizarPreco">
              <span>Deseja atualizar preço?</span>
              <svg
                class="seta"
                :class="{ aberta: quererAtualizarPreco }"
                viewBox="0 0 24 24"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <Transition name="expand">
              <div v-if="quererAtualizarPreco" class="secao-preco">
                <label class="campo">
                  <span>Combustível</span>
                  <select v-model="tipoCombustivelSelecionado">
                    <option value="" disabled>Selecione o combustível</option>
                    <option v-for="tipo in tiposCombustivelDoPosto" :key="tipo" :value="tipo">
                      {{ tipo }}
                    </option>
                  </select>
                </label>

                <label class="campo">
                  <span>Novo preço (R$)</span>
                  <input
                    v-model="novoPreco"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="Ex: 5,79"
                  />
                </label>

                <label class="campo">
                  <span>CNPJ do posto (verificação)</span>
                  <input
                    v-model="cnpjDigitado"
                    type="text"
                    placeholder="Digite o CNPJ para confirmar"
                  />
                </label>
              </div>
            </Transition>

            <p v-if="erro" class="mensagem-erro">{{ erro }}</p>
          </div>

          <div class="acoes">
            <button type="button" class="btn btn-cancelar" @click="fechar" :disabled="enviando">
              Cancelar
            </button>
            <button type="button" class="btn btn-salvar" @click="salvar" :disabled="enviando">
              {{ enviando ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 9, 41, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
}

.modal {
  width: 440px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  background: #fff;
  border-radius: 16px;
  overflow-x: hidden;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.35);
}

.cabecalho {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 22px;
  background-color: #334582;
}

.logo-posto {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: contain;
  background: #fff;
}

.titulo {
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  margin: 0;
}

.corpo {
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.rotulo {
  font-size: 14px;
  font-weight: 700;
  color: #334582;
  margin: 0;
}

.estrelas {
  display: flex;
  gap: 6px;
}

.estrela {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.estrela svg {
  width: 28px;
  height: 28px;
  fill: #d9dced;
  transition: fill 0.15s ease;
}

.estrela.preenchida svg {
  fill: #fec12b;
}

.comentario {
  width: 100%;
  background: #f4f5fa;
  border: 1px solid #e1e4f0;
  border-radius: 10px;
  color: #334582;
  padding: 12px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
}

.comentario::placeholder {
  color: #9aa2c1;
}

.btn-atualizar-preco {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f4f5fa;
  border: 1px dashed #334582;
  border-radius: 10px;
  padding: 12px 16px;
  color: #334582;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.btn-atualizar-preco .seta {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #334582;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: transform 0.2s ease;
}

.btn-atualizar-preco .seta.aberta {
  transform: rotate(180deg);
}

.secao-preco {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 14px 16px;
  background-color: #f4f5fa;
  border: 1px solid #e1e4f0;
  border-radius: 10px;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #334582;
}

.campo select,
.campo input {
  border: 1px solid #d9dced;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: #002492;
  font-family: inherit;
}

.mensagem-erro {
  margin: 0;
  color: #c62828;
  font-size: 13px;
  font-weight: 600;
}

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px 22px 22px;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 12px 22px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancelar {
  background: transparent;
  color: #334582;
}

.btn-salvar {
  background: #fec12b;
  color: #002492;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.expand-enter-active,
.expand-leave-active {
  transition:
    max-height 0.25s ease,
    opacity 0.2s ease;
  max-height: 260px;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>