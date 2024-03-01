<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '../../db'

const email = ref('')
const isPending = ref(false)

const handleSubmit = async () => {
  if (!email.value) {
    return
  }

  if (!isPending.value) {
    isPending.value = true

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email.value,
    })

    isPending.value = false
    console.log(data, error)
  }
}
</script>

<template>
  <section class="sign-in">
    <h1 class="title">
      Вход
    </h1>

    <form
      class="form"
      @submit.prevent="handleSubmit"
    >
      <input
        v-model="email"
        class="email-field"
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
  grid-template: 'email-field submit' / 320px auto;
  gap: 1rem;
}

.email-field {
  grid-area: email-field;
}

.submit {
  grid-area: submit;
}

@media (width < 560px) {
  .form {
    grid-template:
      'email-field'
      'submit';
  }
}

</style>
