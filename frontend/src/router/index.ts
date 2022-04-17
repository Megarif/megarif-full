import { createRouter, createWebHistory } from 'vue-router'
import routes from '../routes'
import useUser from '@/store/useUser'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  const user = useUser()

  if (to.meta?.userRequired && !user.id) {
    router.replace({ name: 'Landing' })
  }
})

export default router
