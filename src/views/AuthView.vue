<script setup>
import { ref, computed } from 'vue';
import { RouterLink, useRouter, useRoute } from 'vue-router';
import { cadastrar, login } from '@/services/auth';

const route = useRoute()
const router = useRouter()
const modoLogin =computed(()=> route.query.mode !== 'cadastro')

const nomeUsuarioCad =ref('');
const emailUsuarioCad = ref('');
const senhaUsuarioCad = ref('');

const emailLog = ref('');
const senhaLog = ref('');

const erro = ref('')
const carregando = ref(false)

async function ValidarCadastro() {
  erro.value = ''
  carregando.value = true
  try {
    await cadastrar(emailUsuarioCad.value, senhaUsuarioCad.value, nomeUsuarioCad.value)
    erro.value = ''
    alert('Cadastro feito! Verifique seu e-mail para confirmar.')
    router.push('/auth?mode=login')
  } catch (e) {
    erro.value = e.message
  } finally {
    carregando.value = false
  }
}

async function ValidarLogin() {
  erro.value = ''
  carregando.value = true
  try {
    await login(emailLog.value, senhaLog.value)
    router.push('/')
  } catch (e) {
    erro.value = e.message
  } finally {
    carregando.value = false
  }
}
</script>
<template>
   <div class="auth-wrapper">
  <Transition name="fade" mode="out-in">
    <main v-if="!modoLogin" key="cadastro" class="cadastro-page">
    <section class="cadastro-image">
      <img src="/imgs/boneco.png" alt="Personagem do AbasteceAí" />

      <img class="decorative-lines" src="/imgs/ondas.svg" alt="" />
    </section>

    <section class="cadastro-content">
      <div class="cadastro-title">
        <img class="cadastro-logo" src="/imgs/logoMaior.png" alt="Logo do AbasteceAí" />

        <h1>Bem-vindo ao AbasteceAí</h1>
      </div>

      <form @submit.prevent="ValidarCadastro">
        <label for="nome">Nome:</label>
        <input v-model="nomeUsuarioCad" type="text" placeholder="Insira seu nome">

        <label for="email">E-mail:</label>
        <input id="email" v-model="emailUsuarioCad" type="email" placeholder="Insira seu e-mail" />

        <label for="password">Crie sua senha:</label>
        <input id="password" v-model="senhaUsuarioCad" type="password" placeholder="Insira sua senha" />

        <label for="confirm-password">Confirme sua senha:</label>
        <input id="confirm-password" type="password" placeholder="Confirme sua senha" />

        <button type="submit" :disabled="carregando">{{ carregando? 'Cadastrando..': 'Cadastrar-se' }}</button>
        <p v-if="erro" class="erro"> {{ erro }}</p>
      </form>

      <p>
        Já tem uma conta?
      <RouterLink to="/auth?mode=login">Faça login aqui</RouterLink>
      </p>
    </section>
  </main>
 <main v-else key="login" class="login-page">
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
          src="/imgs/logoMaior.png"
        alt="Logo do AbasteceAí"
      />

      <h1>Bem-vindo de volta ao AbasteceAí</h1>

    </div>

      <form @submit.prevent="ValidarLogin">
        <label for="email">E-mail:</label>
        <input id="email" v-model="emailLog" type="email" placeholder="Insira seu e-mail" />

        <label for="password">Senha:</label>
        <input id="password" v-model="senhaLog" type="password" placeholder="Insira sua senha" />

        <button type="submit" :disabled="carregando">{{ carregando? 'Entrando..': 'Entrar' }}</button>
        <p v-if="erro" class="erro">{{ erro }}</p>
      </form>

      <p>
        Ainda não tem uma conta?
      <RouterLink to="/auth?mode=cadastro">Faça seu cadastro aqui</RouterLink>
      </p>
    </section>
  </main>
  </Transition>
  </div>
</template>
<style scoped>
*{
  scrollbar-width: none;
}
.erro {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: -10px;
}
.fade-enter-active{
    transition: opacity 0.5s ease-in, transform 0.4s ease ;

}
.fade-leave-active {
  transition: opacity 0.5s ease-out, transform 0.4s ease ;

}

.fade-enter-from{
  opacity: 0;
  transform: translateX(40px) ;
    scrollbar-width: none;
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
    scrollbar-width: none;
}
.auth-wrapper {
  min-height: 100vh;
  background-color: #354d8f;
}
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
  max-width: 380px;
}

.login-logo {
  width: 80px;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

.login-content h1 {
  margin: 0;
  color: #f5c400;
  font-size: 30px;
  font-weight: 700;
  text-align: left;
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

  border: 2px solid #f5c400;
  border-radius: 6px;

  background-color: #ffffff;
  color: #333333;
  font-size: 14px;
}

.login-content input::placeholder {
  color: #f5c400;
}

.login-content input:focus {
  outline: 2px solid #f5c400;
}

.login-content button {
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

.login-content button:hover {
  background-color: #e4b700;
}

.login-content p {
  width: 100%;
  max-width: 380px;
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
