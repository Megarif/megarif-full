import { RouteRecordRaw } from 'vue-router'
import layouts from '@/layouts'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/landing',
    name: 'Landing',
    component: () => import('@/views/Landing.vue'),
    meta: {
      layout: layouts.main
    }
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
    meta: {
      layout: layouts.empty
    }
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
    meta: {
      layout: layouts.empty
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      layout: layouts.empty,
      userRequired: true
    }
  },
  {
    path: '/lessons',
    name: 'Lessons',
    component: () => import('@/views/Lessons.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/bookmarks',
    name: 'Bookmarks',
    component: () => import('@/views/Bookmarks.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/market',
    name: 'Market',
    component: () => import('@/views/Market.vue'),
    meta: {
      layout: layouts.main,
      userRequired: true
    }
  },
  {
    path: '/exercise/:id',
    name: 'Exercise',
    component: () => import('@/views/LessonExercise.vue'),
    meta: {
      layout: layouts.lesson,
      userRequired: true
    }
  },
  {
    path: '/quiz/:id',
    name: 'Quiz',
    component: () => import('@/views/LessonQuiz.vue'),
    meta: {
      layout: layouts.lesson,
      userRequired: true
    }
  }
]

export default routes
