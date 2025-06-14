<template>
  <div class="contenedor">
    <div v-if="cargando" class="texto-cargando">Cargando evaluación...</div>

    <div v-else>
      <section class="seccion-enunciado">
        <h1 class="titulo-evaluacion">{{ evaluacion.titulo }}</h1>
        <p class="descripcion-evaluacion">{{ evaluacion.descripcion }}</p>
      </section>

      <section v-if="casoPruebaSeleccionado" class="seccion-ejemplo-test">
        <h2>Ejemplo de prueba</h2>
        <div class="bloque-test">
          <h3>Entrada:</h3>
          <pre class="entrada-test">{{ casoPruebaSeleccionado.entrada }}</pre>
        </div>
        <div class="bloque-test">
          <h3>Salida esperada:</h3>
          <pre class="salida-test">{{ casoPruebaSeleccionado.salidaEsperada }}</pre>
        </div>
      </section>

      <section v-else class="sin-tests">
        <p>No hay casos de prueba disponibles para esta evaluación.</p>
      </section>

      <section class="seccion-codigo">
        <label for="codigo" class="label-codigo">Escribí tu código:</label>
        <MonacoEditor
          v-model:value="code"
          :language="lenguaje"
          theme="vs-dark"
          height="400"
        />
      </section>

      <button class="boton-enviar" @click="enviarRespuesta">
        Enviar Respuesta
      </button>

      <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
import { useAuth0 } from '@auth0/auth0-vue'
import MonacoEditor from 'monaco-editor-vue3'

const route = useRoute()
const router = useRouter()
const { getAccessTokenSilently } = useAuth0()

interface Test {
  entrada: string
  salidaEsperada: string
}

interface Evaluacion {
  id: number
  titulo: string
  descripcion: string
  dificultad: string
  fechaCreacion: string
  tests: Test[]
}

const evaluacion = ref<Evaluacion>({
  id: 0,
  titulo: '',
  descripcion: '',
  dificultad: '',
  fechaCreacion: '',
  tests: []
})

const code = ref('')
const mensaje = ref('')
const cargando = ref(true)
const casoPruebaSeleccionado = ref<Test | null>(null)

const lenguaje = 'javascript' // o basado en evaluacion.dificultad/curso

const evaluacionId = Number(route.params.id)

onMounted(async () => {
  try {
    const resp = await axios.get<Evaluacion>(`/api/evaluaciones/${evaluacionId}`)
    evaluacion.value = resp.data
    if (evaluacion.value.tests.length) {
      casoPruebaSeleccionado.value = evaluacion.value.tests[0]
    }
  } catch (err) {
    console.error('Error al cargar la evaluación:', err)
    mensaje.value = 'No se pudo cargar la evaluación.'
  } finally {
    cargando.value = false
  }
})

async function enviarRespuesta() {
  mensaje.value = 'Corrigiendo evaluación...'
  try {
    const token = await getAccessTokenSilently()
    const res = await axios.post(
      '/api/corregir/evaluaciones',
      { idEvaluacion: evaluacionId, codigo: code.value },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    // guardamos el resultado y vamos a la pantalla de corrección
    sessionStorage.setItem('correccionResultado', JSON.stringify(res.data))
    console.log (evaluacionId)
    router.push(`/correccion/evaluacion/${evaluacionId}`)
  } catch (err) {
    console.error('Error al enviar la evaluación:', err)
    mensaje.value = 'Error al corregir la evaluación.'
  }
}
</script>

<style scoped>
.texto-cargando { font-style: italic; }
.titulo-evaluacion { font-size: 2rem; margin-bottom: .5rem; }
.descripcion-evaluacion { margin-bottom: 1rem; }
.bloque-test { margin-bottom: 1rem; }
.seccion-codigo { margin-top: 1.5rem; }
.boton-enviar { margin-top: 1rem; }
.mensaje { color: red; margin-top: .5rem; }
</style>
