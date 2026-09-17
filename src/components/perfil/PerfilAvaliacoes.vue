<script setup>
import { ref, watch } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarAvaliacoesDoUsuario } from '@/services/avaliacoes'
import { extrairBairro } from '@/services/postos'

const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
})

const avaliacoes = ref([])
const carregando = ref(true)

async function carregar() {
  carregando.value = true

  let id = props.userId
  if (!id) {
    const user = await usuarioAtual()
    if (!user) return
    id = user.id
  }

  avaliacoes.value = await buscarAvaliacoesDoUsuario(id)
  carregando.value = false
}


watch(() => props.userId, carregar, { immediate: true })

function formatarData(dataISO) {
  return new Date(dataISO).toLocaleDateString('pt-BR')
}
</script>

<template>
  <section class="avaliacoes">
    <h2 class="titulo">Avaliações Recentes</h2>

    <div v-if="carregando" class="estado"><img src="/imgs/perso.gif" alt="Carregando" /></div>

    <p v-else-if="avaliacoes.length === 0" class="estado vazio">
      Você ainda não avaliou nenhum posto.
    </p>

    <div v-else class="lista">
      <article v-for="avaliacao in avaliacoes" :key="avaliacao.id" class="card">
        <div class="moldura-logo">
          <img
            v-if="avaliacao.postos?.foto_url"
            :src="avaliacao.postos.foto_url"
            :alt="avaliacao.postos?.nome"
            class="logo"
          />
        </div>

        <div class="conteudo">
          <div class="linha-topo">
            <h3 class="nome-posto">
              {{ avaliacao.postos?.nome ?? 'Posto removido' }}
              <template v-if="extrairBairro(avaliacao.postos?.endereco)">
                - {{ extrairBairro(avaliacao.postos?.endereco) }}
              </template>

              <span class="estrelas">
                <svg
                  v-for="n in 5"
                  :key="n"
                  viewBox="0 0 24 24"
                  :class="{ ativa: n <= avaliacao.nota }"
                >
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
                  />
                </svg>
              </span>
            </h3>

            <span class="data">{{ formatarData(avaliacao.created_at) }}</span>
          </div>

          <p class="comentario">"{{ avaliacao.comentario }}"</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.avaliacoes {
  width: 85%;
  margin: 40px auto 70px;
}

.titulo {
  margin: 0 0 20px;
  font-size: 27px;
  font-weight: 800;
  color: #1f2b54;
}

.estado {
  display: flex;
  justify-content: center;
  padding: 30px 0;
}

.vazio {
  color: #334582;
  font-size: 16px;
}

.lista {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 14px;
}

.lista::-webkit-scrollbar {
  width: 8px;
}

.lista::-webkit-scrollbar-track {
  background: #eef1f8;
  border-radius: 10px;
}

.lista::-webkit-scrollbar-thumb {
  background: #fec12b;
  border-radius: 10px;
}

.lista {
  scrollbar-width: thin;
  scrollbar-color: #fec12b #eef1f8;
}

.card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 26px 34px;
  background-color: #334582;
  border-radius: 18px;
  color: #ffffff;
}

.moldura-logo {
  width: 66px;
  height: 66px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #ffffff;
  overflow: hidden;
}

.logo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  border-radius: 50%;
}

.conteudo {
  flex: 1;
  min-width: 0;
}

.linha-topo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.nome-posto {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
}

.estrelas {
  display: inline-flex;
  gap: 2px;
}

.estrelas svg {
  width: 23px;
  height: 23px;
  fill: #5d6ca8;
}

.estrelas svg.ativa {
  fill: #ffffff;
}

.data {
  font-size: 17px;
  font-weight: 600;
  white-space: nowrap;
}

.comentario {
  margin: 6px 0 0;
  padding: 5px;
  font-size: 17px;
  line-height: 1.5;
  color: #dfe3f2;
}

@media (max-width: 800px) {
  .avaliacoes {
    width: 92%;
  }

  .linha-topo {
    flex-direction: column;
    gap: 6px;
  }

  .nome-posto {
    font-size: 17px;
  }
}
</style>