<script lang="ts">
import axios from 'axios';

export default {
    data() {
        return {
            curso: {
                titulo: "",
                descripcion: "",
                duracion: "",
                nivel: "",
                categorias: [] as string[]
            },
            token: "",
            mensajeConfirmacion: "",
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
                console.log("Curso creado", response.data);

                const cursoId = response.data.id;

                this.mensajeConfirmacion = "¡Curso creado con éxito!";

                setTimeout(() => {
                    this.$router.push({ name: 'detalleCurso', params: { id: cursoId } });
                }, 1500);

            } catch (error) {
                console.error("error al crear: ", error);

                this.mensajeConfirmacion = "Error al crear el curso, intenta nuevamente.";
            }
        }
    }
}


</script>

<template>
    <form @submit.prevent="enviarForm" class="formulario-curso">
        <h2>Contanos sobre que te gustaría aprender</h2>

        <label for="categorias">Selecciona la(s) categoría(s):</label>
        <select id="categorias" v-model="curso.categorias" multiple>
            <option value="1">Python</option>
            <!-- En el futuro: más categorías con sus IDs reales -->
        </select>

        <label for="descripcion">(opcional) Haz una descripción sobre qué quieres que incluya el curso</label>
        <textarea name="descripcion" id="descripcion" v-model="curso.descripcion"></textarea>

        <label for="duracion">Selecciona la duración del curso: </label>
        <select name="duracion" id="duracion" v-model="curso.duracion">
            <option value="1 semana">1 semana</option>
            <option value="2 semanas">2 semanas</option>
            <option value="4 semanas">4 semanas</option>
            <option value="1 mes">1 mes</option>
            <option value="3 meses">3 meses</option>
            <option value="6 meses">6 meses</option>
        </select>

        <label for="nivel">Selecciona el nivel del curso: </label>
        <select name="nivel" id="nivel" v-model="curso.nivel">
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
        </select>
        <input type="submit" value="Crear curso" />

        <p v-if="mensajeConfirmacion" class="mensaje-confirmacion">{{ mensajeConfirmacion }}</p>
    </form>
</template>

<style scoped>
.formulario-curso {
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    font-family: sans-serif;
    background-color: #f9f9f9;
    border-radius: 10px;
}

.formulario-curso h2 {
    text-align: center;
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-top: 1rem;
    font-weight: bold;
}

input[type="text"],
textarea,
select {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.categorias-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.categorias-grid button {
    padding: 0.5rem;
    border: 1px solid #1AA179;
    background-color: white;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.categorias-grid button.activo {
    background-color: #1AA179;
    color: white;
}

input[type="submit"] {
    margin-top: 1.5rem;
    padding: 0.7rem;
    background-color: #1AA179;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    width: 100%;
    font-size: 1rem;
}

.mensaje-confirmacion {
    margin-top: 1rem;
    color: red;
    font-weight: bold;
    text-align: center;
}
</style>
