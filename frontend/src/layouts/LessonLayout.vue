<template>
  <header v-if="lesson.current">
    <button
      class="button-back"
      @click="$router.push('/')"
    >
      <img
        src="@/assets/arrow.svg"
        alt="back"
      >
      <span>
        Назад
      </span>
    </button>
    <div class="health-container">
      <img :src="user.getHearths < 2 ? (user.getHearths < 1 ? eh : hh) : h" alt="hearth">
      <img :src="user.getHearths < 4 ? (user.getHearths < 3 ? eh : hh) : h" alt="hearth">
      <img :src="user.getHearths < 6 ? (user.getHearths < 5 ? eh : hh) : h" alt="hearth">
      <img :src="user.getHearths < 8 ? (user.getHearths < 7 ? eh : hh) : h" alt="hearth">
      <img :src="user.getHearths < 10 ? (user.getHearths < 9 ? eh : hh) : h" alt="hearth">
      <span style="font-size: 12px; margin-left: 4px;" v-if="user.getTimeToNext">
        {{ user.getTimeToNext }}
      </span>
    </div>
  </header>
  <main>
    <router-view v-if="lesson.current"/>
  </main>
</template>

<script
  setup
  lang="ts"
>
import useUser from '@/store/useUser'
import h from '@/assets/hearth.svg'
import hh from '@/assets/halfHearth.svg'
import eh from '@/assets/emptyHearth.svg'
import useLesson from '@/store/useLesson'
import { useRoute } from 'vue-router'

const user = useUser()
const lesson = useLesson()
const route = useRoute()

if (!lesson.current) {
  lesson.getCurrent(parseInt(route.params.id))
}

</script>

<style
  lang="scss"
  scoped
>
header {
  display: flex;
  justify-content: space-between;
  z-index: 1;
}

main {
  display: flex;
  flex-flow: column;
  gap: 24px;
}
.button-back {
  display: flex;
  background: transparent;
  flex-flow: row;
  gap: 8px;

  img {
    filter: brightness(0.5);
  }

  span {
    font-weight: 400;
    font-size:   24px;
    line-height: 33px;
    color:       #7D7D7D;
  }
}

.health-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 136px;
  width: fit-content;
  padding: 0 12px;
  align-self: center;
  height: 36px;
  background: #FFFFFF;
  box-shadow: 0 3px 20px rgba(0, 0, 0, 0.04);
  border-radius: 40px;

  img {
    height: 24px;
  }
}
</style>
