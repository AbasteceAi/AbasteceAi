<script setup>


const buscaNome =defineModel()
</script>
<template>
<div>
<input type="text"
v-model="buscaNome"
placeholder="Pesquisar"
class="buscar"
>
</div>
</template>
<style scoped>
.buscar{
  width: 100%;
  height: 35px;
  border: 2px solid #FEC12B;
  border-radius: 5px;
  color: #334582;
}
.buscar::placeholder{
color: #334582;
}
input:focus{
border: 2px solid #fec22b9c;
outline: none;
}
</style>
