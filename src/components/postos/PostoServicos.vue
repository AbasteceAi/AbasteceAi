<script setup>
import { ref } from 'vue'

defineProps({
  servicos: {
    type: Array,
    default: () => [
      {
        id: 'mecanica',
        icone: 'mecanica',
        itens: [
          'Calibragem de pneus',
          'Troca e verificação de água e óleo',
          'Borracharia (ou oficinas básicas)',
          'Ponto de recarga para carros elétricos',
        ],
      },
      {
        id: 'loja',
        icone: 'loja',
        itens: ['Loja de conveniência', 'Cafeteria (ou restaurante)', 'Caixas eletrônicos 24H'],
      },
      {
        id: 'limpeza',
        icone: 'limpeza',
        itens: ['Limpeza de para-brisas', 'Lava-jato'],
      },
      {
        id: 'banheiro',
        icone: 'banheiro',
        itens: ['Banheiros', 'Chuveiros'],
      },
    ],
  },
})

const tooltipAtivo = ref(null)
function alternarTooltip(id) {
  tooltipAtivo.value = tooltipAtivo.value === id ? null : id
}
function abrirTooltip(id) {
  tooltipAtivo.value = id
}
function fecharTooltip() {
  tooltipAtivo.value = null
}
</script>

<template>
  <section class="servicos">
    <div class="servicos-faixa">
      <div
        v-for="s in servicos"
        :key="s.id"
        class="servico"
        @mouseenter="abrirTooltip(s.id)"
        @mouseleave="fecharTooltip"
      >
        <button
          class="icone-servico"
          :class="{ ativo: tooltipAtivo === s.id }"
          :aria-expanded="tooltipAtivo === s.id"
          @click="alternarTooltip(s.id)"
        >
          <svg v-if="s.icone === 'mecanica'" viewBox="0 0 24 24">
            <path
              d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6l-3 3-4.3-4.3C.6 7.1 1 10.1 3 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.4-.4.4-1.1 0-1.4z"
            />
          </svg>
          <svg v-else-if="s.icone === 'loja'" viewBox="0 0 24 24">
            <path
              d="M4 10v10h5v-6h6v6h5V10M2 8l2-6h16l2 6M2 8h20M2 8v0a2 2 0 0 0 4 0M6 8a2 2 0 0 0 4 0M10 8a2 2 0 0 0 4 0M14 8a2 2 0 0 0 4 0M18 8a2 2 0 0 0 4 0"
            />
          </svg>
          <svg v-else-if="s.icone === 'limpeza'" viewBox="0 0 24 24">
            <path d="M19 3l-9 9M4 21l3-3m0 0l7.5-7.5a2.1 2.1 0 0 1 3 3L10 21H4v-3z" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <path
              d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20c0-3 2.5-5 5-5s5 2 5 5M16 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM13 20c.3-2.3 2-4 3.5-4s3.2 1.7 3.5 4"
            />
          </svg>
        </button>

        <transition name="tooltip-fade">
          <div class="tooltip" v-if="tooltipAtivo === s.id">
            <span class="seta"></span>
            <ul>
              <li v-for="item in s.itens" :key="item">{{ item }}</li>
            </ul>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.servicos {
  margin: 10px 0 50px;
}

.servicos-faixa {
  background-color: #334582;
  border-radius: 16px;
  padding: 18px 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.servico {
  position: relative;
  display: flex;
  justify-content: center;
}

.icone-servico {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: #1e326b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    transform 0.15s ease;
}

.icone-servico svg {
  width: 26px;
  height: 26px;
  fill: none;
  stroke: #fff;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.icone-servico:hover,
.icone-servico.ativo {
  background-color: #fec12b;
  transform: scale(1.08);
}

.icone-servico:hover svg,
.icone-servico.ativo svg {
  stroke: #334582;
}

.tooltip {
  position: absolute;
  top: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #334582;
  border-radius: 10px;
  padding: 14px 18px;
  min-width: 240px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
  z-index: 10;
}

.tooltip .seta {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 14px;
  height: 14px;
  background-color: #fff;
}

.tooltip ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tooltip li {
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}

.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}

@media (max-width: 800px) {
  .servicos-faixa {
    justify-content: center;
  }

  .tooltip {
    min-width: 200px;
    left: auto;
    right: -20px;
    transform: none;
  }

  .tooltip .seta {
    left: auto;
    right: 30px;
  }

  .tooltip-fade-enter-from,
  .tooltip-fade-leave-to {
    transform: translateY(-6px);
  }
}
</style>