<script setup>
</script>

<template>
  <main>
    <section class="cards">
      <div class="card">
        <div class="icon">
        <img src="/imgs/localizacao.png" alt="localizacao" />
        </div>
        <h2>Postos próximos de você</h2>
        <p>
        Ative sua localização e veja os postos mais próximos com os preços atualizados do dia. Filtre por combustível e distância.
        </p>
      </div>
      <div class="card">
        <div class="icon">
          <img src="/imgs/charts.png" alt="estatísticas" />
        </div>
        <h2>Encontre os Melhores Preços</h2>
        <p>Veja o ranking dos postos com os combustíveis mais baratos em Joinville no momento.
          Atualizado pelos próprios motoristas.</p>
      </div>
      <div class="card">
        <div class="icon">
          <img src="/imgs/estrela.png" alt="estrela" />
        </div>
        <h2>Avaliados pela Comunidade</h2>
        <p>Postos bem avaliados por quem já abasteceu. Confira notas de atendimento, limpeza e qualidade do combustível.</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  background-color: #ffffff;
  padding: 150px 0 100px 0;
}

.cards {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 120px;
}

.card {
  width: 300px;
  height: 400px;
  padding: 30px 20px;
  background-color: #334582;
  border-radius: 6px;
  box-sizing: border-box;
  color: white;
}

.icon {
  width: 100px;
  height: 100px;
  background-color: #1e326b;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.card img {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.card h2 {
  font-size: 24px;
  text-align: center;
  margin: 0 0 10px 8px;
  font-weight: 700;
}

.card p {
  font-size: 18px;
  line-height: 1.5;
  color: #d9dced;
  text-align: center;
}
</style>
