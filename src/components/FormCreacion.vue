<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            curso: {
                titulo: "",
                descripcion: "",
                duracion: "",
                nivel: ""
            },
            token: ""
        };
    },

    methods: {
        async enviarForm() {
            try {
                const token = await this.$auth0.getAccessTokenSilently({
                    audience: 'https://PGAD-SIP.unlu.com',
                    scope: 'create:course'
                })
                const response = await axios.post('/api/cursos', this.curso,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data);
                
            } catch (error) {
                console.error("error al crear: ", error);
                
            }
        }
    }
}


</script>

<template>
    <form @submit.prevent="enviarForm">

        <label for="tema">Selecciona el lenguaje sobre el que te gustaría aprender: </label>
        <select v-model="curso.titulo" name="tema" id="tema">
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="php">PHP</option>
        </select>
        
        <label for="descripcion">(opcional) Haz una descripción sobre qué quieres que incluya el curso</label>
        <textarea name="descripcion" id="descripcion" v-model="curso.descripcion"></textarea>

        <label for="duracion">Selecciona la duración del curso: </label>
        <select name="duracion" id="duracion" v-model="curso.duracion">
            <option value="1 semana">1 semana</option>
            <option value="2 semanas">2 semanas</option>
            <option value="1 mes">1 mes</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
        </select>

        <label for="nivel">Selecciona el nivel del curso: </label>
        <select name="nivel" id="nivel" v-model="curso.nivel">
            <option value="basico">Básico</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
        </select>
        <input type="submit" value="Enviar" />
    </form>
</template>