/// <reference types="vite/client" />
import { Layout } from './layouts'

declare module '*.vue' {
  // @ts-ignore
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  // eslint-disable-next-line no-unused-vars
  interface RouteMeta {
    layout: Layout
  }
}
