<script lang="ts" setup>
import { computed } from 'vue'

import { useUserStore } from '@/store/user'
import { usePending } from '@/composables/usePending'
import { useSignInStore } from '../useSignInStore'

const { email, wasEmailSubmitted } = useSignInStore()
const { signIn } = useUserStore()

const isInvalid = computed(() => !email.value)

const handleSubmit = async () => {
  if (isInvalid.value) {
    return
  }

  await signIn(email.value)

  wasEmailSubmitted.value = true
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
      v-model="email"
      class="text-field"
      type="email"
      placeholder="Твой email"
      autofocus
      required
    >

    <button
      class="submit"
      type="submit"
      :disabled="hasSubmitPending"
    >
      {{ hasSubmitPending ? 'Загрузка...' : 'Получить ссылку' }}
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
