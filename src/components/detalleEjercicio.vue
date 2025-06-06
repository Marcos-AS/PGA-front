  <template>
    <div class="contenedor">
      <!-- Cargando -->
      <div v-if="cargando" class="texto-cargando">Cargando ejercicio...</div>

      <!-- Contenido del ejercicio -->
      <div v-else>
        <!-- Enunciado -->
        <section class="seccion-enunciado">
          <h1 class="titulo-ejercicio">{{ ejercicio.titulo }}</h1>
          <p class="descripcion-ejercicio">{{ ejercicio.descripcion }}</p>
        </section>

        <div v-if="cargando" class="cargando">
        Cargando ejercicio…
      </div>

        <section
        v-else-if="casoPruebaSeleccionado"
        class="seccion-ejemplo-test"
      >
        <h2>Ejemplo de prueba</h2>

        <!-- Entrada del test -->
        <div class="bloque-test">
          <h3>Entrada:</h3>
          <!-- 
            Usamos <pre> para conservar saltos de línea. 
            Si tu entrada es muy larga, ajusta con CSS (scroll, etc.).
          -->
          <pre class="entrada-test">{{ casoPruebaSeleccionado.entrada }}</pre>
        </div>

        <!-- Salida esperada del test -->
        <div class="bloque-test">
          <h3>Salida esperada:</h3>
          <pre class="salida-test">
  {{ casoPruebaSeleccionado.salidaEsperada }}
          </pre>
        </div>
      </section>

      <!-- Si ya se cargó pero NO hay tests definidos -->
      <section v-else class="sin-tests">
        <p>No hay casos de prueba disponibles para este ejercicio.</p>
      </section>

        <!-- Input de código -->
        <section class="seccion-codigo">
          <label for="codigo" class="label-codigo">Escribí tu código:</label>
          <MonacoEditor
            v-model:value="code"
            :language="ejercicio.categorias?.[0]?.nombre?.toLowerCase() || 'javascript'"
            theme="vs-dark"
            height="400"
          />
        </section>

        <!-- Botón enviar -->
        <button class="boton-enviar" @click="enviarRespuesta">
          Enviar Respuesta
        </button>

        <!-- Mensaje de estado -->
        <p v-if="mensaje" class="mensaje">{{ mensaje }}</p>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRoute } from 'vue-router'
  import router from '@/router'
  import { useAuth0 } from '@auth0/auth0-vue'
  import MonacoEditor from 'monaco-editor-vue3'

  const { getAccessTokenSilently } = useAuth0()

  interface TestEjercicio {
    entrada: string
    salidaEsperada: string
  }

  interface Categoria {
    id: number
    nombre: string
  }

  interface Ejercicio {
    titulo: string
    descripcion: string
    categorias: Categoria[]
    tests: TestEjercicio[]
  }

  const ejercicio = ref<Ejercicio>({
    titulo: '',
    descripcion: '',
    categorias: [],
    tests: []
  })

  const code = ref('')
  const mensaje = ref('')
  const cargando = ref(true)

  const route = useRoute()
  const ejercicioId = route.params.id || 1

  let casoPruebaSeleccionado = ref<TestEjercicio | null>(null)

  async function cargarEjercicio() {
    try {
      const ejercicioRes = await axios.get(`/api/ejercicios/${ejercicioId}`)
      // Suponemos que el endpoint devuelve un objeto JSON que coincide con EjercicioDTO,
      // incluyendo un arreglo "tests" con cada TestEjercicioDTO serializado correctamente.
      ejercicio.value = ejercicioRes.data as Ejercicio

      // Si existe al menos un test, lo guardamos en casoPruebaSeleccionado
      if (ejercicio.value.tests && ejercicio.value.tests.length > 0) {
        casoPruebaSeleccionado.value = ejercicio.value.tests[0]
      }

      console.log("categorias: ", ejercicio.value.categorias);
      

      cargando.value = false
    } catch (err) {
      console.error('Error al cargar el ejercicio:', err)
      mensaje.value = 'No se pudo cargar el ejercicio.'
    }
  }

  async function enviarRespuesta() {
    mensaje.value = 'Corrigiendo respuesta...'

    try {
      const token = await getAccessTokenSilently({})
      console.log("Payload:", {
        idEjercicio: Number(ejercicioId),
        codigo: code.value,
      });

      const res = await axios.post("/api/corregir", {
        "idEjercicio": ejercicioId,
        "codigo": code.value,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        
      
      router.push(`/correccion/${ejercicioId}`)
      sessionStorage.setItem('correccionResultado', JSON.stringify(res.data))
      console.log('Respuesta corregida:', res.data)
    } catch (error) {
      console.error('Error al enviar la respuesta:', error)
      mensaje.value = 'Error al enviar la respuesta.'
    }
  }

  onMounted(cargarEjercicio)
  </script>

<style scoped>
.contenedor {
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.texto-cargando {
  color: #555;
  text-align: center;
}

.titulo-ejercicio {
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
  margin-bottom: 0.5rem;
}

.descripcion-ejercicio {
  font-size: 1rem;
  color: #444;
  margin-bottom: 1rem;
}

.lista-detalles {
  list-style-type: disc;
  margin-left: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.ejemplo-ejercicio {
  font-style: italic;
  color: #666;
  margin-bottom: 1.5rem;
}

.seccion-codigo {
  margin-bottom: 1rem;
}

.label-codigo {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #222;
}

.area-codigo {
  width: 100%;
  font-family: 'Courier New', monospace;
  font-size: 0.95rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: vertical;
  background-color: #f8f8f8;
  color: #333;
}

.boton-enviar {
  background-color: #10b981;
  color: white;
  padding: 0.6rem 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.boton-enviar:hover {
  background-color: #059669;
}

.mensaje {
  margin-top: 1rem;
  font-weight: bold;
  color: #a31616;
}
</style>
