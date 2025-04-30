<script lang="ts">
  import axios from 'axios';

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
        async getSuscripciones() {
            const respuesta = await axios.get('/api/suscripciones');
            this.suscripciones = respuesta.data;
        }
    }
    
  }
</script>

<template>
    <div>
        <h1>Suscripciones</h1>
        <ul>
            <li v-for="suscripcion in suscripciones" :key="suscripcion.id">
                Suscripcion {{ suscripcion.tipo_suscripcion }},
                Precio: {{ suscripcion.precio }}
            </li>
        </ul>

    </div>
</template>