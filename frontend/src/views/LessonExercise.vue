<template>
  <div class="name">
    {{ lesson.current.name }}
  </div>
  <div
    class="exercise"
    v-for="ex of lesson.current.exercise"
  >
    <div class="card">
      <img :src="envi.backendUrl + ex.img" alt="image">
      <h3>{{ ex.title }}</h3>
      <p>
        {{ ex.descriptionExercise }}
      </p>
    </div>

    <div class="translate" v-if="ex.translate">
      <div class="translate-word" v-for="(key, value) in ex.translate">
        <div class="word">
          {{ key }}
        </div>
        <div class="word">
          {{ value }}
        </div>
      </div>
    </div>
  </div>
  <router-link
    class="button"
    :to="`/quiz/${$route.params.id}`"
  >
    Начать урок!
  </router-link>
</template>

<script
  setup
  lang="ts"
>
import useLang from '@/store/useLang'
import useLesson from '@/store/useLesson'
import useUser from '@/store/useUser'
import envi from '@/envi'

const user = useUser()
const lang = useLang()
const lesson = useLesson()
</script>

<style
  lang="scss"
  scoped
>
.name {
  background: #FFFFFFB2;
  border-radius: 13px;
  padding: 5px 15px;
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
  color: #484848;
}
.exercise {
  .card {
    background: #FFFFFF;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.04);
    border-radius: 32px;
    padding: 24px;

    h3 {
      color: #008000;
      font-weight: 400;
      font-size: 20px;
    }
  }
}

.word {
  background: #FFFFFF;
  border: 1.2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 9px;
  padding: 9px 14px;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;

  /* black */

  color: #2B2B2B;
  max-width: 0;
  min-width: fit-content;
}
.translate-word {
  display: flex;
  gap: 24px;
  justify-content: center;
}
.translate {
  display: flex;
  flex-flow: column;
  gap: 12px;
  padding: 12px 50%;
}

img {
  width: 100%;
  border-radius: 16px;
  object-fit: cover;
}

p {
  font-size: 14px;
}
</style>
