<template>
  <div class="payment-container">
    <h2 class="titulo">Seleccioná un método de pago</h2>

    <div class="payment-options">
      <button
        class="payment-button"
        :class="{ active: metodoSeleccionado === 'paypal' }"
        @click="metodoSeleccionado = 'paypal'"
      >
        <img src="/icons/paypal.png" alt="PayPal" />
      </button>

      <button
        class="payment-button"
        :class="{ active: metodoSeleccionado === 'mercadopago' }"
        @click="metodoSeleccionado = 'mercadopago'"
      >
        <img src="/icons/mercadopago.png" alt="Mercado Pago" />
      </button>
    </div>

    <div class="payment-method">
      <PaypalButton v-if="metodoSeleccionado === 'paypal'" @pagoExitoso="finalizarPago" />
      <PaymentForm v-if="metodoSeleccionado === 'mercadopago'" @pagoExitoso="finalizarPago" />
    </div>

    <div v-if="estadoPago" class="estado-pago">
      Estado del pago: <strong>{{ estadoPago }}</strong>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import PaypalButton from './PaypalButton.vue'
import PaymentForm from './PaymentForm.vue'

export default {
  components: {
    PaypalButton,
    PaymentForm,
  },
  setup() {
    const metodoSeleccionado = ref('')
    const estadoPago = ref('')
    const router = useRouter()

    const finalizarPago = () => {
      console.log("metodo seleccionado: " + metodoSeleccionado.value);
      
      estadoPago.value = 'Pago exitoso'
      setTimeout(() => {
        router.push('/confirmacion')
      }, 1500)
    }

    return {
      metodoSeleccionado,
      estadoPago,
      finalizarPago,
    }
  },
}
</script>

<style scoped>
.payment-container {
  padding: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.titulo {
  text-align: center;
  margin-bottom: 1rem;
}

.payment-options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.payment-button {
  padding: 1rem;
  border: 2px solid transparent;
  border-radius: 8px;
  background-color: #f1f1f1;
  cursor: pointer;
  width: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: border-color 0.3s ease;
}

.payment-button.active {
  border-color: #0070ba;
}

.payment-button img {
  max-width: 80px;
  margin-bottom: 0.5rem;
}

.payment-method {
  margin-top: 1rem;
}

.estado-pago {
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
}
</style>
