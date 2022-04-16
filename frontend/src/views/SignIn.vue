<template>
  <header>
    <nav>
      <router-link
        class="button-circle button-circle_back"
        to="/"
      />
    </nav>
  </header>
  <main>
    <section class="title">
      <h2>
        {{ lang.local.welcome }}<!-- Добро пожаловать -->
      </h2>
      <p>
        Прежде чем начать учиться, <br>
        пожалуйста авторизуйтесь.
      </p>
    </section>
    <form
      class="form"
      @submit.prevent
    >
      <input-text
        v-model="login"
        type="email"
        placeholder="Email"
      />
      <input-text
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <a class="form__forgot">
        Забыли пароль?
      </a>
      <button @click="signin">
        Войти
      </button>
      ИЛИ
      <router-link :to="{ name: 'SignUp' }">
        Регистрация
      </router-link>
    </form>
  </main>
  <footer />
</template>

<script
  setup
  lang="ts"
>
import InputText from '@/components/InputText.vue'
import { ref } from 'vue'
import useLang from '@/store/useLang'
import useUser from '@/store/useUser'

const lang = useLang()
const user = useUser()

const login = ref('')
const password = ref('')

const signin = () => {
  user.signin({
    login: login.value,
    password: password.value
  })
}
</script>

<style
  lang="scss"
  scoped
>

header {
  padding: 24px 0;
}

.title {
  display:   flex;
  flex-flow: column;
  gap:       16px;
}

main {
  display:   flex;
  flex-flow: column;
  gap:       40px;
}

.form {
  display:   flex;
  flex-flow: column;
  gap:       24px;

  &__forgot {
    display:    flex;
    align-self: flex-end;
    width:      fit-content;
  }
}
</style>
