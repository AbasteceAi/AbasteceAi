<script setup>
</script>

<template>
  <main>
    <section class="cards">
      <div class="card">
        <img src="/localizacao.png" alt="localizacao" />
        <h2>Postos próximos de você</h2>
        <p>
        Ative sua localização e veja os postos mais próximos com os preços atualizados do dia. Filtre por combustível e distância.
        </p>
      </div>
      <div class="card">
        <img src="/charts.png" alt="estatísticas" />
        <h2>Melhores Preços</h2>
        <p>Veja o ranking dos postos com os combustíveis mais baratos em Joinville no momento.
          Atualizado pelos próprios motoristas.</p>
      </div>
      <div class="card">
        <img src="/estrela.png" alt="estrela" />
        <h2>Avaliados pela Comunidade</h2>
        <p>Postos bem avaliados por quem já abasteceu. Confira notas de atendimento, limpeza e qualidade do combustível.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.cards {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 50px;
  background-color: #334582;
  border-radius: 10px;
}
img {
  width: 100px;
  height: 100px;
  align-items: center; 

}
</style>
