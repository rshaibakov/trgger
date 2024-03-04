<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '../../db'

const email = ref('')
const wasEmailSent = ref(false)
const isPending = ref(false)

const handleEmailSubmit = async () => {
  if (!email.value) {
    return
  }

  if (isPending.value) {
    return
  }

  isPending.value = true

  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
  })

  isPending.value = false

  if (error) {
    // TODO: Обработать ошибку
    return
  }

  wasEmailSent.value = true
}

const token = ref('')
const handleOtpSubmit = async () => {
  if (!email.value || !token.value) {
    return
  }

  if (isPending.value) {
    return
  }

  isPending.value = true

  const { data, error } = await supabase.auth.verifyOtp({
    email: email.value,
    token: token.value,
    type: 'email',
  })

  isPending.value = false
  console.log(data, error)
  if (error) {
    // TODO: Обработать ошибку
  }
}
</script>

<template>
  <section class="sign-in">
    <h1 class="title">
      Вход
    </h1>

    <form
      v-if="wasEmailSent"
      class="form"
      @submit.prevent="handleOtpSubmit"
    >
      <input
        v-model="token"
        class="text-field"
        type="text"
        placeholder="Код подтверждения"
        required
      >

      <button
        class="submit"
        type="submit"
      >
        {{ isPending ? 'Загрузка...' : 'Отправить код' }}
      </button>
    </form>

    <form
      v-else
      class="form"
      @submit.prevent="handleEmailSubmit"
    >
      <input
        v-model="email"
        class="text-field"
        type="email"
        placeholder="Твой email"
        required
      >

      <button
        class="submit"
        type="submit"
      >
        {{ isPending ? 'Загрузка...' : 'Получить ссылку' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.sign-in {
  height: 100%;
  display: grid;
  grid-template:
    '. title .' minmax(min-content, 1fr)
    '. form .' auto
    '. . .' minmax(1rem, 1fr)
    / minmax(1rem, 1fr) minmax(320px, auto) minmax(1rem, 1fr);
}

.title {
  grid-area: title;
  align-self: end;
  color: hsl(200deg 48% 80%);
}

.form {
  grid-area: form;
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
