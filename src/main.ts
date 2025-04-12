import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createAuth0 } from '@auth0/auth0-vue'

createApp(App)
.use(createAuth0({
    domain: "dev-ymy386h280ssuqwp.us.auth0.com",
    clientId: "dGjxQySROmUIMaKrubMBdpAv6p0LdY6J",
    authorizationParams: {
        redirect_uri: window.location.origin,
        audience: "https://PGAD-SIP.unlu.com"
    }
}))
.use(router)
.mount('#app')
