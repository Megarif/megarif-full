<template>
  <div class="background">

  </div>
  <div class="time">

  </div>
  <div class="question">
    Вопрос {{ `${quizId}/${lesson.current.countExercise}` }}
  </div>
  <template v-if="quiz">
    <quiz-choose
      v-if="quiz.type === 'oneSelect'"
      :question="quiz.question"
      :options="quiz.options"
      :correct="quiz.id"
      @damage="user.damage()"
    />
    <quiz-suggestion v-else/>
  </template>
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

type Status = 'answer' | 'correct' | 'timeout' | 'error'

const lesson = useLesson()
const quizId = ref(1)
const user = useUser()
const status = ref<Status>('answer')
const quiz = computed(() => {
  if (lesson?.current?.quiz?.quiz) {
    return lesson.current.quiz.quiz.find((q) => q.id === quizId.value)
  }
  return null
})
const route = useRoute()
lesson.getCurrent(route.params.id)
const nextQuiz = () => {
  if (lesson?.current?.quiz?.quiz?.length === quizId.value) {
    quizId = 1
  } else {
    quizId++
  }
}
</script>

<style
  lang="scss"
  scoped
>
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
