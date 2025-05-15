import { createRouter, createWebHistory } from 'vue-router'
import PerfilComponent from '@/components/PerfilComponent.vue'
import Suscripcion from '@/components/Suscripcion.vue'
import HomePage from '@/components/HomePage.vue'
import Cursos from '../components/Cursos.vue'
import FormCreacion from '../components/FormCreacion.vue'



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
  {
    path: '/formulario-creacion',
    component: FormCreacion,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
