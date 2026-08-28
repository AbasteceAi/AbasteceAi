<script setup>
import {ref, onMounted} from 'vue';
import { buscarTipoCombustivel } from '@/services/postos';

defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const mostrarFiltro = ref(false)
const opcoes = ref([])

onMounted(async () =>{
  opcoes.value = await buscarTipoCombustivel()
})
function selecionar(tipo){
  emit('update:modelValue',tipo)
  mostrarFiltro.value = false
}
</script>
<template>
<div class="filtro-combustivel">
    <button class="btn-filtro" @click="mostrarFiltro = !mostrarFiltro">
    <svg class="svg" v-if="!modelValue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4H20L14 12V19L10 21V12L4 4Z" fill="#002492"/>
      </svg>
     <div v-if="modelValue"> {{ modelValue.charAt(0).toUpperCase()+ modelValue.slice(1) }}</div>
    </button>
    <ul v-if="mostrarFiltro" class="lista">
    <li v-for="tipo in opcoes" :key="tipo" @click="selecionar(tipo)" class="opcao">
     {{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}
    </li>
    </ul>
</div>
</template>

<style scoped>
.svg{
  width: 30px;
  height: 30px;
  background-color: #FEC12B;
  border: none;
}
.btn-filtro{
  border: none;
  background-color: #FEC12B ;
  padding: 5px;
  height: 40px;
  border-radius: 5px;
  color: #002492;
}
.lista{
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 10;
  background-color: #FEC12B;
  list-style: none;
  border-radius: 5px;
  margin-top: 0;
  color: #002492;
  padding: 8px;
  min-width: 160px;
}
.filtro-combustivel{
  position: relative;
}
</style>
