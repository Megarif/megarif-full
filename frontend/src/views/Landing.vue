<template>
  <h1>
    Мәгариф
  </h1>
  <router-link
    class="button"
    :to="{ name: 'SignIn' }"
  >
    Вход
  </router-link>
  <span class="form__separator">
    ИЛИ
  </span>
  <router-link
    class="button"
    :to="{ name: 'SignUp' }"
  >
    Регистрация
  </router-link>
</template>

<script
  setup
  lang="ts"
>

</script>

<style
  lang="scss"
  scoped
>

</style>
