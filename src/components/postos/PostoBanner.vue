<script setup>
defineProps({
  posto: {
    type: Object,
    required: true,
  },
  favorito: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['favoritar', 'avaliar'])
</script>

<template>
  <section class="hero">
    <div class="hero-media">
      <img :src="posto.foto_url" alt="" class="logo-posto" />
    </div>

    <div class="hero-info">
      <div class="titulo-row">
        <h1>{{ posto.nome }}</h1>
        <button
          class="favoritar"
          :class="{ ativo: favorito }"
          @click="emit('favoritar')"
          :aria-pressed="favorito"
          aria-label="Favoritar posto"
        >
          <svg viewBox="0 0 329.942 329.942" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M329.208,126.666c-1.765-5.431-6.459-9.389-12.109-10.209l-95.822-13.922l-42.854-86.837
              c-2.527-5.12-7.742-8.362-13.451-8.362c-5.71,0-10.925,3.242-13.451,8.362l-42.851,86.836l-95.825,13.922
              c-5.65,0.821-10.345,4.779-12.109,10.209c-1.764,5.431-0.293,11.392,3.796,15.377l69.339,67.582L57.496,305.07
              c-0.965,5.628,1.348,11.315,5.967,14.671c2.613,1.899,5.708,2.865,8.818,2.865c2.387,0,4.784-0.569,6.979-1.723
              l85.711-45.059l85.71,45.059c2.208,1.161,4.626,1.714,7.021,1.723c8.275-0.012,14.979-6.723,14.979-15
              c0-1.152-0.13-2.275-0.376-3.352l-16.233-94.629l69.339-67.583C329.501,138.057,330.972,132.096,329.208,126.666z"
            />
          </svg>
        </button>
      </div>

      <div class="avaliacao-resumo">
        <span class="estrelas">
          <svg
            v-for="n in 5"
            :key="n"
            viewBox="0 0 24 24"
            :class="{ cheia: n <= Math.round(posto.mediaAvaliacao ?? 0) }"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
            />
          </svg>
        </span>
        <strong>{{ posto.mediaAvaliacao?.toFixed(1) ?? "sem avaliação"}}</strong>
        <span class="total">({{ posto.totalAvaliacoes }} avaliações)</span>
      </div>

      <p class="endereco">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
          />
        </svg>
        {{ posto.endereco }}
      </p>

      <div class="precos">
        <div class="preco-box" v-for="p in posto.precos" :key="p.tipo">
          <span class="tipo">{{ p.tipo_combustivel }}</span>
          <span class="valor">R$ {{ p.preco_litro.toFixed(2) }}</span>
        </div>
      </div>

      <button class="btn-avaliar" @click="emit('avaliar')">Avaliar Posto</button>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  padding-bottom: 40px;
}

.hero-media {
  flex-shrink: 0;
  width: 220px;
  height: 220px;
  border-radius: 20px;
  background-color: #f4f5fa;
  border: 1px solid #e1e4f0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logo-posto {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.hero-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.titulo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.titulo-row h1 {
  font-size: 32px;
  font-weight: 800;
  color: #002492;
}

.favoritar {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
}

.favoritar svg {
  width: 28px;
  height: 28px;
  fill: none;
  stroke: #334582;
  stroke-width: 18;
  transition:
    fill 0.2s ease,
    transform 0.15s ease;
}

.favoritar:hover svg {
  transform: scale(1.1);
}

.favoritar.ativo svg {
  fill: #fec12b;
  stroke: #fec12b;
}

.avaliacao-resumo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #334582;
}

.avaliacao-resumo strong {
  color: #002492;
  font-size: 18px;
}

.estrelas {
  display: flex;
  gap: 2px;
}

.estrelas svg {
  width: 20px;
  height: 20px;
  fill: #d9dced;
}

.estrelas svg.cheia {
  fill: #fec12b;
}

.total {
  color: #6b7280;
  font-size: 15px;
}

.endereco {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #334582;
  font-size: 16px;
  font-weight: 600;
}

.endereco svg {
  width: 18px;
  height: 18px;
  fill: #fec12b;
  flex-shrink: 0;
}

.precos {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 6px;
}

.preco-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 110px;
  padding: 10px 18px;
  border: 1px solid #334582;
  border-radius: 10px;
  background-color: #f4f5fa;
}

.preco-box .tipo {
  font-size: 13px;
  font-weight: 700;
  color: #334582;
  text-transform: uppercase;
}

.preco-box .valor {
  font-size: 18px;
  font-weight: 800;
  color: #002492;
}

.btn-avaliar {
  align-self: flex-start;
  margin-top: 8px;
  background-color: #334582;
  color: #fff;
  border: none;
  padding: 14px 28px;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;
}

.btn-avaliar:hover {
  background-color: #1e326b;
  transform: scale(1.02);
}

@media (max-width: 800px) {
  .hero {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .titulo-row,
  .endereco,
  .avaliacao-resumo,
  .precos {
    justify-content: center;
  }

  .btn-avaliar {
    align-self: center;
  }
}
</style>
