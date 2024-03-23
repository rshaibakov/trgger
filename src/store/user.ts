import { ref } from 'vue'
import { type User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { supabase } from '../db.ts'
import { NotFoundUserError } from '@/errors.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | undefined>(undefined)

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({ email })

    if (error) {
      throw error
    }
  }

  const verifyOtp = async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' })

    // TODO: Вынести обработку ошибка в отдельную функцию
    if (error) {
      throw error
    }

    if (!data.user) {
      throw new NotFoundUserError()
    }

    user.value = data.user
  }

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser()

    // TODO: Вынести обработку ошибка в отдельную функцию
    if (error) {
      throw error
    }

    if (!data.user) {
      throw new NotFoundUserError()
    }

    user.value = data.user

    return user.value
  }

  return {
    user,
    signIn,
    verifyOtp,
    fetchUser,
  }
})
