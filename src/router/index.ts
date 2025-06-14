import { createRouter, createWebHistory } from 'vue-router'
import PerfilComponent from '@/components/PerfilComponent.vue'
import TipoSuscripcion from '@/components/TipoSuscripcion.vue'
import HomePage from '@/components/HomePage.vue'
import listaCursos from '@/components/listaCursos.vue'
import FormCreacion from '@/components/FormCreacion.vue'
import detalleCurso from '@/components/detalleCurso.vue'
import detalleModulo from '@/components/detalleModulo.vue'
import EjerciciosView from '@/components/EjerciciosView.vue'
import opcionesPago from '@/components/opcionesPago.vue'
import confirmacion from '@/components/confirmacion.vue'
import detalleEjercicio from '@/components/detalleEjercicio.vue'
import CorreccionEjercicio from '@/components/correccionEjercicio.vue'
import DetalleEvaluacion from '@/components/DetalleEvaluacion.vue'




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
    component: TipoSuscripcion,
  },
  {
    path: '/cursos',
    name: 'Cursos',
    component: listaCursos,
  },
  {
    path: '/cursos/:id/:titulo',
    name: 'detalleCurso',
    component: detalleCurso,
  },
  {
    path: '/modulo/:id',
    name: 'detalleModulo',
    component: detalleModulo,
  },
  {
    path: '/ejercicio/:id',
    name: 'detalleEjercicio',
    component: detalleEjercicio,
  },
  {
    path: '/correccion/:id',
    name: 'Correccion',
    component: CorreccionEjercicio,
  },
  {
    path: '/modulo/:id/ejercicios',
    name: 'EjerciciosModulo',
    component: EjerciciosView,
  },

  {
    path: '/formulario-creacion',
    component: FormCreacion,
  },
  {
    path: '/pago',
    name: 'pago',
    component: opcionesPago,
  },
  {
    path: '/confirmacion',
    name: 'confirmacion',
    component: confirmacion,
  },
  {
  path: '/evaluacion/:id',
  name: 'DetalleEvaluacion',
  component: DetalleEvaluacion,
  props: true
 },
 {
  path: '/correccion/evaluacion/:id',
  name: 'correccion',
  component: CorreccionEjercicio,}


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
