import {
  NavigationGuard,
} from 'vue-router'
import { useUserStore } from './store/user'

export const allowForGuest: NavigationGuard = async (to, from, next) => {
  try {
    const { fetchUser } = useUserStore()
    const user = await fetchUser()

    if (user) {
      next({ name: 'Journal' })
    }

    next()
  }
  catch (error) {
    // TODO: Доработать обработку ошибок
    next()
  }
}

export const allowForSignedInUser: NavigationGuard = async (to, from, next) => {
  try {
    const { fetchUser } = useUserStore()
    const user = await fetchUser()

    if (!user) {
      next({ name: 'SignIn' })
    }

    next()
  }
  catch (error) {
    // TODO: Доработать обработку ошибок
    next({ name: 'SignIn' })
  }
}
