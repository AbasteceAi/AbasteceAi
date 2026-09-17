<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import { buscarPostos, ordenarPorDistancia, obterLoc } from '@/services/postos.js'

import LMap from '../mapa/LMap.vue'
const carregando = ref(true)
const postos = ref([])

async function carregar() {
  const dados = await buscarPostos()

  try {
    const { lat, lng } = await obterLoc()
     postos.value = ordenarPorDistancia(dados, lat, lng)

  } catch {

    postos.value = dados
  }

carregando.value = false
}
 const maisProximo= computed(() => postos.value.slice(0,1))

onMounted(carregar)
</script>

<template>
  <main>
   <section class="sec">
      <div v-for="posto in maisProximo" :key="posto.id" class="posto-card">
 <div class="cont">
      <div class="text">
      <p class="esta">O Posto mais próximo de você</p>
      <div class="imgTi">
      <img :src="posto.foto_url"  class="img">
      <div>
      <div class="titulo">
      <h3>{{ posto.nome }}</h3>
            <div>
       <p v-if="posto.aberto === true" class="status aberto"> <span>
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve"><circle cx="60" cy="60.834" r="54.167"/></svg>
            </span> Aberto </p>
            <p v-else-if="posto.aberto === false" class="status fechado"><span><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve">
<circle cx="60" cy="60.834" r="54.167"/>
</svg></span> Fechado </p>
            <p v-else class="status desconhecido"><span></span> Horário não disponível</p>
            </div>

</div>
 <div class="dis">
            <p>
            <span>
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" class="locE"
                    viewBox="0 0 930.000000 1280.000000" preserveAspectRatio="xMidYMid meet">
                    <metadata>
                        Created by potrace 1.15, written by Peter Selinger 2001-2017
                    </metadata>
                    <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)" stroke="none">
                        <path d="M4335 12789 c-1496 -104 -2843 -915 -3635 -2190 -232 -373 -414 -787
-529 -1204 -305 -1107 -197 -2278 305 -3295 191 -387 372 -660 676 -1020 34
-41 753 -976 1596 -2077 918 -1199 1555 -2022 1588 -2052 186 -170 442 -170
628 0 33 30 670 853 1588 2052 843 1101 1562 2036 1596 2077 304 360 485 633
676 1020 566 1147 629 2502 174 3695 -353 923 -967 1689 -1798 2242 -825 549
-1864 821 -2865 752z m559 -2254 c224 -29 398 -81 601 -180 553 -268 931 -756
1062 -1374 25 -116 27 -145 28 -366 0 -267 -10 -345 -70 -555 -161 -561 -586
-1032 -1130 -1253 -201 -82 -365 -120 -592 -139 -294 -25 -593 23 -878 139
-544 221 -969 692 -1130 1253 -60 210 -70 288 -70 555 1 221 3 250 28 366 112
527 406 965 842 1252 177 116 437 227 637 271 209 46 467 58 672 31z"/>
</g>
</svg>
            </span>
            {{ posto.endereco }}</p>
</div>
             </div>

      </div>
      <div class="distancia">
       <p><svg fill="#FEC12B"  viewBox="0 0 24 24" class="cursor" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.4,2.6a2,2,0,0,0-2.27-.42h0L3.2,9.4A2,2,0,0,0,2,11.52a2.26,2.26,0,0,0,1.8,2l5.58,1.13,1.13,5.58a2.26,2.26,0,0,0,2,1.8h.25a2,2,0,0,0,1.87-1.2L21.82,4.87A2,2,0,0,0,21.4,2.6Z" style="fill:#FEC12B;"></path></svg></P>
        <p>
          Este posto está a <span>{{ posto.distancia.toFixed(2) }} Km</span> de distância
        </p>
      </div>
 <div class="precos">
        <div class="preco-box" v-for="p in posto.precos.slice(0,3)" :key="p.tipo">
          <span class="tipo">{{ p.tipo_combustivel }}</span>
          <span class="valor">R$ {{ p.preco_litro.toFixed(2) }}</span>
        </div>
      </div>
      <div>
       <RouterLink :to="`/posto/${posto.id}`" class="btn">Acesse a página do posto</RouterLink>
      </div>
      </div>
  <LMap  :postos="maisProximo" class="mapa" />

 </div>
</div>
</section>
  </main>
</template>

<style scoped>
.sec{
  background-color: #FEC12B;
   padding: 3vw 4vw;
}
.locE {
  align-items: center;
    width: 18px
}

.posto-card{
 width: 60%;
 margin: 0 auto;
  padding: 0 0 0 25px;
  background-color: #334582;
  border-radius: 60px;
  animation: fade-in linear;
  animation-timeline: view();
  animation-range: entry 0% cover 30%;
}
@keyframes fade-in {
  from { opacity: 0.5; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0px); }
}
.cont{
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 500px;
  background: #F5F7FF;
  border-radius: 60px 0 0 60px;
  box-shadow:2px 2px 20px 2px   ;
}
.text{
  margin: 20px;
  border-radius: 20px;

}



.mapa{
  height: 100%;
}
.precos {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
}

.preco-box {
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 5px;
  background: white;
  border: 2px solid #1748b0;
  border-radius: 10px;
  padding: 6px 12px;
  min-width: 70px;
  box-shadow: 1px 2px 4px 1px ;
}

.preco-box .tipo {
  font-size: 15px;
  line-height: 14px;
  font-weight: 700;
  color: #1748b0;
}

.preco-box span {
  font-size: 20px;
  line-height: 25px;
  font-weight: 700;
  color: #f5a623;
}
.img{
  height: 100px;
}
.imgTi{
  display: flex;
  align-items: center;
  gap: 10px;

}
 .titulo{
  display: flex;
  gap: 10px;
 }
.titulo h3 {
  font-size: 1.7rem;
}
.esta{
  font-size: 1.3rem;
  color: #f5a623;
  font-weight: 800;
  margin: 1.6vw 1vw;
}
.dis p{
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14.5px;
  padding: 5px;
  gap: 4px;
}
.distancia{
  display: flex;
  margin: 2vw auto;
  gap: 10px;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
}

.distancia p svg {
  padding: 10px 0 0 0;
}

.distancia p span{
  color: #f5a623;
  font-size: 1.6rem;
}
.btn {
  text-decoration: none;
  margin: 2vw auto;
 text-align: center;
 display:block ;
 color: #FEC12B;
 background-color: #002492;
 font-weight: 700;
 font-size: 20px;
 padding: 20px 30px;
 width: fit-content;
 border-radius: 15px;
}
</style>
