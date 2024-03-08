import { type Session, type User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../db.ts'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const session = ref<Session | null>(null)

  const signIn = async (email: string) => {
    return await supabase.auth.signInWithOtp({ email })
  }

  const verifyOtp = async (email: string, token: string) => {
    return await supabase.auth.verifyOtp({ email, token, type: 'email' })
  }

  return {
    user,
    session,
    signIn,
    verifyOtp,
  }
})
