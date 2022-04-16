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
        Добро пожаловать
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
        v-model="username"
        type="text"
        placeholder="Username"
      />
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
      <input-text
        v-model="repeatPassword"
        type="password"
        placeholder="Repeat Password"
      />
      <button @click="signup">
        Зарегистрироваться
      </button>
      ИЛИ
      <router-link :to="{ name: 'SignIn' }">
        Вход
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
import useUser from '@/store/useUser'

const user = useUser()

const username = ref('')
const login = ref('')
const password = ref('')
const repeatPassword = ref('')

const signup = () => {
  user.signup({
    username: username.value,
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
