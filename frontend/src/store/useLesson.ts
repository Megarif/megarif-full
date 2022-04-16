import { defineStore } from 'pinia'
import envi from '@/envi'
import axios, { AxiosResponse } from 'axios'

interface Lesson {
  countExercise: number
  createdAt: string
  fileName: null
  id: number
  name: string
  quiz: null | Array<any>
  updatedAt: string
  xp: number
}

interface LessonState {
  current: null
  lesson: Lesson | null
  lessons: Array<Lesson> | null
}

export default defineStore('lesson', {
  state: (): LessonState => ({
    current: null,
    lesson: null,
    lessons: null
  }),
  actions: {
    getLessons (): Promise<AxiosResponse<any, any>> {
      const promise = axios.get(envi.apiUrl + 'lesson/all')
      promise.then((response) => {
        this.setLessons(response.data)
      })

      return promise
    },
    getCurrent (lessonId: number): Promise<AxiosResponse<any, any>> {
      const promise = axios.get(envi.apiUrl + `lesson/current?id=${lessonId}`)
      promise.then((response) => {
        this.setCurrent(response.data)
      })

      return promise
    },
    setCurrent (current: LessonState['current']) {
      this.current = current
    },
    setLessons (lessons: LessonState['lessons']) {
      this.lessons = lessons
    }
  }
})
