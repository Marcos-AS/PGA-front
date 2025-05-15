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

      <p><strong>Temario:</strong></p>
      <ul>
        <li v-for="(item, index) in temarioItems" :key="index">{{ item }}</li>
      </ul>

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

const route = useRoute()
const curso = ref<any | null>(null)

// Obtener curso desde API
onMounted(async () => {
  const id = route.params.id || route.query.id
  try {
    const response = await fetch(`/api/cursos/${id}`)
    curso.value = await response.json()
  } catch (error) {
    console.error('Error cargando curso:', error)
  }
})

// Separar temario por líneas
const temarioItems = computed(() => {
  return curso.value?.temario?.split('\n').map((item: string) => item.trim()) || []
})
</script>

