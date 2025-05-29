<script lang="ts">
import PaymentForm from "./components/PaymentForm.vue";
import PaypalButton from "./components/PaypalButton.vue";

export default {
  components: {
    PaypalButton,
    PaymentForm
  },

  methods: {
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
        <RouterLink to="/" class="logo">PGA</RouterLink>
        <nav class="nav">
          <RouterLink to="/suscripciones">Suscripciones</RouterLink>
          <RouterLink to="/cursos">Cursos</RouterLink>
          <RouterLink to="/perfil">Perfil</RouterLink>
          <button @click="login" class="login-btn">Iniciar Sesión</button>
          <div class="menu-icon">☰</div>
        </nav>
      </header>

      <main class="app-main">
        <RouterView />
      </main>


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
    </div>
  </div>
</template>

<style>
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
  /*display: flex;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
  flex-wrap: wrap;*/

    display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  justify-content: center;
  align-items: center;
}


.card {
  /*flex: 1 1 300px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  text-align: center;
  background-color: #f9f9f9;*/
  width: 100%;
  max-width: 800px;
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

/*Perfil Usuario*/
.perfil-container {
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
}

.perfil-usuario {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.perfil-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.perfil-card {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.perfil-card h3 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #222;
}

.perfil-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.perfil-card li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 0;
  border-bottom: 1px solid #eee;
}

.perfil-card li:last-child {
  border-bottom: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

button .icon {
  font-size: 1.2rem;
}

.btn-editar {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.btn-editar:hover {
  background-color: #0056b3;
}
.btn-logout {
  background-color: #2c3e50 ;
  color: white;
  border: none;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn-logout:hover {
  background-color: #2c3e50;
}

.icon {
  margin-left: 0.5rem;
  cursor: pointer;
}
input {
  margin-left: 0.5rem;
}
button {
  margin-left: 0.5rem;
}

/* DETALLE MODULO*/
.modulo-detalle {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

iframe {
  display: block;
  margin-top: 1rem;
  max-width: 100%;
}

/* --- Detalle Curso --- */

.curso-detalle {
  max-width: 960px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  color: #222;
}

.curso-detalle h2 {
  font-size: 2rem;
  color: #1AA179;
  margin-bottom: 1rem;
}

.curso-detalle img {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  max-height: 400px;
  object-fit: cover;
}

/* Caja general de información */
.curso-box {
  margin-bottom: 2rem;
  line-height: 1.6;
}

.curso-box p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.curso-box ul {
  margin-left: 1.5rem;
  padding-left: 1rem;
}

.curso-box li {
  list-style-type: disc;
  color: #444;
}

/* Sección de módulos */
.modulos-box {
  margin-top: 2rem;
}

.curso-subt {
  font-size: 1.5rem;
  color: #1AA179;
  margin-bottom: 1rem;
}

/* Cada módulo como card */
.curso-card {
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.05);
}

.curso-card a {
  color: #1AA179;
  font-weight: 600;
  text-decoration: none;
}

.curso-card a:hover {
  text-decoration: underline;
}

.curso-card p {
  margin-top: 0.5rem;
  color: #333;
}

/* Detalle módulo */
.modulo-detalle {
  background-color: #ffffff;
  color: #1f2937; /* Gris oscuro */
  padding: 2rem;
  margin: 2rem auto;
  border-radius: 1rem;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
}

.modulo-detalle h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #047857; /* Verde PGA */
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #d1d5db; /* Gris claro */
  padding-bottom: 0.5rem;
}

.modulo-detalle p {
  font-size: 1rem;
  margin-bottom: 1.25rem;
  line-height: 1.6;
  color: #374151; /* Texto estándar PGA */
}

.modulo-detalle p strong {
  font-weight: 600;
  color: #111827;
}

.modulo-detalle iframe {
  width: 100%;
  aspect-ratio: 16 / 9;
  border: none;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.modulo-detalle a {
  display: inline-block;
  color: #047857;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #047857;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
}

.modulo-detalle a:hover {
  background-color: #d1fae5;
}

.botones-modulo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px; /* espacio entre botones */
  margin-top: 20px;
}

.btn-ver-ejercicios,
.btn-volver-curso {
  padding: 10px 16px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
  display: inline-block;
}


.btn-ver-ejercicios:hover {
  background-color: #218838;
}

.btn-volver-curso {
  border: 2px solid #28a745;
  color: #28a745;
  background-color: transparent;
}

.btn-volver-curso:hover {
  background-color: #e6f4ea;
}



/* Detalle Ejercicios */
.ejercicios-container {
  padding: 1rem;
  max-width: 72rem;
  margin: 0 auto;
}

.breadcrumb {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.titulo-seccion {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.ejercicios-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .ejercicios-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .ejercicios-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ejercicio-card {
  border: 1px solid #e5e7eb;
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.ejercicio-titulo {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.ejercicio-nivel {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.btn-resolver {
  background-color: #6b7280;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s;
  border: none;
  cursor: pointer;
}

.btn-resolver:hover {
  background-color: #4b5563;
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

/*div {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}*/

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  box-sizing: border-box;
}

/*
.section {
  max-width: 1200px;
  margin: 0 auto;
} */

.section {
  width: 100%;
  margin: 0;
  max-width: none;
}


/* Cursos disponibles */
.curso-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
  display: block;
  text-decoration: none;
  color: inherit;
}

.curso-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.curso-card h4 {
  margin-top: 0;
  margin-bottom: 10px;
  color: #21A899;
}

.temas-box {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.seccion-contenido {
  padding: 20px;
}

.temas,
.recursos {
  margin-bottom: 30px;
}

</style>
