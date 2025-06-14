<template>
          <!-- HERO -->
    <section class="hero">
        <h1>Plataforma de Aprendizaje Dinámico</h1>
        <p class="subtitulo">Una nueva forma de aprender </p>
        <p> Somos una plataforma inteligente con retroalimentación inmediata,
          contenidos dinámicos, y experiencias personalizadas. Impulsada por IA y con un modelo
          sostenible, adaptandose a cada usuario y evolucionando con ellos.</p>
    </section>

    <section id="cursos" class="cursos-section">

      <div class="card">
        <h2>Ayudanos a conocerte</h2>
        
          Armamos el curso a tu medida
          <p>
            <RouterLink to="/formulario-creacion"> Crear curso</Routerlink>
          </p>
        
      </div>

      <div class="card">
        <h2>Beneficios de la Plataforma</h2>
          <ul>
            <li>Aprende a tu ritmo</li>
            <li>Cursos online con corrección automática</li>
            <RouterLink to="/cursos">🔍 Ver cursos</Routerlink>
          </ul>
      </div>


      <!-- CURSOS DESTACADOS -->
      <div class="card">
        <h2>Cursos Destacados</h2>
          <img src="/src/assets/portadaCurso.jpg" alt="Curso Destacado" class="imagen-curso">
      </div>
    </section>

    <!-- PARTE PRUEBA -->
      <!-- <section class="greetings">
        <h1>Chat con Llama.cpp</h1>
        <textarea v-model="prompt" placeholder="Escribí algo..."></textarea>
        <button @click="enviar">Enviar</button>
        <p><strong>Respuesta:</strong> {{ resp }}</p>

        <PaypalButton/>
        <PaymentForm/>
      </section> -->

</template>
