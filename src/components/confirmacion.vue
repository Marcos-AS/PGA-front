<template>
  <div class="confirmacion-container">
    <h2>¡Gracias por tu suscripción!</h2>
    <p>Has activado exitosamente el plan premium.<br> Disfrutá todos los beneficios.</p>
    <button @click="listaCursos" class="btn-ir-lista">Ir a Cursos</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    function listaCursos() {
      router.push('/cursos')
    }
    return { listaCursos }
  }
})
</script>

<style scoped>
.btn-ir-lista {
  background-color: #047857;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.btn-ir-lista:hover {
  background-color:  #047857;
}
</style>
