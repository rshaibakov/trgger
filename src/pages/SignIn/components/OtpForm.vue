<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

import { supabase } from '@/db'
import { usePending } from '@/composables/usePending'
import { useSignInStore } from '../useSignInStore'

const router = useRouter()
const { email, token } = useSignInStore()

const isInvalid = computed(() => !email.value || !token.value)

const handleSubmit = async () => {
  if (isInvalid.value) {
    return
  }

  const { data, error } = await supabase.auth.verifyOtp({
    email: email.value,
    token: token.value,
    type: 'email',
  })

  if (error) {
    // TODO: Обработать ошибку
    return
  }

  router.push({ name: 'journal' })
}

const {
  isPending: hasSubmitPending,
  functionWithPending: handleSubmitWithPending,
} = usePending<typeof handleSubmit>(handleSubmit)
</script>

<template>
  <form
    class="form"
    @submit.prevent="handleSubmitWithPending"
  >
    <input
      v-model="token"
      class="text-field"
      type="text"
      placeholder="Код подтверждения"
      autofocus
      required
    >

    <button
      class="submit"
      type="submit"
      :disabled="hasSubmitPending"
    >
      {{ hasSubmitPending ? 'Загрузка...' : 'Отправить код' }}
    </button>
  </form>
</template>

<style scoped>
.form {
  display: grid;
  grid-template: 'text-field submit' / 320px auto;
  gap: 1rem;
}

.text-field {
  grid-area: text-field;
}

.submit {
  grid-area: submit;
}

@media (width < 560px) {
  .form {
    grid-template:
      'text-field'
      'submit';
  }
}
</style>
