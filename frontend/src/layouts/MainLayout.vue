<template>
  <main>
    <router-view />
  </main>
  <footer class="footer">
    <router-link
      v-for="route of routes"
      :key="route"
      :to="route.link"
      class="footer__route"
      :class="{ 'footer__route_active': $route.path === route.link }"
    >
      <div class="footer__route-background"></div>
      <img :src="route.icon" />
    </router-link>
  </footer>
</template>

<script
  setup
  lang="ts"
>
// import ChooseLang from '@/components/ChooseLang.vue'
import homeIcon from '~@/home.svg'
import lessonsIcon from '~@/lessons.svg'
import bookmarksIcon from '~@/bookmarks.svg'
import marketIcon from '~@/market.svg'
import eventsIcon from '~@/events.svg'
const routes = [
  {
    name: 'home',
    link: '/',
    icon: homeIcon
  },
  {
    name: 'lessons',
    link: '/lessons',
    icon: lessonsIcon
  },
  {
    name: 'events',
    link: '/events',
    icon: bookmarksIcon
  },
  {
    name: 'market',
    link: '/market',
    icon: marketIcon
  },
  {
    name: 'bookmarks',
    link: '/bookmarks',
    icon: eventsIcon
  }
]
</script>

<style
  lang="scss"
  scoped
>
h1 {
  font-weight: 600;
  font-size: 35px;
  line-height: 48px;
  color: #2C9723;
}
.footer {
  position: fixed;
  display: flex;
  padding: 16px 25px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  justify-content: space-between;
  background-color: white;
  border-radius: 16px 16px 0 0;

  &__route {
    display: flex;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: relative;

    .footer__route-background {
      position: absolute;
      width: 48px;
      height: 48px;
      z-index: -1;
      clip-path: ellipse(0 0 at 50% 75%);
      background-color: #F97083;
      border-radius: 50%;
      transition: 0.3s ease-in-out;
      filter: brightness(1);
    }

    &_active {
      img {
        filter: brightness(4);
        transition: 0.3s ease-in-out;
      }

      .footer__route-background {
        clip-path: ellipse(48px 48px at 50% 50%);
      }
    }
  }
}

main {
  display: flex;
  flex-flow: column;
  gap: 24px;
  padding-bottom: 80px;
}
</style>
