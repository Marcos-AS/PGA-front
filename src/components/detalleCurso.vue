<template>
  <main class="curso-detalle" v-if="curso">
    <h2>{{ curso.titulo }}</h2>

    <img
      v-if="curso.imagen"
      :src="`/uploads/${curso.imagen}`"
      :alt="`Imagen del curso ${curso.titulo}`"
    />

    <section class="curso-box">
      <p><strong>Descripción:</strong> {{ curso.descripcion }}</p>
      <p><strong>Nivel:</strong> {{ curso.nivel }}</p>
      <p><strong>Duración:</strong> {{ curso.duracion }}</p>
    </section>

    <section class="modulos-box" v-if="curso.modulos && curso.modulos.length">
      <h3 class="curso-subt">Módulos</h3>
      <ul>
        <li v-for="(modulo, i) in curso.modulos" :key="i" class="curso-card">
          <RouterLink :to="`/modulo/${modulo.id}`">
            {{ modulo.titulo }}
          </RouterLink>
          <p>{{ modulo.descripcion }}</p>
        </li>
      </ul>
    </section>

  </main>

  <div v-else>Cargando curso...</div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

interface Curso {
  titulo: string
  descripcion: string
  imagen?: string
  temario: string
  nivel: string
  duracion: string
  modulos?: {
    id: number
    titulo: string
    descripcion: string
  }[]
}

// 2. Crear ref con tipo adecuado
const curso = ref<Curso | null>(null)

const route = useRoute()
const id = parseInt(route.params.id as string, 10)
console.log('ID del curso:', id);

const titulo = decodeURIComponent(route.params.titulo as string)


onMounted(async () => {
  try {
    const response = await fetch(`/api/cursos/${encodeURIComponent(id)}`)
    const data = await response.json()
    console.log('Respuesta de la API:', data)
    curso.value = data

  } catch (error) {
    console.error('Error cargando curso:', error)
    //curso.value = null

     // Datos simulados para prueba
    /*curso.value = {
      titulo: 'Curso de Programación en Python (Simulado)',
      descripcion: 'Este es un curso simulado para mostrar datos de prueba mientras el backend no responde.',
      imagen: 'https://via.placeholder.com/600x300?text=Curso+Simulado',
      duracion: '8 semanas',
      nivel: 'Intermedio',
      temario: 'Temas simulados',
      modulos: [
    {
      id: 1,
      titulo: 'Módulo 1: Fundamentos de Python',
      descripcion: 'Aprenderás la sintaxis básica y estructuras fundamentales del lenguaje.'
    },
    {
      id: 2,
      titulo: 'Módulo 2: Programación Orientada a Objetos',
      descripcion: 'Explorarás clases, objetos, herencia y encapsulamiento en Python.'
    },
    {
      id: 3,
      titulo: 'Módulo 3: Librerías y Buenas Prácticas',
      descripcion: 'Verás cómo usar librerías populares como NumPy, y adoptar un estilo de código limpio.'
    }
    ]
    }*/
  }

})


// Separar temario por líneas
const temarioItems = computed(() => {
  return curso.value?.temario?.split('\n').map((item: string) => item.trim()) || []
})
</script>

