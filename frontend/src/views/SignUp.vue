<template>
  <header>
    <nav>
      <router-link
        class="button-circle button-circle_back"
        :to="{ name: 'Home' }"
      />
      <choose-lang />
    </nav>
  </header>
  <main>
    <section class="title">
      <h2>
        {{ lang.local.welcome }}
      </h2>
      <p>
        {{ lang.local.before_learn }}
      </p>
    </section>
    <form
      class="form"
      @submit.prevent
    >
      <input-text
        v-model="username"
        type="text"
        autocomplete="nickname"
        :placeholder="lang.local.username"
      />
      <input-text
        v-model="login"
        type="email"
        autocomplete="email"
        :placeholder="lang.local.email"
      />
      <input-text
        v-model="password"
        type="password"
        autocomplete="current-password"
        :placeholder="lang.local.password"
      />
      <button @click="signup">
        Зарегистрироваться
      </button>
      <span class="form__separator">
        ИЛИ
      </span>
      <router-link
        class="button"
        :to="{ name: 'SignIn' }"
      >
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
import useLang from '@/store/useLang'
import ChooseLang from '@/components/ChooseLang.vue'
import { useRouter } from 'vue-router'

const user = useUser()
const lang = useLang()
const router = useRouter()

const username = ref('')
const login = ref('')
const password = ref('')

const signup = () => {
  user.signup({
    username: username.value,
    login: login.value,
    password: password.value
  }).then(() => {
    router.push({ name: 'Home' })
  })
}
</script>

<style
  lang="scss"
  scoped
>

header {

  nav {
    display: flex;
    justify-content: space-between;
  }
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

  &__separator {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    text-align: center;

    &:before {
      top: 50%;
      border-radius: 50%;
      position: absolute;
      content: ' ';
      width: 100%;
      height: 1px;
      background-color: gray;
      clip-path: polygon(0 0, 35% 0, 35% 1px, 65% 1px, 65% 0, 100% 0, 100% 1px, 0 1px);
    }
  }
}
</style>
