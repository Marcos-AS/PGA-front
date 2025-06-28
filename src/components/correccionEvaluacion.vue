<template>
  <div class="contenedor-correccion">
    <h2>Corrección del ejercicio</h2>

    <div v-if="resultado">
      <p class="estado" :class="{ correcto: resultado.success, incorrecto: !resultado.success }">
        {{ resultado.success ? '✔ ¡Respuesta correcta!' : '✘ Respuesta incorrecta' }}
      </p>

      <p v-if="resultado.output">
        <strong>Respuesta corregida:</strong>
      </p>
      <pre v-if="correccion"><code>{{ correccion }}</code></pre>

      <p v-if="resultado.error">
        <strong>Error:</strong> {{ resultado.error }}
      </p>
    </div>

    <RouterLink to="/" class="volver">Volver al inicio</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface CorreccionResponse {
  success: boolean
  output: string
  error: string
}

const resultado = ref<CorreccionResponse | null>(null)
const correccion = ref<string>('')

onMounted(async () => {
  const data = sessionStorage.getItem('correccionResultado')
  if (data) {
    try {
      if (data.startsWith('{')) {
        const parsed = JSON.parse(data) as CorreccionResponse
        resultado.value = parsed
        if (parsed.output) {
          correccion.value = parsed.output.replace(/\\n/g, '\n')
        }

        // 👉 Si la corrección fue correcta, descargamos el PDF
        if (parsed.success) {
          try {
            const pdfResponse = await axios.get('/api/certificaciones/1/pdf', {
              responseType: 'blob' // para manejarlo como archivo
            })

            const url = window.URL.createObjectURL(new Blob([pdfResponse.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'certificacion.pdf')
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
          } catch (error) {
            console.error('Error al descargar el PDF de certificación:', error)
          }
        }
      } else {
        // es un string plano
        resultado.value = {
          success: false,
          output: "",
          error: JSON.parse(data)
        }
      }
    } catch (error) {
      console.error("Error al parsear el resultado de corrección:", error)
    }
  } else {
    console.warn("No se encontró correccionResultado en sessionStorage")
  }
})
</script>

<style scoped>
.contenedor-correccion {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.texto-correccion {
  font-size: 1.2rem;
  margin: 1rem 0;
}
.estado {
  font-size: 1.1rem;
  font-weight: bold;
}
.correcto {
  color: green;
}
.incorrecto {
  color: red;
}
.volver {
  display: inline-block;
  margin-top: 2rem;
  color: #007bff;
  text-decoration: underline;
}
</style>
