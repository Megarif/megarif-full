import { defineAsyncComponent } from 'vue'

const layouts = {
  empty: defineAsyncComponent(() => import('./EmptyLayout.vue')),
  main: defineAsyncComponent(() => import('./MainLayout.vue'))
}

export type Layout = typeof layouts['main'] | typeof layouts['empty']

export default layouts
