import { defineAsyncComponent } from 'vue'

const layouts = {
  empty: defineAsyncComponent(() => import('./EmptyLayout.vue')),
  main: defineAsyncComponent(() => import('./MainLayout.vue')),
  lesson: defineAsyncComponent(() => import('./LessonLayout.vue'))
}

export type Layout = typeof layouts['main'] | typeof layouts['empty'] | typeof layouts['lesson']

export default layouts
