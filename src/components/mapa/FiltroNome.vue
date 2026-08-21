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
</style>
