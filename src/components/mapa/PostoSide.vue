<script setup>
defineProps(['posto', 'combustivelSel'])
</script>
<template>
  
    <div class="card" >
           <div class="faixa"><div> <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
 class="locE" viewBox="0 0 930.000000 1280.000000"
 preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.15, written by Peter Selinger 2001-2017
</metadata>
<g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
 stroke="none">
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
</svg></div><p>{{ posto.endereco }}</p></div>
      <div class="cont">
      <img :src="posto.foto_url" class="img">
      <div class="infoN">
         <h2 class="nome">{{ posto.nome }}</h2>
         <div>
            <div>
            <p v-if="posto.aberto === true" class="status aberto"> <span> 
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve"><circle cx="60" cy="60.834" r="54.167"/></svg>
            </span> Aberto </p>
            <p v-else-if="posto.aberto === false" class="status fechado"><span><svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 120 120" enable-background="new 0 0 120 120" xml:space="preserve">
<circle cx="60" cy="60.834" r="54.167"/>
</svg></span> Fechado </p>
            <p v-else class="status desconhecido"><span></span> Horário não disponível</p>
            <div>
            <p>
         <svg fill="#FEC12B"  viewBox="0 0 24 24" class="cursor" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.4,2.6a2,2,0,0,0-2.27-.42h0L3.2,9.4A2,2,0,0,0,2,11.52a2.26,2.26,0,0,0,1.8,2l5.58,1.13,1.13,5.58a2.26,2.26,0,0,0,2,1.8h.25a2,2,0,0,0,1.87-1.2L21.82,4.87A2,2,0,0,0,21.4,2.6Z" style="fill:#FEC12B;"></path></svg>
         </p>
         <p v-if="posto.distancia" class="dist">{{ posto.distancia.toFixed(1) }}km</p>
         </div>
         </div>
         </div>
       </div>
       <div v-for="preco in posto.precos" :key="preco.tipo_combustivel">
       <div>
         <p>{{ preco.tipo_combustivel }}</p>
         <h1>{{ preco.preco_litro }}</h1>
         </div>
         
       </div>
      </div>
    </div>
</template>
<style scoped>
.card{
  border-radius: 16px;
  overflow: hidden; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  padding-top: 0;
  margin: 20px;
  padding-bottom: 5px;
}
.faixa{
    display: flex;
    gap: 5px;
    background-color: #FEC12B;
    height: 20px;
    margin-top: 0;
    padding: 10px;
    width: 100%;
}
.faixa p {
    margin: 0;
    font-size: 15px;
}
.cont{
    display: flex;
    gap: 10px;
    align-items: center;
}
.img{
    width: 60px;
    height: 60px;
}
.infoN{
    border-right: 1px solid #002492;
    margin-right: 10px;
    padding-right: 10px;
}
.infoN div {
    display: flex;
    gap: 10px;
}
.nome{
  font-size: 1.5rem;
  color: #002492;
  
}
.locE{
      fill: #334582;
    width: 18px
}
.loc{
    fill: #FEC12B;
    width: 20px;
}
.cursor{
    width: 25px;
    height: 25px;
}

.status.aberto span svg{
    fill: #2F7E3A;
    width: 10px;
    margin: 0 auto;
}
.status.aberto{
    color: #2F7E3A;
    background-color:#89B66E ;
    padding: 5px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    height: 20px;
}
.status.fechado span svg {
     fill: #7E2F2F;
    width: 10px;
    margin: 0 auto;
}
.status.fechado{
    color: #7E2F2F;
    background-color:#B66E6E ;
    padding: 5px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: bold;
    height: 20px;
}
.dist{
    font-size: 15px;
    font-weight: bold;
}
</style>