<template>
  <div class="contenedor-correccion">
    <h2>Corrección del ejercicio</h2>

    <div v-if="resultado">
      <p class="estado" :class="{ correcto: resultado.success, incorrecto: !resultado.success }">
        {{ resultado.success ? '✔ ¡Respuesta correcta!' : '✘ Respuesta incorrecta' }}
      </p>
      <p v-if="resultado.error">
        <strong>Error:</strong> {{ resultado.error }}
      </p>
    </div>

    <RouterLink to="/" class="volver">Volver al inicio</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CorreccionResponse {
  success: boolean
  output: string
  error: string
}

const resultado = ref<CorreccionResponse | null>(null)

onMounted(() => {
  const data = sessionStorage.getItem('correccionResultado')
  if (data) {
    resultado.value = JSON.parse(data) as CorreccionResponse
    console.log("Resultado cargado: ", resultado.value)
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
