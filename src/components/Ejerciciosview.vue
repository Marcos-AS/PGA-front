<template>
  <div class="ejercicios-container">
    <h3 class="titulo-seccion">Ejercicios</h3>

       <!-- Loader -->
    <p v-if="cargando">Cargando ejercicios...</p>

    <div class="ejercicios-grid">
      <div
        v-for="ejercicio in ejercicios"
        :key="ejercicio.id"
        class="ejercicio-card"
      >
        <h4 class="ejercicio-titulo">{{ ejercicio.titulo }}</h4>
        <p class="ejercicio-nivel">Nivel: {{ejercicio.dificultad }}</p>
        <RouterLink
          class="btn-resolver"
          :to="`/ejercicio/${ejercicio.id}`"
        >
          Resolver desafío
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import { useRoute } from 'vue-router'
const route = useRoute()
const moduloId = parseInt(route.params.id)

//const moduloNombre = 'Algoritmos' // Podés pasarlo como prop o desde ruta


const ejercicios = ref([
  // Simulación de datos
  /*{ id: 1, titulo: 'Sumar números', dificultad: 1 },
  { id: 2, titulo: 'Ordenar lista', dificultad: 2 },
  { id: 3, titulo: 'Búsqueda binaria', dificultad: 3 },
  { id: 4, titulo: 'Factorial', dificultad: 1 },*/])

const cargando = ref(true)

onMounted(async () => {
  if (isNaN(moduloId)) {
    console.error('ID del módulo no válido.')
    cargando.value = false
    return
  }

  try {
    const res = await axios.get(`/api/modulos/${moduloId}/ejercicios`)
    if (Array.isArray(res.data)) {
      ejercicios.value = res.data
    } else {
      console.warn('La API no devolvió un array de ejercicios.')
    }
  } catch (error) {
    console.error('Error al cargar ejercicios del módulo:', error)
  } finally {
    cargando.value = false
  }
})


function resolverDesafio(idEjercicio) {
  console.log('Ir a resolver ejercicio con id:', idEjercicio)
}
</script>
