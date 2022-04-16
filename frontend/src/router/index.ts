import { createRouter, createWebHistory } from 'vue-router'
import routes from '../routes'
import useUser from '@/store/useUser'

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  const user = useUser();
  if (to.meta?.userRequired) {

  }
})

export default router
