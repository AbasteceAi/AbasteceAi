<script setup>
import { ref, computed } from 'vue'
import { atualizarAvaliacao, excluirAvaliacao } from '@/services/avaliacoes.js'

const props = defineProps({
  avaliacoes: {
    type: Array,
    required: true,
  },
  usuarioAtualId: {
    type: String,
    default: null,
  },
  porPagina: {
    type: Number,
    default: 4,
  },
})

const avaliacoesLocais = ref(props.avaliacoes.map((a) => ({ ...a })))

const quantidadeVisivel = ref(props.porPagina)
const avaliacoesVisiveis = computed(() => avaliacoesLocais.value.slice(0, quantidadeVisivel.value))
const temMaisAvaliacoes = computed(() => quantidadeVisivel.value < avaliacoesLocais.value.length)

function carregarMaisAvaliacoes() {
  quantidadeVisivel.value += props.porPagina
}

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString('pt-BR')
}

function iniciaisDoNome(nome) {
  if (!nome) return '?'
  const partes = nome.trim().split(/\s+/)
  return (partes[0][0] + (partes[1]?.[0] ?? '')).toUpperCase()
}

// --- editar comentário/nota ---
const idEmEdicao = ref(null)
const notaEdicao = ref(0)
const comentarioEdicao = ref('')
const salvandoEdicao = ref(false)

function iniciarEdicao(av) {
  idEmEdicao.value = av.id
  notaEdicao.value = av.nota
  comentarioEdicao.value = av.comentario
}

function cancelarEdicao() {
  idEmEdicao.value = null
}

async function salvarEdicao(av) {
  salvandoEdicao.value = true
  try {
    await atualizarAvaliacao({
      avaliacaoId: av.id,
      nota: notaEdicao.value,
      comentario: comentarioEdicao.value,
    })
    av.nota = notaEdicao.value
    av.comentario = comentarioEdicao.value
    idEmEdicao.value = null
  } catch (e) {
    console.error('Erro ao editar avaliação:', e)
  } finally {
    salvandoEdicao.value = false
  }
}

// --- excluir ---
async function excluir(av) {
  if (!confirm('Tem certeza que deseja excluir sua avaliação?')) return

  try {
    await excluirAvaliacao(av.id)
    avaliacoesLocais.value = avaliacoesLocais.value.filter((a) => a.id !== av.id)
  } catch (e) {
    console.error('Erro ao excluir avaliação:', e)
  }
}
</script>

<template>
  <section class="avaliacoes">
    <h2>Principais avaliações</h2>

    <div class="grade-avaliacoes">
      <article class="avaliacao-card" v-for="av in avaliacoesVisiveis" :key="av.id">
        <div class="cabecalho-avaliacao">
          <img v-if="av.perfil?.foto_url" :src="av.perfil.foto_url" class="avatar-img" alt="" />
          <div v-else class="avatar">{{ iniciaisDoNome(av.perfil?.nome) }}</div>

          <div class="autor">
            <p class="nome">
              {{ av.perfil?.nome ?? 'Usuário' }}
              <span class="qtd">• {{ av.qtdAvaliacoesAutor }} avaliações</span>
            </p>

            <span class="estrelas" v-if="idEmEdicao !== av.id">
              <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" :class="{ cheia: n <= av.nota }">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                />
              </svg>
            </span>
            <span class="estrelas editaveis" v-else>
              <button
                v-for="n in 5"
                :key="n"
                type="button"
                @click="notaEdicao = n"
                :aria-label="`Dar nota ${n}`"
              >
                <svg viewBox="0 0 24 24" :class="{ cheia: n <= notaEdicao }">
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                  />
                </svg>
              </button>
            </span>
          </div>

          <span class="data">{{ formatarData(av.created_at) }}</span>

          <div v-if="av.souAutor && idEmEdicao !== av.id" class="acoes-autor">
            <button type="button" class="icone-acao" title="Editar avaliação" @click="iniciarEdicao(av)">
              <svg viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </button>
            <button type="button" class="icone-acao" title="Excluir avaliação" @click="excluir(av)">
              <svg viewBox="0 0 24 24">
                <path d="M3 6h18" />
                <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              </svg>
            </button>
          </div>
        </div>

        <p v-if="idEmEdicao !== av.id" class="comentario">"{{ av.comentario }}"</p>
        <textarea v-else class="comentario-edicao" v-model="comentarioEdicao" rows="3" />

        <div v-if="idEmEdicao === av.id" class="acoes-edicao">
          <button type="button" class="btn-cancelar-edicao" @click="cancelarEdicao">Cancelar</button>
          <button
            type="button"
            class="btn-salvar-edicao"
            :disabled="salvandoEdicao"
            @click="salvarEdicao(av)"
          >
            {{ salvandoEdicao ? 'Salvando...' : 'Salvar' }}
          </button>
        </div>
      </article>
    </div>

    <button class="btn-mais" v-if="temMaisAvaliacoes" @click="carregarMaisAvaliacoes">
      Carregar mais avaliações
    </button>
  </section>
</template>

<style scoped>
.avaliacoes h2 {
  color: #fec12b;
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 24px;
}

.grade-avaliacoes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.avaliacao-card {
  border: 1px solid #334582;
  border-radius: 12px;
  padding: 18px 20px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cabecalho-avaliacao {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.avatar,
.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
}

.avatar {
  background-color: #334582;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
}

.avatar-img {
  object-fit: cover;
}

.autor {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nome {
  font-weight: 700;
  color: #002492;
  font-size: 15px;
}

.qtd {
  font-weight: 400;
  color: #6b7280;
  font-size: 13px;
}

.estrelas {
  display: flex;
  gap: 2px;
}

.estrelas.editaveis button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.estrelas svg {
  width: 14px;
  height: 14px;
  fill: #d9dced;
}

.estrelas svg.cheia {
  fill: #fec12b;
}

.data {
  color: #fec12b;
  font-weight: 700;
  font-size: 13px;
  white-space: nowrap;
}

.acoes-autor {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.icone-acao {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  display: flex;
}

.icone-acao svg {
  width: 16px;
  height: 16px;
  fill: none;
  stroke: #6b7280;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icone-acao:hover {
  background-color: #f4f5fa;
}

.icone-acao:hover svg {
  stroke: #334582;
}

.comentario {
  font-size: 14px;
  font-style: italic;
  color: #334582;
  line-height: 1.5;
}

.comentario-edicao {
  width: 100%;
  background: #f4f5fa;
  border: 1px solid #e1e4f0;
  border-radius: 8px;
  color: #334582;
  padding: 10px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  box-sizing: border-box;
}

.acoes-edicao {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-cancelar-edicao,
.btn-salvar-edicao {
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
}

.btn-cancelar-edicao {
  background: transparent;
  color: #334582;
}

.btn-salvar-edicao {
  background-color: #fec12b;
  color: #002492;
}

.btn-salvar-edicao:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-mais {
  display: block;
  margin: 0 auto;
  background-color: #fec12b;
  color: #002492;
  border: none;
  padding: 14px 36px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.15s ease;
}

.btn-mais:hover {
  transform: scale(1.03);
}

@media (max-width: 800px) {
  .grade-avaliacoes {
    grid-template-columns: 1fr;
  }
}
</style>