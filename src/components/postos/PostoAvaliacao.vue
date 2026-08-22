<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  avaliacoes: {
    type: Array,
    required: true,
    
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

function alternarUtil(avaliacao) {
  avaliacao.marcouUtil = !avaliacao.marcouUtil
  avaliacao.util += avaliacao.marcouUtil ? 1 : -1
}
</script>

<template>
  <section class="avaliacoes">
    <h2>Principais avaliações</h2>

    <div class="grade-avaliacoes">
      <article class="avaliacao-card" v-for="av in avaliacoesVisiveis" :key="av.id">
        <div class="cabecalho-avaliacao">
          <div class="avatar" :style="{ backgroundColor: av.cor }">{{ av.iniciais }}</div>
          <div class="autor">
            <p class="nome">
              {{ av.nome }} <span class="qtd">• {{ av.qtdAvaliacoes }} avaliações</span>
            </p>
            <span class="estrelas">
              <svg v-for="n in 5" :key="n" viewBox="0 0 24 24" :class="{ cheia: n <= av.nota }">
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                />
              </svg>
            </span>
          </div>
          <span class="data">{{ av.data }}</span>
        </div>

        <p class="comentario">"{{ av.comentario }}"</p>

        <button class="util" :class="{ marcado: av.marcouUtil }" @click="alternarUtil(av)">
          Útil ({{ av.util }})
        </button>
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

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
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

.comentario {
  font-size: 14px;
  font-style: italic;
  color: #334582;
  line-height: 1.5;
}

.util {
  align-self: flex-start;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
}

.util:hover {
  color: #334582;
  text-decoration: underline;
}

.util.marcado {
  color: #334582;
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