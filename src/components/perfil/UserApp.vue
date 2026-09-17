<script setup>
import { ref, computed, watch } from 'vue'
import { usuarioAtual } from '@/services/auth'
import { buscarPerfil } from '@/services/perfil'
import { buscarAvaliacoesDoUsuario } from '@/services/avaliacoes'
import ModalEditarPerfil from '@/components/perfil/ModalEditarPerfil.vue'

const props = defineProps({
  userId: {
    type: String,
    default: null,
  },
})

const idExibido = ref(null)
const nome = ref('')
const fotoUrl = ref(null)
const carregando = ref(true)
const avaliacoes = ref([])
const membroDesde = ref(null)

const somenteLeitura = computed(() => !!props.userId)

async function carregar() {
  carregando.value = true

  if (props.userId) {
    idExibido.value = props.userId
  } else {
    const user = await usuarioAtual()
    if (!user) return
    idExibido.value = user.id
    membroDesde.value = user.created_at
  }

  const perfil = await buscarPerfil(idExibido.value)
  nome.value = perfil?.nome ?? ''
  fotoUrl.value = perfil?.foto_url ?? null
  avaliacoes.value = await buscarAvaliacoesDoUsuario(idExibido.value)

  carregando.value = false
}

watch(
  () => props.userId,
  () => carregar(),
  { immediate: true },
)

const nomeFormatado = computed(() => {
  if (!nome.value) return 'Nome não definido'
  return nome.value.charAt(0).toUpperCase() + nome.value.slice(1)
})

const mediaAvaliacoes = computed(() => {
  if (avaliacoes.value.length === 0) return null
  const soma = avaliacoes.value.reduce((total, a) => total + a.nota, 0)
  return (soma / avaliacoes.value.length).toFixed(1)
})

const dataEntrada = computed(() => {
  if (!membroDesde.value) return ''
  return new Date(membroDesde.value).toLocaleDateString('pt-BR')
})

const modalAberto = ref(false)

function aoSalvarEdicao({ nome: novoNome, fotoUrl: novaFoto }) {
  nome.value = novoNome
  fotoUrl.value = novaFoto
}
</script>

<template>
  <div v-if="carregando" class="carregando"><img src="/imgs/perso.gif" alt="Carregando" /></div>

  <div v-else class="cabecalho-perfil">
    <div class="faixa-gradiente">
     <img src="/public/imgs/imgbannerperfil.png" alt="Banner gradiente">
    </div>

    <div class="conteudo-cabecalho">
      <div class="fotoConta">
        <img v-if="fotoUrl" :src="fotoUrl" alt="Foto do usuário" class="foto" />
        <div v-else class="semFoto">sem foto</div>

        <button
          v-if="!somenteLeitura"
          type="button"
          class="edit"
          title="Editar perfil"
          @click="modalAberto = true"
        >
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 18V13.75L13.2 0.575C13.4 0.391667 13.621 0.25 13.863 0.15C14.105 0.0500001 14.359 0 14.625 0C14.891 0 15.1493 0.0500001 15.4 0.15C15.6507 0.25 15.8673 0.4 16.05 0.6L17.425 2C17.625 2.18333 17.771 2.4 17.863 2.65C17.955 2.9 18.0007 3.15 18 3.4C18 3.66667 17.9543 3.921 17.863 4.163C17.7717 4.405 17.6257 4.62567 17.425 4.825L4.25 18H0ZM14.6 4.8L16 3.4L14.6 2L13.2 3.4L14.6 4.8Z"
              fill="#334582"
            />
          </svg>
        </button>
      </div>

      <div class="dados">
        <h1 class="nome">
          {{ nomeFormatado }}
          <span class="qtd-avaliacoes">
            <span class="ponto"></span>
            {{ avaliacoes.length }}
            <template v-if="avaliacoes.length === 1">Avaliação</template>
            <template v-else>Avaliações</template>
          </span>
        </h1>

        <p class="media">
          Media de avaliações:
          <template v-if="mediaAvaliacoes">
            <span class="valor-media">{{ mediaAvaliacoes }}</span>
            <svg class="estrela-media" viewBox="0 0 24 24">
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
              />
            </svg>
          </template>
          <span v-else class="valor-media">—</span>
        </p>
      </div>

      <p v-if="dataEntrada" class="participa-desde">Participa desde: {{ dataEntrada }}</p>
    </div>

    <ModalEditarPerfil
      v-if="!somenteLeitura"
      v-model="modalAberto"
      :user-id="idExibido"
      :nome-atual="nome"
      :foto-atual="fotoUrl"
      @salvo="aoSalvarEdicao"
    />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.carregando {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.cabecalho-perfil {
  position: relative;
  width: 85%;
  margin: 60px auto 0;
  background-color: #ffffff;
  border-radius: 22px;
  box-shadow: 0 10px 26px rgba(0, 36, 146, 0.12);
  overflow: hidden;
}

.cabecalho-perfil div img {
  width: 100%;
}

.onda-perfil {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.onda-perfil path {
  fill: #fec12b;
}

.conteudo-cabecalho {
  position: relative;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 38px 30px;
}

.fotoConta {
  position: relative;
  width: 172px;
  height: 172px;
  margin-top: -86px;
  flex-shrink: 0;
}

.foto,
.semFoto {
  width: 172px;
  height: 172px;
  border-radius: 50%;
  border: 5px solid #fec12b;
  display: block;
  object-fit: cover;
  background-color: #eef1f8;
}

.semFoto {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #334582;
  font-size: 16px;
}

.edit {
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 40px;
  height: 40px;
  border: 2px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fec12b;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.2s ease;
}

.edit:hover {
  transform: scale(1.1);
}

.edit svg {
  width: 18px;
  height: 18px;
}

.dados {
  flex: 1;
  min-width: 0;
  padding-top: 18px;
}

.nome {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 0 0 8px;
  font-size: 36px;
  font-weight: 800;
  color: #334582;
}

.qtd-avaliacoes {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #fec12b;
}

.ponto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fec12b;
  display: inline-block;
}

.media {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #334582;
}

.valor-media {
  color: #fec12b;
  font-size: 20px;
  font-weight: 800;
}

.estrela-media {
  width: 19px;
  height: 19px;
  fill: #fec12b;
}

.participa-desde {
  position: absolute;
  right: 38px;
  bottom: 22px;
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #334582;
  white-space: nowrap;
}

@media (max-width: 800px) {
  .cabecalho-perfil {
    width: 92%;
  }

  .conteudo-cabecalho {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 20px 22px;
  }

  .nome {
    justify-content: center;
    font-size: 28px;
  }

  .media {
    justify-content: center;
  }

  .participa-desde {
    position: static;
    margin-top: 12px;
  }
}
</style>