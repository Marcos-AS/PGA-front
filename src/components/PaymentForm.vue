<template>
    <div>
      <div id="cardPaymentBrick_container"></div>
    </div>
  </template>
  
  <script lang="ts">

  declare global {
    interface Window {
      MercadoPago: any;
    }
  }

  export default {
    mounted() {
      this.$nextTick(() => {
        this.loadMercadoPagoBrick();
      });
    }
    ,
    methods: {
      loadMercadoPagoBrick() {
        if (!window.MercadoPago) {
          const script = document.createElement("script");
          script.src = "https://sdk.mercadopago.com/js/v2";
          script.async = true;
          script.onload = this.initializeBrick;
          document.body.appendChild(script);
        } else {
          this.initializeBrick();
        }
      },

      initializeBrick() {
        const publicKey = import.meta.env.VITE_MERCADO_PAGO_PUBLIC_KEY;
        const mp = new window.MercadoPago(publicKey, { locale: "es-AR" });
        const bricksBuilder = mp.bricks();
  
        const settings = {
          initialization: {
            amount: 100,
            payer: { email: "test@example.com" },
          },
          customization: {
            visual: { style: { theme: "default" } },
            paymentMethods: { maxInstallments: 1 },
          },
          callbacks: {
            onSubmit: async (cardFormData: any) => {
                const token = await this.$auth0.getAccessTokenSilently();
                console.log(token);
                
                return fetch("/api/v1/mercadopago/preference", {
                  method: "POST",
                  headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  },
                  body: JSON.stringify(cardFormData),
                })
                .then(async (response) => {
                  const text = await response.text();
                  console.log("text de la respuesta: ", text);
                  try {
                    return JSON.parse(text);
                  } catch (e) {
                    console.warn("no es JSON valido", e);
                    return text;
                  }                  
                })
                .then(url => {
                  console.log("url de redirección: ", url);
                  window.location.href = url;
                })
                .catch((error) => console.error("error en el pago: ", error));
            },
            onError: (error: any) => console.error("Brick error:", error),
            onReady: () => {
              console.log("Brick is ready");
            },
          },
        };
        bricksBuilder.create("cardPayment", "cardPaymentBrick_container", settings);
      },
    },
  };
  </script>
  