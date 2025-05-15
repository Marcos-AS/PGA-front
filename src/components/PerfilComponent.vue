<template>
  <div>
    <h1>Bienvenido</h1>

    <div v-if="isLoading">Cargando...</div>

    <div v-else-if="isAuthenticated">
      <h2>Perfil del usuario</h2>

      <!-- Json información usuario -->
      <!-- <pre><code>{{ user }}</code></pre> -->
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
              <li>
                Nombre: {{ user.nickname }}
                <button title="Editar">
                  <span class="icon">✎</span>
                </button>
              </li>
              <li>
                Correo: {{ user.email }}
                <button title="Editar">
                  <span class="icon">✎</span>
                </button>
              </li>
              <li>
                Contraseña
                <button title="Editar">
                  <span class="icon">✎</span>
                </button>
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
    };
  },
  methods: {
    logout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin
        }
      });
    }
  }
};
</script>

