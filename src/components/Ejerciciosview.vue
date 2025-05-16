<template>
  <div class="ejercicios-container">
    <h3 class="titulo-seccion">Ejercicios</h3>

    <div class="ejercicios-grid">
      <div
        v-for="ejercicio in ejercicios"
        :key="ejercicio.id"
        class="ejercicio-card"
      >
        <h4 class="ejercicio-titulo">{{ ejercicio.titulo }}</h4>
        <p class="ejercicio-nivel">Nivel: {{ formatearNivel(ejercicio.dificultad) }}</p>
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

const moduloNombre = 'Algoritmos' // Podés pasarlo como prop o desde ruta

const ejercicios = ref([])

// Simulación de datos
const mockData = [
  { id: 1, titulo: 'Sumar números', dificultad: 1 },
  { id: 2, titulo: 'Ordenar lista', dificultad: 2 },
  { id: 3, titulo: 'Búsqueda binaria', dificultad: 3 },
  { id: 4, titulo: 'Factorial', dificultad: 1 },
]

onMounted(() => {
  ejercicios.value = mockData
})

function formatearNivel(dificultad) {
  switch (dificultad) {
    case 1: return 'básico'
    case 2: return 'intermedio'
    case 3: return 'avanzado'
    default: return 'desconocido'
  }
}

function resolverDesafio(idEjercicio) {
  console.log('Ir a resolver ejercicio con id:', idEjercicio)
  // Redirigir o abrir modal, etc.
}
</script>
