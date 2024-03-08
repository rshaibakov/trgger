<script lang="ts" setup>
import EmailForm from './components/EmailForm.vue'
import OtpForm from './components/OtpForm.vue'
import { useSignInStore } from './useSignInStore'

const { wasEmailSubmitted } = useSignInStore()
</script>

<template>
  <section class="sign-in">
    <h1 class="title">
      Вход
    </h1>

    <OtpForm
      v-if="wasEmailSubmitted"
      class="form"
    />

    <EmailForm
      v-else
      class="form"
    />
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
}
</style>
