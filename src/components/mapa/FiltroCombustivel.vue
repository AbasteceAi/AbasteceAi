<script setup>
import {ref, onMounted} from 'vue';
import { buscarTipoCombustivel } from '@/services/postos';

defineProps(['modelValue'])
defineEmits(['update:modelValue'])

const opcoes = ref([])

onMounted(async () =>{
  opcoes.value = await buscarTipoCombustivel()
})
</script>
<template>
<div class="filtro-combustivel">
    <label>Combustível:</label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
    >
      <option v-for="tipo in opcoes" :key="tipo" :value="tipo">
        {{ tipo.charAt(0).toUpperCase() + tipo.slice(1) }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.filtro-combustivel {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.filtro-combustivel select {
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
</style>
