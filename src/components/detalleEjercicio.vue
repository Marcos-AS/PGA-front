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
      <!-- Input de código -->
      <section class="seccion-codigo">
        <label for="codigo" class="label-codigo">Escribí tu código:</label>
        <textarea
          id="codigo"
          v-model="respuesta"
          class="area-codigo"
          rows="12"
          placeholder="// Escribe tu solución acá..."
        ></textarea>
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

const { getAccessTokenSilently } = useAuth0()
const ejercicio = ref({
  titulo: '',
  descripcion: '',
})
const respuesta = ref('')
const mensaje = ref('')
const cargando = ref(true)

const route = useRoute()
const ejercicioId = route.params.id || 1


async function cargarEjercicio() {
  try {
    const res = await axios.get(`/api/ejercicios/${ejercicioId}`)
    ejercicio.value = res.data
  } catch (error) {
    console.error('Error al obtener el ejercicio:', error)
  } finally {
    cargando.value = false
  }
}

async function enviarRespuesta() {
  mensaje.value = 'Corrigiendo respuesta...'

  try {
    const token = await getAccessTokenSilently({})
    console.log("Payload:", {
      idEjercicio: Number(ejercicioId),
      codigo: respuesta.value,
    });

    const res = await axios.post(`/api/corregir`, {
      idEjercicio: ejercicioId,
      codigo: respuesta.value,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      

    sessionStorage.setItem('correccionResultado', JSON.stringify(res.data))

    router.push(`/correccion/${ejercicioId}`)
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
