<script lang="ts">
  // import axios from 'axios';

  export default {

    mounted() {
        this.getSuscripciones();
    },

    data() {
        return {
            suscripciones: [],

        }
    },

    methods: {
        /*async getSuscripciones() {
            const respuesta = await axios.get('/api/tiposSuscripcion');
            console.log(respuesta.data);
            this.suscripciones = respuesta.data;
        },*/

        getSuscripciones() {
            // Simulando respuesta de backend
            this.suscripciones = [
              {
                id: 1,
                tipoSuscripcion: "Plan Premium",
                precio: 2500,
              },
              // Podés agregar más si los necesitás
            ];
        },

        confirmarSuscripcion(suscripcion) {
          this.$router.push({ name: 'pago', query: { planId: suscripcion.id } });
        }
    },
  }

</script>

<template>
  <div class="suscripciones-container">
    <h2>Beneficios del Plan Premium</h2>
    <ul class="beneficios">
      <li>✔ Acceso a todos los cursos</li>
      <li>✔ Corrección automática de ejercicios</li>
      <li>✔ Certificación oficial</li>
    </ul>

    <h3>Elegí una suscripción:</h3>
    <div class="planes">
      <div
        v-for="suscripcion in suscripciones"
        :key="suscripcion.id"
        class="card"
      >
        <h4>{{ suscripcion.tipoSuscripcion }}</h4>
        <p>Precio: ${{ suscripcion.precio }}</p>
        <button @click="confirmarSuscripcion(suscripcion)">Suscribirme</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.suscripciones-container {
  max-width: 800px;
  margin: auto;
  padding: 1.5rem;
}

.beneficios {
  list-style: none;
  padding-left: 0;
}

.beneficios li {
  margin-bottom: 0.5rem;
}

.planes {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around;
  margin-top: 1rem;
}

.card {
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
  width: 240px;
  text-align: center;
}

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
