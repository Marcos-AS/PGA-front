import { createRouter, createWebHistory } from 'vue-router'
import PerfilComponent from '@/components/PerfilComponent.vue'
import Suscripcion from '@/components/Suscripcion.vue'
import HomePage from '@/components/HomePage.vue'
import Cursos from '../components/Cursos.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilComponent,
  },
  {
    path: '/suscripciones',
    name: 'suscripciones',
    component: Suscripcion,
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: Cursos,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
