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
<svg xmlns="http://www.w3.org/2000/svg" v-else-if="s.icone === 'limpeza'" height="14" width="12.25" viewBox="0 0 448 512"><path fill="rgb(255, 255, 255)" d="M443.7 208c2.7 4.7 4.3 10.2 4.3 16 0 17.7-14.3 32-32 32l-5.1 0-22.4 213c-2.6 24.4-23.2 43-47.8 43l-233.6 0c-24.6 0-45.2-18.5-47.8-43L37.1 256 32 256c-17.7 0-32-14.3-32-32 0-5.8 1.6-11.3 4.3-16l439.4 0zM224-16c79.5 0 144 64.5 144 144l0 32-48 0 0-32c0-53-43-96-96-96s-96 43-96 96l0 32-48 0 0-32C80 48.5 144.5-16 224-16z"/></svg>



        <svg xmlns="http://www.w3.org/2000/svg" v-else height="12" width="15" viewBox="0 0 640 512"><path fill="rgb(255, 255, 255)" d="M80 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm40 304l0 128c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-154.8c-8.1 9.2-21.1 13.2-33.5 9.4-16.9-5.3-26.3-23.2-21-40.1l29.7-95.2C44.4 156.9 83.6 128 128 128s83.6 28.9 96.8 71.2l29.7 95.2c5.3 16.9-4.1 34.8-21 40.1-12.4 3.9-25.4-.2-33.5-9.4L200 480c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-128-16 0zM320 0c13.3 0 24 10.7 24 24l0 464c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-464c0-13.3 10.7-24 24-24zM464 48a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM440 480l0-96-17.8 0c-10.9 0-18.6-10.7-15.2-21.1l9-26.9c-3.2 0-6.4-.5-9.5-1.5-16.9-5.3-26.3-23.2-21-40.1l29.7-95.2C428.4 156.9 467.6 128 512 128s83.6 28.9 96.8 71.2l29.7 95.2c5.3 16.9-4.1 34.8-21 40.1-3.2 1-6.4 1.5-9.5 1.5l9 26.9c3.5 10.4-4.3 21.1-15.2 21.1l-17.8 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-96-16 0 0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32z"/></svg>


          
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
  margin: 0;
  background-color: #002492;
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

</style>