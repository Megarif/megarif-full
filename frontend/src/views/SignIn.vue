<template>
  <header>
    <nav>
      <button
        @click="ref"
        class="button-circle button-circle_back"
      />
    </nav>
  </header>
  <main>
    <form>
      <input-text v-model="email" />
      <input-text v-model="password" />
    </form>
  </main>
  <footer></footer>
</template>

<script
  setup
  lang="ts"
>
import InputText from '@/components/InputText.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<style
  lang="scss"
  scoped
>

</style>
