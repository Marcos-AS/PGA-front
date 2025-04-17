<template>
    <div>
      <div id="paypal-button-container"></div>
      <p id="result-message"></p>
    </div>
</template>
  
  <script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

  export default {
    mounted() {
      this.loadPaypalScript();
    },

    data() {
      return {
        token: "",
      }
    },

    methods: {
      async loadPaypalScript() {
        if (document.getElementById("paypal-sdk")) return;
  
        const script = document.createElement("script");
        script.id = "paypal-sdk";
        const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID;
        // const language = navigator.language || 'en-US';
        // const baseLang = language.startsWith('es') ? 'es_XC' : language.replace('-', '_');
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.onload = this.renderPaypalButton;
        document.body.appendChild(script);
      },
      renderPaypalButton() {
        const self = this;

        window.paypal.Buttons({
          style: {
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          },

          async createOrder() {
            try {              
              const token = await self.$auth0.getAccessTokenSilently({
                audience: 'https://PGAD-SIP.unlu.com',
                scope: 'create:order capture:order'
              });
              console.log(token);
              self.token = token;

              const response = await fetch("/api/paypal/orders", {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  cart: [{ id: "PRODUCT_ID", quantity: 1 }],
                }),
              });

              const orderData = await response.json();
              return orderData.id;

            } catch (error) {
              console.error("error en createOrder: ", error); 
            }
          },

          async onApprove(data, actions) {
            const response = await fetch(`/api/paypal/orders/${data.orderID}/capture`, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${self.token}`
              },
            });
  
            const orderData = await response.json();
            const transaction = orderData?.purchase_units?.[0]?.payments?.captures?.[0];
            document.querySelector("#result-message").innerHTML = `Transacción ${transaction.status}: ${transaction.id}`;
          },
        }).render("#paypal-button-container");
      },
    },
  };
  </script>
  