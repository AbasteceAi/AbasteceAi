<script setup>
defineProps(['posto', 'combustivelSel'])
</script>
<template>
  
    <div class="card" >
           <div class="faixa"></div>
      <div class="cont">
      <img :src="posto.foto_url" class="img">
      <div class="infoN">
         <h2>{{ posto.nome }}</h2>
         <div>
          <img src="https://aacelpe.com.br/wp-content/uploads/2022/07/Localizacao-PNG.png" class="loc">
          <p>{{ posto.endereco }}</p>
         </div>
       </div>
       <div v-for="preco in posto.precos" :key="preco.tipo_combustivel">
       <div>
         <p>{{ preco.tipo_combustivel }}</p>
         <h1>{{ preco.preco_litro }}</h1>
         </div>
         <div>

            <p v-if="posto.aberto === true" class="status aberto"> <span></span> Aberto agora</p>
            <p v-else-if="posto.aberto === false" class="status fechado"><span></span> Fechado agora</p>
            <p v-else class="status desconhecido"><span></span> Horário não disponível</p>
            
            <div>
            <p>
         <svg fill="#FEC12B"  viewBox="0 0 24 24" class="cursor" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg"><path id="primary" d="M21.4,2.6a2,2,0,0,0-2.27-.42h0L3.2,9.4A2,2,0,0,0,2,11.52a2.26,2.26,0,0,0,1.8,2l5.58,1.13,1.13,5.58a2.26,2.26,0,0,0,2,1.8h.25a2,2,0,0,0,1.87-1.2L21.82,4.87A2,2,0,0,0,21.4,2.6Z" style="fill:#FEC12B;"></path></svg>
         </p>
         <p v-if="posto.distancia">{{ posto.distancia.toFixed(1) }}km</p>
         </div>
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
}
.faixa{
    background-color: #FEC12B;
height: 10px;
width: 100%;
}
.cont{
    display: flex;
    align-items: center;
}
.img{
    width: 60px;
    height: 60px;
}
.infoN{
    border-right: 1px solid #002492;
}
.infoN div {
    display: flex;
}
.loc{
    width: 35px;
    height: 35px;
}
.cursor{
    width: 40px;
    height: 40px;
}
</style>