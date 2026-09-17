<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const cards = ref([

  {
    id: 'precos-tempo-real',
    icone: '/imgs/icone-grafico.png',
    titulo: 'Preços em tempo real',
    texto: 'Acompanhe a variação dos preços dos combustíveis em tempo real.',
  },
  {
    id: 'favoritos',
    icone: '/imgs/icone-estrela.png',
    titulo: 'Postos favoritos',
    texto:
      'Favorite seus postos preferidos e acompanhe as atualizações de mudanças de preço com mais facilidade.',
  },
  {
    id: 'navegar',
    icone: '/imgs/icone-mapa.png',
    titulo: 'Navegue pelos postos',
    texto: 'Veja quais estão mais próximos de você.',
  },
  {
    id: 'pesquisar',
    icone: '/imgs/icone-combustivel.png',
    titulo: 'Pesquise postos',
    texto: 'Pesquise e consulte informações sobre todos os postos de Joinville.',
  },
  {
    id: 'perfil',
    icone: '/imgs/icone-grupo.png',
    titulo: 'Gerencie seu perfil',
    texto: 'Avalie postos, visualize avaliações e conheça outros usuários.',
  },
])

const ativo = ref(Math.floor(cards.value.length / 2))
const larguraTela = ref(typeof window !== 'undefined' ? window.innerWidth : 1200)

function aoRedimensionar() {
  larguraTela.value = window.innerWidth
}

onMounted(() => window.addEventListener('resize', aoRedimensionar))
onUnmounted(() => window.removeEventListener('resize', aoRedimensionar))

const passo = computed(() => (larguraTela.value <= 700 ? 250 + 20 : 300 + 30))
const metadeCard = computed(() => (larguraTela.value <= 700 ? 125 : 150))

const deslocamento = computed(() => `translateX(${-ativo.value * passo.value}px)`)

function anterior() {
  ativo.value = ativo.value === 0 ? cards.value.length - 1 : ativo.value - 1
}

function proximo() {
  ativo.value = ativo.value === cards.value.length - 1 ? 0 : ativo.value + 1
}

function irPara(indice) {
  ativo.value = indice
}
</script>

<template>
  <section class="secao-carrossel">
    <div class="carrossel">
      <button type="button" class="seta seta-esq" @click="anterior" aria-label="Card anterior">
        <svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
      </button>

      <div class="janela">
        <div
          class="trilha"
          :style="{ transform: deslocamento, marginLeft: `-${metadeCard}px` }"
        >
          <article
            v-for="(card, i) in cards"
            :key="card.id"
            class="card"
            :class="{ destaque: i === ativo }"
            @click="irPara(i)"
          >
            <div class="icone">
              <span
                v-if="card.icone"
                class="icone-simbolo"
                :style="{ '--icone-img': `url(${card.icone})` }"
              ></span>
            </div>
            <h2>{{ card.titulo }}</h2>
            <p>{{ card.texto }}</p>
          </article>
        </div>
      </div>

      <button type="button" class="seta seta-dir" @click="proximo" aria-label="Próximo card">
        <svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
      </button>
    </div>

    <div class="indicadores">
      <button
        v-for="(card, i) in cards"
        :key="card.id"
        type="button"
        class="tracinho"
        :class="{ ativo: i === ativo }"
        :aria-label="`Ir para o card ${i + 1}`"
        @click="irPara(i)"
      />
    </div>
  </section>
</template>

<style scoped>
.secao-carrossel {
  width: 100%;
  background-color: #ffffff;
  padding: 95px 0 90px;
  box-sizing: border-box;
  overflow: hidden;
}

.carrossel {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.janela {
  width: 100%;
  overflow: hidden;
  padding: 55px 0 30px;
}

.trilha {
  display: flex;
  gap: 30px;
  position: relative;
  left: 50%;
  transition: transform 0.6s cubic-bezier(0.65, 0, 0.35, 1);
}

.card {
  position: relative;
  width: 300px;
  min-height: 360px;
  flex-shrink: 0;
  box-sizing: border-box;
  padding: 78px 24px 30px;
  border-radius: 14px;
  background-color: #5566a8;
  color: #ffffff;
  cursor: pointer;
  opacity: 0.65;
  transform: scale(0.92);
  transition:
    transform 0.6s cubic-bezier(0.65, 0, 0.35, 1),
    opacity 0.5s ease,
    background-color 0.5s ease;
}

.card.destaque {
  background-color: #334582;
  opacity: 1;
  transform: scale(1.06);
  cursor: default;
  box-shadow: 0 16px 34px rgba(0, 36, 146, 0.28);
  border: 2px solid #fec12b;
}

.icone {
  position: absolute;
  top: -45px;
  left: 50%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #1e326b;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 22px rgba(0, 20, 90, 0.35);
  transition: background-color 0.5s ease;
  z-index: 2;
}

.card.destaque .icone {
  background-color: #fec12b;
}

.icone-simbolo {
  display: block;
  width: 46px;
  height: 46px;
  background-color: #ffffff;
  -webkit-mask-image: var(--icone-img);
  mask-image: var(--icone-img);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
  transition: background-color 0.5s ease;
}

.card.destaque .icone-simbolo {
  background-color: #1e326b;
}

.card h2 {
  margin: 0 0 12px;
  font-size: 23px;
  font-weight: 700;
  text-align: center;
}

.card p {
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: #dfe3f2;
  text-align: center;
  font-weight: 500;
}

.seta {
  position: absolute;
  z-index: 2;
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background-color: #334582;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s ease;
}

.seta:hover {
  background-color: #002492;
  transform: scale(1.08);
}

.seta svg {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: #fec12b;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.seta-esq {
  left: 4%;
}

.seta-dir {
  right: 4%;
}

.indicadores {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 30px;
}

.tracinho {
  width: 34px;
  height: 6px;
  border: none;
  border-radius: 4px;
  background-color: #c5cbe4;
  padding: 0;
  cursor: pointer;
  transition: 0.25s ease;
}

.tracinho.ativo {
  width: 52px;
  background-color: #334582;
}

@media (max-width: 700px) {
  .secao-carrossel {
    padding: 55px 0 60px;
  }

  .janela {
    padding: 45px 0 30px;
  }

  .card {
    width: 250px;
    min-height: 340px;
    padding: 64px 20px 26px;
  }

  .icone {
    top: -36px;
    width: 72px;
    height: 72px;
  }

  .icone-simbolo {
    width: 36px;
    height: 36px;
  }

  .trilha {
    gap: 20px;
  }

  .card h2 {
    font-size: 20px;
  }

  .card p {
    font-size: 15px;
  }

  .seta {
    width: 42px;
    height: 42px;
  }

  .seta-esq {
    left: 2%;
  }

  .seta-dir {
    right: 2%;
  }
}
</style>