import {
  createRouter,
  createWebHistory,
} from 'vue-router'

import Journal from './pages/Journal/Journal.vue'
import SignIn from './pages/SignIn/SignIn.vue'
import { allowForGuest, allowForSignedInUser } from './router.guards'

export const routes = [
  {
    path: '/',
    name: 'Journal',
    component: Journal,
    beforeEnter: [allowForSignedInUser],
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    beforeEnter: [allowForGuest],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
