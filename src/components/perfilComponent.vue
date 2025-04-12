<template>
    <h1>Bienvenido</h1>

    <div v-if="isLoading">Loading ...</div>
    <div v-else>
        <h2>Perfil del usuario</h2>
        <pre v-if="isAuthenticated">
            <code>{{ user }}</code>
            <div>
                <button @click="logout">Log out</button>
            </div>
        </pre>
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