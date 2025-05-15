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
            <ul>
              <li>Nivel</li>
              <li>Progreso</li>
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
export default {
  data() {
    return {
      user: this.$auth0.user,
      isAuthenticated: this.$auth0.isAuthenticated,
      isLoading: this.$auth0.isLoading,
      editingField: '',
      editableValues: {
        nickname: this.$auth0.user?.nickname || '',
        email: this.$auth0.user?.email || '',
        password: '',
      },
    };
  },
  methods: {
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
      this.user[field] = this.editableValues[field];
      this.editingField = '';
    },
  },
};
</script>

