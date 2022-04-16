<template>
  <header>
    <nav>
      <h1>
        Мәгариф
      </h1>
      <choose-lang />
    </nav>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <nav>
      <router-link
        v-for="route of routes"
        :key="route"
      />
    </nav>
  </footer>
</template>

<script
  setup
  lang="ts"
>
import ChooseLang from '@/components/ChooseLang.vue'
const routes = [
  {
    name: 'home',
    link: '/',
    icon: ''
  },
  {
    name: 'lessons',
    link: '/lessons',
    icon: ''
  },
  {
    name: 'events',
    link: '/events',
    icon: ''
  },
  {
    name: 'market',
    link: '/market',
    icon: ''
  },
  {
    name: 'bookmarks',
    link: '/bookmarks',
    icon: ''
  }
]
</script>

<style
  lang="scss"
  scoped
>

</style>
