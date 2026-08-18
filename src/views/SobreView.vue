<script setup>
import AppCardsSobre from '@/components/AppCardsSobre.vue';

const equipe = [
    {
        nome: 'Bruna Siebert',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/bruna.png",
    },

    {
        nome: 'Ester Viana',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/ester.png" ,
    },
    {
        nome: 'Giulia Côrrea',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/giulia.png" ,
    },
    {
        nome: 'Halicya Recalde',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/halicya.png",
    },
    {
        nome: 'Laura Werner',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/laura.png",
    },
{
        nome: 'Tiago Perin',
        funcao: 'Desenvolvedora',
        descricao: '.',
        imagem: "/imgs/tiago.png",
    }

]

</script>

<template>
  <main>
    <section class="bannerSobre">

      <h1>Sobre nós</h1>
      <div class="linha"></div>
      <p>
        O Abastece Aí é um projeto desenvolvido por seis estudantes de informática de Joinville. A
        ideia surgiu da vontade de criar uma solução prática para um problema do cotidiano: a
        dificuldade de encontrar os melhores preços de combustível na cidade. Nossa plataforma reúne
        os preços de postos de toda a região, com preços atualizados, para que você sempre encontre
        o melhor preço antes de sair de casa.
      </p>
      <img src="/public/imgs/mascoteSobre.png" alt="Mascote" />

    </section>

    <section class="objetivo">
      <h2>NOSSO OBJETIVO</h2>
      <p>
        O Abastece Aí surgiu de uma ideia simples: ninguém deveria pagar mais caro no combustível por falta de informação. 
        Nosso site é transparente com os usuários, sem anúncios ou postos patrocinadores no topo da lista, rápido de usar, 
        funciona no celular e te dá várias opções de escolha ao seu alcance.
      </p>
    </section>

    <section class="equipe">
      <h2>Conheça nossa equipe</h2>
      <div class="linha2"></div>
      <p>Somos um grupo de seis estudantes e desenvolvedores joinvilenses que decidiram criar um site para auxiliar os 
         residentes da cidade a encontrar melhor qualidade com menor custo nos postos de gasolina, tivemos essa ideia a partir
         do Hackaton, que é um projeto trimestral do nosso curso técnico, onde nos juntamos e começamos a desenvolver e 
         colocar a ideia em prática. </p>

         <div class="cardEquipe">
            <TeamCard
            v-for="pessoa in equipe"
            :key="pessoa.nome"
            :nome="pessoa.nome"
            :funcao="pessoa.funcao"
            :descricao="pessoa.descricao"
            :imagem="pessoa.imagem" />
         </div>
    </section>
  </main>
</template>
<style scoped>
</style>
