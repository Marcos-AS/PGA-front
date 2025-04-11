import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PerfilComponent from '@/components/PerfilComponent.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilComponent
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
