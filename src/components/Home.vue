<script lang="ts">
import PaymentForm from "./PaymentForm.vue";
import PaypalButton from "./PaypalButton.vue";

export default {
  components: {
    PaypalButton,
    PaymentForm
  },
  data() {
    return {
      prompt: "",
      resp: ""
    };
  },
  methods: {
    async comprarCurso() {
      // tu lógica aquí
    },
    async enviar() {
      console.log("Método enviar() activado con prompt:", this.prompt);

      const res = await fetch("http://localhost:8080/api/llama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: this.prompt })
      });
      console.log(res);

      const text = await res.text();
      this.resp = text;
    },
    login() {
      this.$auth0.loginWithRedirect({
        authorizationParams: {
          prompt: 'consent'
        }
      });
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="section">

      <!-- HEADER -->
      <header class="header">
        <a href="/" class="logo"> PGA </a>
        <nav class="nav">
          <a href="/">Inicio</a>
          <a href="#cursos">Cursos</a>
          <button @click="login" class="login-btn">Iniciar Sesión</button>
          <div class="menu-icon">☰</div>
        </nav>
      </header>

      <!-- HERO -->
      <section class="hero">
        <h1>Plataforma de Aprendizaje Dinámico</h1>
        <p class="subtitulo">Una nueva forma de aprender </p>
        <p> Somos una plataforma inteligente con retroalimentación inmediata,
          contenidos dinámicos, y experiencias personalizadas. Impulsada por IA y con un modelo
          sostenible, adaptandose a cada usuario y evolucionando con ellos.</p>
      </section>

      <!-- CURSOS DESTACADOS -->
      <section id="cursos" class="cursos-section">
        <div class="card">
          <h2>Cursos Destacados</h2>
          <a href="#curso-detalle">
            <img src="/src/assets/portadaCurso.jpg" alt="Curso Destacado" class="imagen-curso">
          </a>
        </div>

        <div class="card">
          <h2>Beneficios de la Plataforma</h2>
          <ul>
            <li>Aprende a tu ritmo</li>
            <li>Cursos online con corrección automática</li>
            <li><a href="#cursos">🔍 Ver cursos</a></li>
          </ul>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="footer-links">
          <a href="#soporte" class="footer-link">Soporte técnico</a> |
          <a href="#faq" class="footer-link">Preguntas frecuentes</a>
        </div>
          <div class="social-icons">
            <a href="https://www.instagram.com" target="_blank">
              <img src="/src/assets/instagram-icon.png" alt="Instagram" class="icono-red">
            </a>
            <a href="https://www.facebook.com" target="_blank">
              <img src="/src/assets/facebook-logo.png" alt="Facebook" class="icono-red">
            </a>
            <a href="https://www.twitter.com" target="_blank">
              <img src="/src/assets/x-icon.png" alt="Twitter" class="icono-red">
            </a>
          </div>
      </footer>

      <!-- PARTE PRUEBA -->
      <section class="greetings">
        <h1>Chat con Llama.cpp</h1>
        <textarea v-model="prompt" placeholder="Escribí algo..."></textarea>
        <button @click="enviar">Enviar</button>
        <p><strong>Respuesta:</strong> {{ resp }}</p>

        <PaypalButton />
        <PaymentForm />
      </section>
    </div>
  </div>
</template>

<style scoped>
/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
.logo {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}
.nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.nav a, .login-btn {
  text-decoration: none;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
}
.menu-icon {
  font-size: 1.5rem;
}

/* PRESENTACIÓN */

.subtitulo {
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  color: gray;
}

/* CURSOS DESTACADOS */
.cursos-section {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.card {
  flex: 1 1 300px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  text-align: center;
  background-color: #f9f9f9;
}

.imagen-curso {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 1rem;
  transition: transform 0.3s;
}

.imagen-curso:hover {
  transform: scale(1.05);
}

/* HERO */
.hero {
  text-align: center;
  padding: 2rem 1rem;
}


/* FOOTER */
.footer {
  margin-top: 2rem;
  padding: 1rem;
  background: #eee;
  text-align: center;
  font-size: 0.9rem;
  background-color: #f1f1f1;
}

.footer-links {
  margin-bottom: 0.5rem;
}
.footer-link {
  color: #2c3e50;
  text-decoration: none;
  margin: 0 0.5rem;
}
.footer-link:hover {
  text-decoration: underline;
}

.social-icons {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.icono-red {
  width: 24px;
  height: 24px;
  filter: grayscale(100%);
}

/* CHAT Y TESTEOS */
.greetings {
  margin-top: 3rem;
  padding: 1rem;
  background: #f9f9f9;
  border-top: 1px solid #ccc;
  text-align: center;
}
textarea {
  width: 100%;
  height: 80px;
  margin: 1rem 0;
}
button {
  padding: 0.5rem 1rem;
}

div {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  width: 100%;
  padding: 0 2rem;
  box-sizing: border-box;
}

.section {
  max-width: 1200px;
  margin: 0 auto;
}

</style>
