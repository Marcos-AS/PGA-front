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

      <section class="evaluacion-box">
      <h3 class="curso-subt">Evaluación Final</h3>

      <div v-if="evaluacion">
        <div class="evaluacion-card">
          <h4>{{ evaluacion.titulo }}</h4>
          <p>{{ evaluacion.descripcion }}</p>
          <p><strong>Dificultad:</strong> {{ evaluacion.dificultad }}</p>
          <p>
            <strong>Creado el:</strong>
            {{ formatDate(evaluacion.fechaCreacion) }}
          </p>
          <RouterLink
            :to="`/evaluacion/${evaluacion.id}`"
            class="btn-evaluacion"
          >
            Iniciar Evaluación
          </RouterLink>
        </div>
      </div>

      <div v-else>
        <p>No hay Evaluación Final generada aún.</p>
        <button @click="generarEvaluacion" class="btn-generate">
          Generar Evaluación Final
        </button>
      </div>
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
const route = useRoute()


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

interface Evaluacion {
  id: number
  idCurso: number
  titulo: string
  descripcion: string
  dificultad: string
  fechaCreacion: string
  tests: unknown[]
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
const idCurso = parseInt(route.params.id as string, 10)
const evaluacion = ref<Evaluacion | null>(null)
console.log('ID del curso:', idCurso);

const titulo = decodeURIComponent(route.params.titulo as string)

onMounted(async () => {
  try {
    const response = await fetch(`/api/cursos/${encodeURIComponent(idCurso)}`)
    const data = await response.json()
    console.log('Respuesta de la API:', data)
    curso.value = data
    await fetchEvaluacion()

  } catch (error) {
    console.error('Error cargando curso:', error)
  }

})

async function fetchEvaluacion() {
  try {
    const respEval = await axios.get<Evaluacion[]>(`/api/evaluaciones`, { params: { cursoId: idCurso } })
    if (respEval.data.length > 0) {
      evaluacion.value = respEval.data[0]
    }
  } catch (err) {
    console.error('Error obteniendo evaluación:', err)
  }
}

/**
 * Genera la evaluación final a través del endpoint POST
 */
async function generarEvaluacion() {
  if (!isAuthenticated.value) {
    console.error('Usuario no autenticado')
    return
  }
  try {
    const token = await getAccessTokenSilently()
    const payload = { idCurso } // ajusta si GenerateEvaluacionRequestDTO tiene más campos
    const resp = await axios.post<Evaluacion>(`/api/evaluaciones`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    evaluacion.value = resp.data
  } catch (err) {
    console.error('Error generando evaluación:', err)
  }
}


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



function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<style scoped>
button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background-color:#1AA179;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>