<script setup lang="ts">
const cursos = [
  {
    titulo: "Programación en Python",
    descripcion: "Aprendé desde lo básico hasta temas avanzados de Python.",
  },
  {
    titulo: "Estructuras de Datos",
    descripcion: "Domina listas, pilas, colas, árboles y más.",
  },
  {
    titulo: "Introducción a JavaScript",
    descripcion: "Conoce el lenguaje más usado del lado del cliente.",
  },
];
</script>

<template>
  <main>
    <section class="seccion-contenido">
      <h2>Aprenda y mejore habilidades de programación</h2>

      <section class="temas">
        <h3>Prepararse por temas</h3>
        <section class="temas-box">
          <RouterLink
            v-for="curso in cursos"
            :key="curso.titulo"
            :to="`/curso/${encodeURIComponent(curso.titulo)}`"
            class="curso-card"
          >
            <h4>{{ curso.titulo }}</h4>
            <p>{{ curso.descripcion }}</p>
          </RouterLink>

        </section>
      </section>

      <section class="recursos">
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
      </section>

      <h3>Cursos Activos</h3>
      <section class="temas-box">
        <p class="curso-card">¡Lo siento! No tienes ningún curso activo en este momento.</p>
      </section>

      <section>
        <RouterLink to="formulario-creacion">Crear curso</RouterLink>
      </section>

      <!-- Esto debería estar restringido solo a administradores en producción -->
      <section>
        <a href="/agregar-curso" class="curso-card">
          <h4>Agregar un nuevo curso</h4>
        </a>
      </section>
    </section>
  </main>
</template>
