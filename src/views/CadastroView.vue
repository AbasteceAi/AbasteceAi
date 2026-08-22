<template>
  <main class="cadastro-page">
    <section class="cadastro-image">
      <img src="/imgs/boneco.png" alt="Personagem do AbasteceAí" />

      <img
        class="decorative-lines"
        src="/imgs/ondas.svg"
        alt=""
      />
    </section>

    <section class="cadastro-content">

      <div class="cadastro-title">
        <img
          class="cadastro-logo"
          src="/imgs/logoMaior.png"
          alt="Logo do AbasteceAí"
        />

        <h1>Bem-vindo ao AbasteceAí</h1>
      </div>

      <form>

        <label for="email">E-mail:</label>
        <input
          id="email"
          type="email"
          placeholder="Insira seu e-mail"
        />

        <label for="password">Crie sua senha:</label>
        <input
          id="password"
          type="password"
          placeholder="Insira sua senha"
        />

        <label for="confirm-password">Confirme sua senha:</label>
        <input
          id="confirm-password"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="button">Cadastrar-se</button>
      </form>

      <p>
        Já tem uma conta?
        <a href="#">Faça login aqui</a>
      </p>

    </section>
  </main>
</template>

<style scoped>
</style>