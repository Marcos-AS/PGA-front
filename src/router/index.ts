import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import PaypalButton from '@/components/PaypalButton.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
