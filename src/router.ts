import { createRouter, createWebHistory } from 'vue-router'

import Journal from './pages/Journal/Journal.vue'
import Login from './pages/Login/Login.vue'

export const routes = [
  {
    path: '/',
    name: 'journal',
    component: Journal,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
