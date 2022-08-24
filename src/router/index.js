import Vue from 'vue'
import VueRouter from 'vue-router'
import DoctorsPage from '../views/DoctorsPage.vue'
import PatientPage from '../views/PatientPage.vue'
import NotFoundPage from '../views/error/NotfoundPage.vue'
import Dashboard from '../views/Dashboard.vue'
import VisitPage from '../views/VisitPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/doctors',
    name: 'doctor',
    component: DoctorsPage
  },
  {
    path: '/patients',
    name: 'patient',
    component: PatientPage
  },
  {
    path: '/visits',
    name: 'visit',
    component: VisitPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundPage
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
