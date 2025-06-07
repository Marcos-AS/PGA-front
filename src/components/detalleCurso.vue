<template>
  <main class="curso-detalle" v-if="curso">
    <h2>{{ curso.titulo }}</h2>

    <img
      v-if="curso.imagen"
      :src="`/uploads/${curso.imagen}`"
      :alt="`Imagen del curso ${curso.titulo}`"
    />

    <button @click="iniciarProgreso">Iniciar curso</button>

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
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-vue'
const { getAccessTokenSilently, user: authUser, isAuthenticated } = useAuth0()
const router = useRouter()


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


interface Progreso{
  id: number | null,
  curso: {
    id: number
  },
  usuario: {
    id: number
  },
  porcentajeCompletado: number,
  fechaActualizacion: string
}


// 2. Crear ref con tipo adecuado
const curso = ref<Curso | null>(null)

const route = useRoute()
const idCurso = parseInt(route.params.id as string, 10)
console.log('ID del curso:', idCurso);

const titulo = decodeURIComponent(route.params.titulo as string)

onMounted(async () => {
  try {
    const response = await fetch(`/api/cursos/${encodeURIComponent(idCurso)}`)
    const data = await response.json()
    console.log('Respuesta de la API:', data)
    curso.value = data

  } catch (error) {
    console.error('Error cargando curso:', error)
  }

})

async function iniciarProgreso() {

  if (!isAuthenticated.value || !authUser.value) {
    console.error('Usuario no autenticado')
    return
  }

  const idUsuario = authUser.value.sub
  const token = await getAccessTokenSilently({})
  axios.post('/api/progresos', {
    id: null,
    curso: {
      id: idCurso,
    },
    usuario: {
      id: idUsuario
    },
    porcentajeCompletado: 0.0,
    fechaActualizacion: new Date().toISOString(),
    },
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  .then(response => {
    console.log('Progreso iniciado:', response.data)
    sessionStorage.setItem('currentCursoId', String(idCurso))
    router.push(`/modulo/${curso.value?.modulos?.[0].id}`)
  })
  .catch(error => {
    console.error("error: ", error);
  })
}


// Separar temario por líneas
const temarioItems = computed(() => {
  return curso.value?.temario?.split('\n').map((item: string) => item.trim()) || []
})
</script>

