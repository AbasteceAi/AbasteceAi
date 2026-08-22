<template>
  <main class="login-page">
    <section class="login-image">
     <img src="/imgs/boneco.png" alt="Personagem do AbasteceAí" />

        <img
    class="decorative-lines"
     src="/imgs/ondas.svg"
     alt=""
    />

    </section>

    <section class="login-content">

       <div class="login-title">
    <img
        class="login-logo"
          src="/imgs/logo.png"
        alt="Logo do AbasteceAí"
      />

      <h1>Bem-vindo de volta ao AbasteceAí</h1>
        
    </div>

      <form>
        <label for="email">E-mail:</label>
        <input id="email" type="email" placeholder="Insira seu e-mail" />

        <label for="password">Senha:</label>
        <input id="password" type="password" placeholder="Insira sua senha" />

        <button type="button">Entrar</button>
      </form>

      <p>
        Ainda não tem uma conta?
        <a href="#">Faça seu cadastro aqui</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  background-color: #ffffff;
  overflow: hidden;
}

.login-image {
  width: 50%;
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
}

.login-image > img:first-child {
  width: 90%;
  max-width: 650px;
  height: auto;
  object-fit: contain;
  transform: scaleX(-1);
  position: relative;
  z-index: 1;
}

.login-image .decorative-lines {
  position: absolute;
  left: 0;
  bottom: -120px;
  width: 100%;
  max-width: none;
  height: auto;
  z-index: 2;
}

.login-content {
  width: 50%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;
  background-color: #354d8f;
  box-sizing: border-box;
  border-radius: 70px 0 0 70px;
}

.login-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  margin-bottom: 35px;
}

.login-logo {
  width: 65px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.login-content h1 {
  margin: 0;
  color: #f5c400;
  font-size: 24px;
  font-weight: 700;
  text-align: left;
  white-space: nowrap;
}

.login-content form {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
}

.login-content label {
  margin-bottom: 7px;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
}

.login-content input {
  width: 100%;
  height: 45px;
  padding: 0 14px;
  margin-bottom: 20px;
  box-sizing: border-box;

  border: none;
  border-radius: 6px;

  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
}

.login-content input::placeholder {
  color: #9a9a9a;
}

.login-content input:focus {
  outline: 2px solid #f5c400;
}

.login-content button {
  width: 100%;
  height: 48px;
  margin-top: 5px;

  border: none;
  border-radius: 7px;

  background-color: #f5c400;
  color: #002492;

  font-size: 20px;
  font-weight: 700;

  cursor: pointer;
}

.login-content button:hover {
  background-color: #e4b700;
}

.login-content p {
  margin-top: 25px;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
}

.login-content a {
  color: #f5c400;
  font-weight: 700;
  text-decoration: none;
}

.login-content a:hover {
  text-decoration: underline;
}


@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-image,
  .login-content {
    width: 100%;
    min-height: auto;
  }

  .login-image {
    padding: 30px 20px;
  }

  .login-image img {
    width: 70%;
  }

  .login-content {
    padding: 45px 25px;
  }
}
</style>
