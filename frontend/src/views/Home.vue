<template>
  <user-block />
  <section class="block">
    <h2>
      Выбрать урок
    </h2>
    <div class="horizontal-list">
      <div
        class="card"
        v-for="les of lesson.lessons"
        :key="les.id"
      >
        <h3>
          {{ les.name }}
        </h3>
        <div class="card__rows">
          <div class="card__row">
            <img
              src="@/assets/questions.svg"
              alt="questions"
            >
            <span> {{ les.countExercise }} Вопросов </span>
          </div>
          <div class="card__row">
            <img
              src="@/assets/time.svg"
              alt="time"
            >
            <span> {{ 10 }} Минут </span>
          </div>
        </div>
        <button @click="lesson.getCurrent(les.id)">
          Пройти урок!
        </button>
      </div>
    </div>
  </section>
</template>

<script
  setup
  lang="ts"
>
import UserBlock from '@/components/UserBlock.vue'
import useLesson from '@/store/useLesson'

const lesson = useLesson()

lesson.getLessons()
</script>

<style
  lang="scss"
  scoped
>
.block {
  display: flex;
  flex-flow: column;
  gap: 16px;
}
.horizontal-list {
  display:   flex;
  overflow:  auto;
  max-width: 100%;
  gap:       24px;
  padding-bottom: 16px;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background:    #FFFFFF;
    box-shadow:    0 3px 20px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background:    #65E080;
    border-radius: 4px;
  }
}

.card {
  display:       flex;
  flex-flow:     column;
  gap:           12px;
  background:    #FFFFFF;
  box-shadow:    0 3px 20px #0000000A;
  border-radius: 24px;
  padding:       24px;
  min-width:     256px;

  button {
    height: 32px;
  }

  .card__rows {
    display: flex;
    flex-flow: column;
    gap: 4px;
  }

  .card__row {
    display:     flex;
    flex-flow:   row;
    gap:         8px;
    align-items: center;
    height:      24px;
  }

  h3 {
    font-weight:   600;
    font-size:     16px;
    line-height:   22px;
    color:         #2B2B2B;
    margin-bottom: 4px;
  }

  span {
    font-weight: 600;
    font-size:   12px;
    line-height: 16px;
    color:       #2B2B2B;
  }
}
</style>
