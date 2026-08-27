<script setup>
defineProps({
    nome: String,
    funcao: String,
    descricao: String,
    imagem: String,
    instagram: String,
    github: String,
    email: String,
    linkedin: String
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

  <a 
    :href="instagram" 
    target="_blank"
    aria-label="Instagram"
  >
    <font-awesome-icon :icon="['fab', 'instagram']" />
  </a>

  <a 
    :href="github" 
    target="_blank"
    aria-label="GitHub"
  >
    <font-awesome-icon :icon="['fab', 'github']" />
  </a>

  <a 
    :href="`mailto:${email}`"
    aria-label="E-mail"
  >
    <font-awesome-icon :icon="['fas', 'envelope']" />
  </a>

  <a 
    :href="linkedin" 
    target="_blank"
    aria-label="LinkedIn"
  >
    <font-awesome-icon :icon="['fab', 'linkedin']" />
  </a>

</div>
         
       </div>
    </div>
</template>

<style scoped>

.cardSobre {
   width: 100%;
  min-height: 180px;
  background: #394f91;
  border-radius: 18px;
  padding: 20px 30px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
  box-sizing: border-box;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.cardSobre:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.45);
}
.foto {
  width: 86px;
  height: 86px;
  min-width: 86px;

  border-radius: 50%;
  object-fit: cover;

  border: 2px solid white;
}

.informacoes {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.informacoes h3 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
}
.funcao {
  display: block;
  margin-top: 2px;
  font-size: 15px;
  font-weight: 400;
  color: #e4e4e4;
}
.informacoes p {
  margin: 8px 0 10px;
  font-size: 15px;
  line-height: 1.35;
  color: white;
}
.redes {
  display: flex;
  align-items: center;
  gap: 14px;
}

.redes a {
  color: white;
  text-decoration: none;

  font-size: 25px;
  font-weight: 500;

  transition: opacity 0.2s ease;
}
.redes a:hover {
  opacity: 0.7;
}
</style>