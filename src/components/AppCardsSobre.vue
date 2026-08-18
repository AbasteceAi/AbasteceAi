<script setup>
defineProps({
    nome: String,
    funcao: String,
    descricao: String,
    imagem: String
})
</script>

<template>
    <div class="cardSobre">
       <img 
       :src="imagem" 
       :alt="nome"
       class="foto">

       <div class="informacoes">
          <h3>{{ nome }}</h3>

          <span class="funcao">
            {{ funcao }}
          </span>

        <p>{{ descricao }}</p>

         <div class="redes">
          <a href="#">insta</a>
          <a href="#">github</a>
          <a href="#">gmail</a>
          <a href="#">linkedin</a>
         </div>
         
       </div>
    </div>
</template>