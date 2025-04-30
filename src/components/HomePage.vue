<script lang="ts">
import { defineComponent } from 'vue';
import PaypalButton from './PaypalButton.vue';
import PaymentForm from './PaymentForm.vue';
export default defineComponent({
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
});

</script>

<template>
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

    <!-- PARTE PRUEBA -->      
      <section class="greetings">
        <h1>Chat con Llama.cpp</h1>
        <textarea v-model="prompt" placeholder="Escribí algo..."></textarea>
        <button @click="enviar">Enviar</button>
        <p><strong>Respuesta:</strong> {{ resp }}</p>

        <PaypalButton/>
        <PaymentForm/>
      </section>

</template>