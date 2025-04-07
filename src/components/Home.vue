<script lang="ts">
import PaymentForm from "./PaymentForm.vue";
import PaypalButton from "./PaypalButton.vue";

export default {
  components: {
    PaypalButton,
    PaymentForm
  },
  data() {
    return {
      prompt: "",
      resp: ""
    };
  },
  methods: {
    async comprarCurso() {
      // tu lógica aquí
    },
    async enviar() {
      console.log("Método enviar() activado con prompt:", this.prompt);

      const res = await fetch("http://localhost:8080/api/llama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: this.prompt })
      })
      console.log(res);
      
      const text = await res.text();
      this.resp = text;
    }
  }
}
</script>

<template>
  <div class="greetings">
    <h1>Plataforma de Generación de Aprendizaje Dinámico</h1>
    <h3>
      <div>
        <h1>Chat con Llama.cpp</h1>
        <textarea v-model="prompt" placeholder="Escribí algo..."></textarea>
        <button @click="enviar">Enviar</button>
        <p><strong>Respuesta:</strong> {{ resp }}</p>
      </div>
      
      <PaypalButton />
      <PaymentForm />
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

textarea {
  width: 100%;
  height: 80px;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
