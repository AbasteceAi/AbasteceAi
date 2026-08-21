<script setup>
import AppCardsSobre from '@/components/AppCardsSobre.vue'

const equipe = [
  {
    nome: 'Bruna Siebert',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/bruna.png',
    instagram: "https://www.instagram.com/brunasiebert/",
    github: "https://github.com/brunasiebertm",
    email: "emaildabrun@exemplo.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },

  {
    nome: 'Ester Viana',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/ester.png',
    instagram: "https://www.instagram.com/eester.sz/",
    github: "https://github.com/esterdesouza",
    email: "estersv18@gmail.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },
  {
    nome: 'Giulia Côrrea',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/giulia.png',
    instagram: "https://www.instagram.com/giiubws/",
    github: "https://github.com/giuliamcorrea",
    email: "emaildabrun@exemplo.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },
  {
    nome: 'Halicya Recalde',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/halicya.png',
    instagram: "https://www.instagram.com/hwskira/",
    github: "https://github.com/halicyafranca",
    email: "emaildabrun@exemplo.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },
  {
    nome: 'Laura Werner',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/laura.png',
    instagram: "https://www.instagram.com/itzgirrl/",
    github: "https://github.com/lauraluciano",
    email: "emaildabrun@exemplo.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },
  {
    nome: 'Tiago Perin',
    funcao: 'Desenvolvedora',
    descricao: '.',
    imagem: '/imgs/tiago.png',
    instagram: "https://www.instagram.com/tiagomperin_/",
    github: "https://github.com/TiagoMPerin",
    email: "emaildabrun@exemplo.com",
    linkedin: "https://www.linkedin.com/in/USUARIO_BRUNA"
  },
]
</script>

<template>
  <main>
    <section class="sobre">
      <div class="texto-sobre">
        <h1>Sobre nós</h1>
        <div class="linha"></div>
        <p>
          O Abastece Aí é um projeto desenvolvido por seis estudantes de informática de Joinville. A
          ideia surgiu da vontade de criar uma solução prática para um problema do cotidiano: a
          dificuldade de encontrar os melhores preços de combustível na cidade. Nossa plataforma
          reúne os preços de postos de toda a região, com preços atualizados, para que você sempre
          encontre o melhor preço antes de sair de casa.
        </p>
      </div>

      <div class="imagem-mascote">
        <img src="/public/imgs/mascoteSobre.png" alt="Mascote" />
      </div>
    </section>

    <section class="objetivo">
      <h2>NOSSO OBJETIVO</h2>
      <p>
        O Abastece Aí surgiu de uma ideia simples: ninguém deveria pagar mais caro no combustível
        por falta de informação. Nosso site é transparente com os usuários, sem anúncios ou postos
        patrocinadores no topo da lista, rápido de usar, funciona no celular e te dá várias opções
        de escolha ao seu alcance.
      </p>
    </section>

    <section class="equipe"> 
      <h2>Conheça nossa equipe</h2>
      <div class="linha2"></div>
      <p>
        Somos um grupo de seis estudantes e desenvolvedores joinvilenses que decidiram criar um site
        para auxiliar os residentes da cidade a encontrar melhor qualidade com menor custo nos
        postos de gasolina, tivemos essa ideia a partir do Hackaton, que é um projeto trimestral do
        nosso curso técnico, onde nos juntamos e começamos a desenvolver e colocar a ideia em
        prática.
      </p>

      <div class="cardEquipe">
        <AppCardsSobre
          v-for="pessoa in equipe"
          :key="pessoa.nome"
          :nome="pessoa.nome"
          :funcao="pessoa.funcao"
          :descricao="pessoa.descricao"
          :imagem="pessoa.imagem"
        />
      </div>
    </section>
  </main>
</template>
<style scoped>
* {
  box-sizing: border-box;
}
.pagina {
  min-height: 100vh;
  background: #f3f6fc;
  color: #303f70;
  font-family: Arial, sans-serif;
}

main {
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
}

.sobre {
  min-height: 390px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  padding: 55px 20px 30px;
}
.texto-sobre {
  width: 55%;
}
.texto-sobre h1 {
  font-size: 42px;
  margin: 0;
  color: #334582;
}
.linha {
  width: 70px;
  height: 7px;
  background: #e6c438;
  margin: 10px 0 25px;
  border-radius: 5px;
}
.texto-sobre p {
  font-size: 20px;
  line-height: 1.5;
  color: #2d2c2c;
  margin-bottom: 8px;
}
.imagem-mascote {
  width: 40%;
  display: flex;
  justify-content: center;
}
.imagem-mascote img {
  width: 100%;
  max-width: 300px;
}
.objetivo {
  background: #334582;
  color: white;
  text-align: center;
  border-radius: 22px;
  padding: 35px 80px;
  margin: 20px 0 60px;
  box-shadow: 6px 8px 0 rgba(0, 0, 0, 0.15);
}
.objetivo h2 {
  font-size: 21px;
  margin-bottom: 10px;
}
.objetivo p {
  max-width: 800px;
  margin: 4px auto;
  font-size: 16px;
  line-height: 1.5;
}

.equipe {
  padding-bottom: 80px;
}
.equipe h2 {
  font-size: 32px;
  text-align:right ;
  margin-bottom: 25px;
  color: #334582;
}
.equipe p{
  text-align: right;
  font-size: 20px;
}
.descricao {
  text-align: center;
  font-size: 16px;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto 45px;
  color: #272626;
}
.cardEquipe {
  width: 85%;
  max-width: 800px;
  margin: 40px auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 20px;
}

</style>
