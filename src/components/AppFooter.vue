```vue
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer id="topo">
    <div class="footer">

      <!-- LOGO -->
      <div class="logo">
        <img
          src="../../public/imagens/Logo 2.png"
          alt="Logo Abastece Aí"
        />

        <h1>Abastece Aí</h1>
      </div>

      <!-- NAVEGAÇÃO -->
      <div class="navegacao">
        <nav>
          <h2>NAVEGAÇÃO</h2>

          <span class="linha"></span>

          <ul>
            <li>
              <RouterLink to="/inicio">Home</RouterLink>
            </li>

            <li>
              <RouterLink to="/postos">Mapa</RouterLink>
            </li>

            <li>
              <RouterLink to="/postos">Postos</RouterLink>
            </li>

            <li>
              <RouterLink to="/sobrenos">Sobre nós</RouterLink>
            </li>
          </ul>
        </nav>
      </div>

      <!-- CONTATO -->
      <div class="contato">
        <nav>
          <h2>CONTATO</h2>

          <span class="linha"></span>

          <ul>
            <li>
              <a href="mailto:abastecai@gmail.com">
                Email
              </a>
            </li>

            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Github
              </a>
            </li>

            <li>
              <a href="tel:+5547999999999">
                +55 47 99999-9999
              </a>
            </li>

            <li>
              <a href="mailto:abastecai@gmail.com">
                abastecai@gmail.com
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- BOTÃO VOLTAR AO TOPO -->
      <a href="#topo" class="voltar-topo" aria-label="Voltar ao topo">
        <span></span>
      </a>

    </div>
  </footer>
</template>

<style scoped>
footer {
  width: 100%;
  min-height: 347px;

  background-image: url('../../public/imagens/background.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;
  align-items: center;

  position: relative;
}

/* CONTAINER PRINCIPAL */
.footer {
  width: 100%;
  max-width: 1200px;

  margin: 0 auto;
  padding: 40px 60px;

  display: flex;
  align-items: center;
  gap: 120px;

  position: relative;
  box-sizing: border-box;
}

/* LOGO */
.logo {
  width: 180px;

  display: flex;
  flex-direction: column;
  align-items: center;

  flex-shrink: 0;
}

.logo img {
  width: 145px;
  height: auto;

  display: block;
}

.logo h1 {
  margin: 10px 0 0;

  color: white;
  font-size: 30px;
  font-weight: 700;

  white-space: nowrap;
}

/* NAVEGAÇÃO E CONTATO */
.navegacao,
.contato {
  align-self: flex-start;
  margin-top: 70px;
}

nav h2 {
  margin: 0;

  color: #050505;
  font-size: 25px;
  font-weight: 700;
}

/* LINHA ABAIXO DOS TÍTULOS */
.linha {
  display: block;

  width: 42px;
  height: 4px;

  margin-top: 9px;
  margin-bottom: 14px;

  background-color: #192b5b;
  border-radius: 10px;
}

/* LISTAS */
nav ul {
  list-style: none;

  padding: 0;
  margin: 0;
}

nav ul li {
  margin-bottom: 7px;
}

/* LINKS */
nav ul li a {
  color: #050505;

  text-decoration: none;

  font-size: 16px;
  line-height: 1.35;

  transition: color 0.2s ease;
}

nav ul li a:hover {
  color: #123c8c;
}

/* BOTÃO VOLTAR AO TOPO */
.voltar-topo {
  position: absolute;

  right: 0;
  bottom: 18px;

  width: 43px;
  height: 43px;

  background-color: white;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  text-decoration: none;
}

/* SETA */
.voltar-topo span {
  width: 14px;
  height: 14px;

  border-left: 2px solid #111;
  border-top: 2px solid #111;

  transform: rotate(45deg);

  margin-top: 7px;
}

/* RESPONSIVIDADE */
@media (max-width: 900px) {
  .footer {
    padding: 40px;
    gap: 60px;
  }

  .logo {
    width: 150px;
  }

  .logo img {
    width: 120px;
  }

  .logo h1 {
    font-size: 24px;
  }

  nav h2 {
    font-size: 21px;
  }
}

@media (max-width: 700px) {
  footer {
    background-size: cover;
  }

  .footer {
    padding: 45px 30px;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
  }

  .logo {
    width: 100%;
  }

  .navegacao,
  .contato {
    margin-top: 0;
  }

  .voltar-topo {
    right: 20px;
    bottom: 15px;
  }
}
</style>