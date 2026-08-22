<template>
  <main class="cadastro-page">
    <section class="cadastro-image">
      <img src="/imgs/boneco.png" alt="Personagem do AbasteceAí" />

      <img class="decorative-lines" src="/imgs/ondas.svg" alt="" />
    </section>

    <section class="cadastro-content">
      <div class="cadastro-title">
        <img class="cadastro-logo" src="/imgs/logoMaior.png" alt="Logo do AbasteceAí" />

        <h1>Bem-vindo ao AbasteceAí</h1>
      </div>

      <form>
        <label for="email">E-mail:</label>
        <input id="email" type="email" placeholder="Insira seu e-mail" />

        <label for="password">Crie sua senha:</label>
        <input id="password" type="password" placeholder="Insira sua senha" />

        <label for="confirm-password">Confirme sua senha:</label>
        <input id="confirm-password" type="password" placeholder="Confirme sua senha" />

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
.cadastro-page {
  min-height: 100vh;
  display: flex;
  flex-direction: row-reverse;
  background-color: #ffffff;
  overflow: hidden;
}

.cadastro-image {
  width: 50%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
}

.cadastro-content {
  width: 50%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #354d8f;
  box-sizing: border-box;
  border-radius: 0 70px 70px 0;
}

.cadastro-content h1 {
  margin: 0;
  color: #f5c400;
  font-size: 30px;
  font-weight: 700;
  text-align: left;
}

.cadastro-content form {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
}

.cadastro-content label {
  margin-bottom: 7px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
}

.cadastro-content input {
  width: 100%;
  height: 45px;
  padding: 0 14px;
  margin-bottom: 20px;
  box-sizing: border-box;

  border: 2px solid #f5c400;
  border-radius: 6px;

  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
}

.cadastro-content input::placeholder {
  color: #f5c400;
}

.cadastro-content input:focus {
  outline: 2px solid #f5c400;
}

.cadastro-content button {
  width: 50%;
  height: 48px;
  margin: 5px auto 0;

  border: none;
  border-radius: 7px;

  background-color: #f5c400;
  color: #002492;

  font-size: 20px;
  font-weight: 700;

  cursor: pointer;
}

.cadastro-content button:hover {
  background-color: #e4b700;
}

.cadastro-content p {
  width: 100%;
  max-width: 380px;
  margin-top: 25px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
}

.cadastro-content a {
  color: #f5c400;
  font-weight: 700;
  text-decoration: none;
}

.cadastro-content a:hover {
  text-decoration: underline;
}

.cadastro-image > img:first-child {
  width: 90%;
  max-width: 650px;
  height: auto;
  object-fit: contain;
  transform: scaleX(1);
  position: relative;
  z-index: 1;
}

.cadastro-image .decorative-lines {
  position: absolute;
  left: 0;
  bottom: -120px;
  width: 100%;
  max-width: none;
  height: auto;
  z-index: 2;
}

.cadastro-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  max-width: 380px;
  margin-bottom: 35px;
}

.cadastro-logo {
  width: 80px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}


</style>
