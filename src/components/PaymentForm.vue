<template>
    <div class="wrapper">
      <button @click="iniciarPago" :disabled="loading" class="mercado-button">
        <span v-if="loading">Procesando pago...</span>
        <span v-else>Pagar con MercadoPago</span>
      </button>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuth0 } from '@auth0/auth0-vue'
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const planId = route.query.planId as string

  const loading = ref(false)
  const { getAccessTokenSilently } = useAuth0()


  async function iniciarPago() {
      try {
        loading.value = true;
        const token = await getAccessTokenSilently();
        const precio = await fetchPrecio(planId);
        const response = await fetch("/api/v1/mercadopago/preference", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
              transaction_amount: precio,
              planId: planId
            }),
          });
        const result = await response.json();
        if (result.init_point) {
          window.location.href = result.init_point;
        } else {
          alert("no se pudo iniciar el pago")
        }
      } catch (error) {
        console.error("error al inicial el pago: ", error);
      } finally {
        loading.value = false;
      }
    }

      async function fetchPrecio(planId: string): Promise<number> {
          try {
            const response = await fetch(`/api/tipos-suscripcion/${planId}`);
            if (!response.ok) throw new Error("Error al obtener el precio del plan");
            const suscripcion = await response.json();
            return suscripcion.precio;
          } catch (error) {
            console.error(error);
            return 0;
          }
      }
  </script>
  
<style scoped>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .mercado-button {
  background-color: #009EE3;
  color: white;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s ease-in-out;
}

.mercado-button:hover {
  background-color: #007DC2;
}

.mercado-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>