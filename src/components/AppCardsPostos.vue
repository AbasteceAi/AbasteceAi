<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  postos: { type: Array, required: true },
  carregando: { type: Boolean, default: false }
})

const quantidadeVisivel = ref(6)

const tiposDesejados = ['gasolina comum', 'gasolina aditivada', 'diesel s10']

function precosFiltrados(posto) {
  const filtrados = posto.precos.filter(p =>
    tiposDesejados.includes(p.tipo_combustivel.toLowerCase())
  )
  const unicos = []
  const tiposVistos = new Set()
  for (const preco of filtrados) {
    const tipo = preco.tipo_combustivel.toLowerCase()
    if (!tiposVistos.has(tipo)) {
      tiposVistos.add(tipo)
      unicos.push(preco)
    }
  }
  return unicos
}

const postosVisiveis = computed(() => props.postos.slice(0, quantidadeVisivel.value))
const temMaisPostos = computed(() => quantidadeVisivel.value < props.postos.length)

function carregarMais() {
  quantidadeVisivel.value += 6
}

// zera a paginação sempre que o filtro de bairro mudar
watch(() => props.postos, () => {
  quantidadeVisivel.value = 6
})
</script>

<template>
  <section class="postos">
    <p v-if="props.carregando" class="carregando">
      Carregando postos...
    </p>
    <div v-else class="postos-grid">
     <div v-for="posto in postosVisiveis" 
     :key="posto.id" 
     class="posto-card">
        <div class="posto-imagem">
          <img
            :src="posto.foto_url"
            :alt="posto.nome"
          />
        </div>
        <div class="posto-info">
          <div class="titulo-status">
            <h3>{{ posto.nome }}</h3>
            <span
              v-if="posto.aberto === true"
              class="aberto"  >
              ● Aberto
            </span>
            <span
              v-else-if="posto.aberto === false"
              class="fechado"
            >
              ● Fechado
            </span>
          </div>
          <div class="endereco">
          <svg class="icon-pin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431
    13 12 13Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <p>{{ posto.endereco }}</p>
          </div>
          <div class="precos">
            <div
              v-for="preco in precosFiltrados(posto)"
                 :key="preco.tipo_combustivel"
                  class="combustivel"

            >
              <strong>
                {{ preco.tipo_combustivel }}
              </strong>
              <span>
                R$ {{ Number(preco.preco_litro).toFixed(2) }}
              </span>
            </div>
          </div>
          <button class="btn-ver-mais">
            Ver mais
          </button>
        </div>
      </div>
    </div>
     <button
     v-if="temMaisPostos"
     class="btn-carregar-mais"
     @click="carregarMais"
    >
     Carregar mais postos
    </button>
  </section>
</template>

<style scoped>
.postos-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 48px;
  row-gap: 30px;
  width: 100%;
}

.posto-card {
  display: flex;
  width: 100%;
  min-height: 142px;
  background: #ffc229;
  border-radius: 0 12px 12px 0;
  overflow: hidden;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.22);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.posto-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
}

.posto-imagem {
  width: 136px;
  min-width: 118px;
  align-self: stretch;
  overflow: hidden;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
   border-right: #002d82  2px solid;
}

.posto-imagem img {
  width: 100%;
  height: 100%;
  object-fit: contain;
 
  display: block;
  transition: transform 0.3s ease;
}

.posto-card:hover .posto-imagem img {
  transform: scale(1.04);
}

.posto-info {
  flex: 1;
  min-width: 0;
  padding: 13px 12px 8px 15px;
  display: flex;
  flex-direction: column;

}

.titulo-status {
  display: flex;
  align-items: center;
  gap: 7px;
  height: 17px;
  white-space: nowrap;
}

.titulo-status h3 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
  color: #111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.aberto {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: #31803b;
  background-color: #d4f0d4;
  padding: 0 6px;
  border-radius: 4px;

}

.fechado {
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: #b32929;
  background-color: #f8d7da;
  padding: 0 6px;
  border-radius: 4px;
}

.endereco {
  margin: 6px 0 0;
  font-size: 16px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
}
.endereco p {
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.icon-pin {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.precos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.combustivel {
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 2px;
  background: white;
  border: 2px solid #1748b0;
  border-radius: 10px;
  padding: 6px 12px;
  min-width: 70px;
}

.combustivel strong {
  font-size: 12px;
  line-height: 14px;
  font-weight: 700;
  color: #1748b0;
}

.combustivel span {
  font-size: 15px;
  line-height: 17px;
  font-weight: 700;
  color: #f5a623;
}

.btn-ver-mais {
  margin-top: 14px;   
  width: 100%;
  height: 30px;
  background: #1748b0;
  border-radius: 6px;
  border: none;
  color: #fec12b;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
}

.btn-ver-mais:hover {
  background: #002d82;
  transform: translateY(-1px);
}
.btn-carregar-mais {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 325px;
  height: 40px;
  margin: 25px auto 25px auto;
  border-radius: 18px;
  background-color: #002492;
  color: #FEC12B;
  font-size: 17px;
  font-weight: bold;
  cursor: pointer;
  border: none;
}

.btn-carregar-mais:hover {
  background: #002d82;
  transform: translateY(-1px);
}

@media (max-width: 800px) {

  .postos-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

}

</style>