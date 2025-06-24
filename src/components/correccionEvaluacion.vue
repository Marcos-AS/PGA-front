<template>
  <div class="contenedor-correccion">
    <h2>Corrección de la evaluación final</h2>

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

      <!-- Mensaje de aprobación y botón para certificado -->
      <div v-if="resultado.success" class="certificado-box">
        <p class="texto-correccion">¡Felicitaciones! Has aprobado el curso.</p>
        <button class="btn-certificado" @click="descargarCertificado">
          Descargar Certificado en PDF
        </button>
      </div>
    </div>

    <RouterLink to="/" class="volver">Volver al inicio</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import jsPDF from 'jspdf'
import { useAuth0 } from '@auth0/auth0-vue'

interface CorreccionResponse {
  success: boolean
  output: string
  error: string
}

const resultado = ref<CorreccionResponse | null>(null)
const correccion = ref<string>('')

const { user } = useAuth0()

onMounted(() => {
  const data = sessionStorage.getItem('correccionResultado')
  if (data) {
    try {
      const parsed = JSON.parse(data) as CorreccionResponse

      if (parsed.output) {
        correccion.value = parsed.output.replace(/\\n/g, '\n')
      }

      resultado.value = parsed
    } catch (error) {
      console.error('Error al parsear el resultado de corrección:', error)
    }
  }
})

function descargarCertificado() {
  const nombreCurso = sessionStorage.getItem('currentCursoTitulo') || 'Curso Desconocido'
  const nombreAlumno = user.value?.name || 'Estudiante'
  const fecha = new Date().toLocaleDateString('es-AR')

  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Certificado de Finalización', 105, 30, { align: 'center' })

  doc.setFontSize(12)
  doc.text(`Otorgado a: ${nombreAlumno}`, 105, 50, { align: 'center' })
  doc.text(`Por haber completado satisfactoriamente el curso`, 105, 60, { align: 'center' })
  doc.text(`"${nombreCurso}"`, 105, 70, { align: 'center' })
  doc.text(`Fecha de emisión: ${fecha}`, 105, 90, { align: 'center' })

  doc.save(`certificado-${nombreCurso.replace(/\s/g, '_')}.pdf`)
}
</script>

<style scoped>
.contenedor-correccion {
  padding: 2rem;
  max-width: 600px;
  margin: auto;
  text-align: center;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.texto-correccion {
  font-size: 1.2rem;
  margin: 1.5rem 0;
  color: #1AA179;
  font-weight: 600;
}

.estado {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
}
.correcto {
  color: #1AA179;
}
.incorrecto {
  color: #b91c1c;
}

.volver {
  display: inline-block;
  margin-top: 2rem;
  color: #1AA179;
  font-weight: 600;
  text-decoration: none;
  border: 1px solid #1AA179;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
.volver:hover {
  background-color: #e6f4ea;
}

.certificado-box {
  margin-top: 2rem;
}

.btn-certificado {
  background-color: #21A899;
  color: white;
  padding: 0.6rem 1.2rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-certificado:hover {
  background-color: #168a7f;
}
</style>
