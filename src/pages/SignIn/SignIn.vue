<script lang="ts" setup>
</script>

<template>
  <section class="sign-in">
    <h1 class="title">
      Вход
    </h1>

    <form class="form">
      <input
        class="email-field"
        type="email"
        placeholder="Твой email"
        required
      >

      <button
        class="submit"
        type="submit"
      >
        Получить ссылку
      </button>
    </form>
  </section>
</template>

<style scoped>
.sign-in {
  height: 100%;
  display: grid;
  grid-template:
    '. . .' minmax(1rem, 1fr)
    '. title .' min-content
    '. form .' auto
    '. . .' minmax(1rem, 1fr)
    / minmax(1rem, 1fr) minmax(320px, auto) minmax(1rem, 1fr);
}

.title {
  grid-area: title;
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
