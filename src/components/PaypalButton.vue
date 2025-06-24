<template>
    <div>
      <div id="paypal-button-container"></div>
      <p id="result-message"></p>
    </div>
</template>

  <script lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';



  declare global {
    interface Window {
      paypal: any;
    }
  }

  declare global {
    interface Window {
      paypal: any;
    }
  }

  export default {
    mounted() {
      console.log('PaypalButton montado');
      this.loadPaypalScript();
    },

    updated() {
      if (document.getElementById("paypal-button-container")?.children.length === 0) {
        this.renderPaypalButton();
      }
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
        //script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&components=buttons&disable-funding=card`;
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
          funding: {
            allowed: [window.paypal.FUNDING.PAYPAL]
          },

          async createOrder() { //lo llama la sdk de paypal
            try {
              const token = await self.$auth0.getAccessTokenSilently({});
              self.token = token;
              //console.log(token);

              const response = await fetch("/api/paypal/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                  suscripcionId: 1,
                }),
              });

              const orderData = await response.json();
              console.log("order data: ", orderData);

              return orderData.id;

            } catch (error) {
              console.error("error en createOrder: ", error);
            }
          },

          async onApprove(data: { orderID: string }) {
            console.log("onApprove data: ", data);
            console.log("token: ", self.token);

            const response = await fetch(`/api/paypal/orders/${data.orderID}/capture`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${self.token}`
              },
            });

            const orderData = await response.json();
            const transaction = orderData?.purchase_units?.[0]?.payments?.captures?.[0];

            if (transaction?.status === 'COMPLETED') {
              self.$router.push('/confirmacion');
            } else {
              const messageElement = document.querySelector("#result-message");
              if (messageElement) {
                messageElement.innerHTML = `Transacción fallida: ${transaction.status || 'desconocido'}`;
              }
            }
            const messageElement = document.querySelector("#result-message");
            if(messageElement) {
              messageElement.innerHTML = `Transacción ${transaction.status}: ${transaction.id}`;
            };          },
        }).render("#paypal-button-container");


      },
    },
  };
  </script>
