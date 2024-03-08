import { ref } from 'vue'

const email = ref('')
const token = ref('')
const wasEmailSubmitted = ref(false)

export const useSignInStore = () => {
  return {
    email,
    token,
    wasEmailSubmitted,
  }
}
