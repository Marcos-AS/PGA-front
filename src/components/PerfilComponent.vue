<template>
  <div>
    <h1>Bienvenido</h1>

    <div v-if="isLoading">Cargando...</div>

    <div v-else-if="isAuthenticated">
      <h2>Perfil del usuario</h2>
      <div>
        <button @click="logout" class="btn-logout">Cerrar sesión</button>
      </div>

      <main class="perfil-container">
        <h2 class="perfil-usuario">
          <small>({{ user?.name || 'Invitado' }})</small>
        </h2>

        <div class="perfil-grid">
          <!-- Datos personales -->
          <div class="perfil-card">
            <h3>Datos Personales</h3>
            <ul>
              <!-- NOMBRE -->
              <li>
                Nombre:
                <template v-if="editingField === 'nickname'">
                  <input v-model="editableValues.nickname" />
                  <button @click="saveField('nickname')">💾</button>
                </template>
                <template v-else>
                  {{ user.nickname }}
                  <button title="Editar" @click="startEditing('nickname')">
                    <span class="icon">✎</span>
                  </button>
                </template>
              </li>

              <!-- CORREO -->
              <li>
                Correo:
                <template v-if="editingField === 'email'">
                  <input v-model="editableValues.email" />
                  <button @click="saveField('email')">💾</button>
                </template>
                <template v-else>
                  {{ user.email }}
                  <button title="Editar" @click="startEditing('email')">
                    <span class="icon">✎</span>
                  </button>
                </template>
              </li>

              <!-- CONTRASEÑA -->
              <li>
                Contraseña:
                <template v-if="editingField === 'password'">
                  <input type="password" v-model="editableValues.password" />
                  <button @click="saveField('password')">💾</button>
                </template>
                <template v-else>
                  ********
                  <button title="Editar" @click="startEditing('password')">
                    <span class="icon">✎</span>
                  </button>
                </template>
              </li>
            </ul>
          </div>

          <!-- Mi progreso -->
          <div class="perfil-card">
            <h3>Mi progreso</h3>

            <div v-if="progresos.length === 0">
              <p>No hay registros de progreso aún.</p>
            </div>

            <ul v-else class="lista-progresos">
  <li
    v-for="pro in visibleProgresos"
    :key="pro.id"
    class="item-progreso"
  >
    <div class="info-curso">
      <strong>{{ pro.curso.nombre }}</strong> <br>
      <span class="fecha">
        {{ formatDate(pro.fechaActualizacion) }}
      </span>
    </div>
    <div class="avance-progreso">
      <span>{{ pro.porcentajeCompletado }}%</span>
    </div>
  </li>
</ul>

          </div>

          <!-- Configuración -->
          <div class="perfil-card">
            <h3>Configuración</h3>
            <ul>
              <li>Suscripción</li>
              <li>Notificaciones</li>
            </ul>
          </div>

          <!-- Certificados -->
          <div class="perfil-card">
            <h3>Certificados</h3>
            <ul>
              <li>Certificado 1</li>
              <li>Certificado 2</li>
            </ul>
          </div>
        </div>
      </main>
    </div>

    <div v-else>
      <p>No estás autenticado.</p>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  data() {
    return {
      user: this.$auth0.user.value as AuthUser,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      editingField: '',
      editableValues: {
        nickname: this.$auth0.user.value?.nickname || '',
        email: this.$auth0.user.value?.email || '',
        password: '',
      } as { [key: string]: any },
      progresos: [] as Array<{
        id: number;
        curso: { id: number; nombre: string };
        porcentajeCompletado: number;
        fechaActualizacion: string;
      }>,
      editingProgresoId: null as number | null,
      editableProgresoValue: 0 as number,
    };
  },
  mounted() {
    this.$watch(
      () => this.isAuthenticated && this.user?.sub,
      (val) => {
        if (val) {
          this.fetchProgresos();
        }
      },
      { immediate: true }
    );
  },
  computed: {
  visibleProgresos() {
    return this.progresos.filter(p => p.porcentajeCompletado > 0);
  }
},
  methods: {
    formatDate(dateStr: string) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  },
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    },
    startEditing(field: string) {
      this.editingField = field;
    },
    saveField(field: string) {
      // Lo edita local, agregar lógica real con API
      (this.user as any)[field] = this.editableValues[field]
      this.editingField = ''
    },

    // ────────────── MÉTODOS PARA PROGRESO ──────────────

    async fetchProgresos() {
      try {
        // Suponemos que 'sub' coincide con idUsuario en backend
        const userIdBackend = (this.user as any).sub
        const response = await axios.get('/api/progresos', {
          params: { idUsuario: userIdBackend },
        })
        this.progresos = response.data.map((p: any) => ({
          id: p.id,
          curso: {
            id: p.curso.id,
            nombre: p.curso.nombre || p.curso.titulo || 'Sin título',
          },
          porcentajeCompletado: p.porcentajeCompletado,
          fechaActualizacion: p.fechaActualizacion,
        }))
      } catch (error) {
        console.error('Error al cargar progresos:', error)
      }
    },

    startEditingProgreso(progreso: {
      id: number
      porcentajeCompletado: number
    }) {
      this.editingProgresoId = progreso.id
      this.editableProgresoValue = progreso.porcentajeCompletado
    },

    async saveProgreso(progresoId: number) {
      try {
        // Buscamos el curso asociado
        const prog = this.progresos.find((p) => p.id === progresoId)!
        const dto = {
          id: progresoId,
          curso: { id: prog.curso.id },
          Usuario: { id: (this.user as any).sub },
          porcentajeCompletado: this.editableProgresoValue,
          // omitimos fechaActualizacion para que el backend la ponga automáticamente
        }
        const response = await axios.put(`/api/progresos/${progresoId}`, dto)
        // Actualizamos locally
        const idx = this.progresos.findIndex((p) => p.id === progresoId)
        if (idx !== -1) {
          this.progresos[idx].porcentajeCompletado =
            response.data.porcentajeCompletado
          this.progresos[idx].fechaActualizacion =
            response.data.fechaActualizacion
        }
        this.editingProgresoId = null
        this.editableProgresoValue = 0
      } catch (error) {
        console.error('Error al guardar progreso:', error)
      }
    },

    cancelEditProgreso() {
      this.editingProgresoId = null
      this.editableProgresoValue = 0
    },
  },
}
</script>

