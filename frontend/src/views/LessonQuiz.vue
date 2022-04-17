<template>
  <div class="background">

  </div>
  <div class="time">

  </div>
  <div class="question">
    Вопрос {{ `${quizId}/${lesson.current.countExercise}` }}
  </div>
  <div class="wrapper">
    <template v-if="lesson.current.quiz.quiz.length">
      <quiz-choose
        v-for="quiz in lesson.current.quiz.quiz"
        :key="quiz.id"
        :question="quiz.question"
        :options="quiz.options || []"
        :option="quiz.option"
        :correct="quiz.id"
        :status="quiz.id > quizId ? 'before' : ( quiz.id === quizId ? 'answer' : 'destroy')"
        @damage="user.damage()"
        @select="select"
        :style="{ zIndex: quiz.id === quizId ? 10 : 0, opacity: quiz.id === quizId ? 1 : 0 }"
      />
    </template>
  </div>
</template>

<script
  setup
  lang="ts"
>
import useLesson from '@/store/useLesson'
import { computed, ref } from 'vue'
import QuizSuggestion from '@/components/lesson/QuizSuggestion.vue'
import QuizChoose from '@/components/lesson/QuizChoose.vue'
import useUser from '@/store/useUser'
import { useRoute } from 'vue-router'
import router from '@/router'
import useMascot from '@/store/useMascot'

type Status = 'answer' | 'correct' | 'timeout' | 'error'

const mascot = useMascot()
const lesson = useLesson()
const quizId = ref(1)
const user = useUser()
const status = ref<Status>('answer')
/*const quiz = computed(() => {
  if (lesson?.current?.quiz?.quiz) {
    return lesson.current.quiz.quiz.find((q) => q.id === quizId.value)
  }
  return null
})*/
const route = useRoute()
lesson.getCurrent(route.params.id)
const nextQuiz = () => {
  if (lesson?.current?.quiz?.quiz?.length === quizId.value) {
    router.push('/')
    quizId.value = 1
  } else {
    quizId.value++
    if (quizId.value === 4 || quizId.value === 7) {

    }
  }
}

const select = () => {
  setTimeout(() => {
    status.value = 'destroy'
    setTimeout(() => {
      status.value = 'answer'
      nextQuiz()
    }, 330)
  }, 330)
}
</script>

<style
  lang="scss"
  scoped
>
.wrapper {
  position: relative;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: transparent;
}
.question {
  font-weight: 400;
  font-size: 24px;
  line-height: 33px;
}
</style>
