<script lang="ts">
  import axios from 'axios';

  type Curso = {
    id: number;
    titulo: string;
    descripcion: string;
  }

  export default {
    mounted() {
      this.getCursos();
    },

    data() {
      return {
        cursos: [] as Curso[],
      };
    },

    methods: {
      async getCursos() {
        try {
          const respuesta = await axios.get('/api/cursos');
          console.log("cursos: ", respuesta.data);
          this.cursos = respuesta.data;
        } catch (error) {
          console.error('Error al obtener cursos:', error);
        }
      },
    },
  };

</script>

<template>
  <main>
    <section class="seccion-contenido">
      <h2>Aprenda y mejore habilidades de programación</h2>

      <section class="temas">
        <h3>Cursos disponibles</h3>
        <section class="temas-box">
          <RouterLink
            v-for="curso in cursos"
            :key="curso.titulo"
            :to="`/cursos/${encodeURIComponent(curso.id)}/${encodeURIComponent(curso.titulo)}`"
            class="curso-card"
          >
            <h4>{{ curso.titulo }}</h4>
            <p>{{ curso.descripcion }}</p>
          </RouterLink>

        </section>
      </section>

      <!-- <section class="recursos">
        <h3>Recursos educativos</h3>
        <section class="temas-box">
          <a href="/videos" class="curso-card">
            <h4>Videos</h4>
            <p>Explicaciones visuales para facilitar tu aprendizaje.</p>
          </a>
          <a href="/articulos" class="curso-card">
            <h4>Artículos</h4>
            <p>Explora conceptos en profundidad con nuestros artículos.</p>
          </a>
        </section>
      </section> -->

      <h3>Cursos Activos</h3>
      <section class="temas-box">
        <p class="curso-card">¡Lo siento! No tienes ningún curso activo en este momento.</p>
      </section>

      <!-- Esto debería estar restringido solo a administradores en producción -->
      <section class="curso-card">
          <h4><RouterLink to="formulario-creacion">Crear curso</RouterLink></h4>
      </section>
    </section>
  </main>
</template>
