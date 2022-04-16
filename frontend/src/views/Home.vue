<template>
  <user-block />
  <header>
    <nav>
      <h1>
        Мәгариф
      </h1>
      <choose-lang />
    </nav>
  </header>
  <footer>
    <nav>

    </nav>
  </footer>
</template>

<script
  setup
  lang="ts"
>
import UserBlock from '@/components/UserBlock.vue'
import useUser from '@/store/useUser'
import ChooseLang from '@/components/ChooseLang.vue'

const user = useUser()
</script>

<style
  lang="scss"
  scoped
>

</style>
