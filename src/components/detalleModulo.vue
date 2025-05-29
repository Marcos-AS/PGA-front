<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

// Obtener el ID del módulo desde la URL
const moduloId = route.params.id as string

// Datos simulados
const modulo = ref({
  id: parseInt(moduloId),
  idCurso: 1,
  titulo: "Módulo 1: Introducción a Python",
  descripcion: "Este es un módulo introductorio para demostrar la vista.",
  orden: 1,
  contenido: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  cursoTitulo: "Programación en Python"
})

// Computar el enlace de retorno al curso
const cursoUrl = computed(() => `/curso/${encodeURIComponent(modulo.value.cursoTitulo)}`)

// NOTA: Cuando esté lista la API, podés reemplazar lo anterior por algo así:
/*
import { onMounted } from 'vue'

onMounted(async () => {
  try {
    const res = await fetch(`/api/modulos/${moduloId}`)
    if (!res.ok) throw new Error('Error al cargar módulo')
    modulo.value = await res.json()
  } catch (error) {
    console.error(error)
    router.push('/404')
  }
})
*/
</script>

<template>
  <main class="modulo-detalle">
    <h2>{{ modulo.titulo }}</h2>

    <p v-if="modulo.descripcion"><strong>Descripción:</strong> {{ modulo.descripcion }}</p>

    <p><strong>Contenido:</strong></p>
    <iframe
      v-if="modulo.contenido"
      width="560"
      height="315"
      :src="modulo.contenido"
      frameborder="0"
      allowfullscreen
      title="Contenido del módulo"
    ></iframe>

    <div class="botones-modulo">
      <RouterLink :to="`/modulo/${modulo.id}/detalleEjercicio`" class="btn-ver-ejercicios">
        Ver ejercicio del módulo
      </RouterLink>

      <RouterLink :to="cursoUrl" class="btn-volver-curso">
        ← Volver al curso
      </RouterLink>
    </div>

  </main>
</template>

