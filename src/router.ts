import { createRouter, createWebHistory } from 'vue-router'

import Journal from './pages/Journal/Journal.vue'
import SignIn from './pages/SignIn/SignIn.vue'

export const routes = [
  {
    path: '/',
    name: 'journal',
    component: Journal,
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
