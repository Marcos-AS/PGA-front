<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const moduloId = route.params.id as string

// Estado reactivo para el módulo
const modulo = ref({
  id: 0,
  idCurso: 0,
  titulo: '',
  descripcion: '',
  orden: 0,
  contenido: '',
  cursoTitulo: ''
})

// Lógica para cargar el módulo desde la API
onMounted(async () => {
  try {
    const response = await axios.get(`/api/modulos/${moduloId}`)
    modulo.value = response.data
    console.log("Módulo cargado:", response.data);
    
  } catch (error) {
    console.error("Error al cargar módulo:", error)
    router.push('/404')
  }
})

// Computar el enlace al curso
const cursoUrl = computed(() => `/curso/${encodeURIComponent(modulo.value.idCurso)}`)
</script>

<template>
  <main class="modulo-detalle">
    <h2>{{ modulo.titulo }}</h2>

    <p v-if="modulo.descripcion">
      <strong>Descripción:</strong> {{ modulo.descripcion }}
    </p>

    <!-- <p><strong>Contenido:</strong></p>
    <iframe
      v-if="modulo.contenido"
      width="560"
      height="315"
      :src="modulo.contenido"
      frameborder="0"
      allowfullscreen
      title="Contenido del módulo"
    ></iframe> -->

    <div class="botones-modulo">
      <RouterLink :to="`/modulo/${modulo.id}/ejercicios`" class="btn-ver-ejercicios">
        Ver ejercicios del módulo
      </RouterLink>

      <RouterLink :to="cursoUrl" class="btn-volver-curso">
        ← Volver al curso
      </RouterLink>
    </div>
  </main>
</template>


