import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { APP_NAME } from '@/config/app.js'
import { hasSession } from '@/services/auth/session.js'
import routes from './routes.js'

export default defineRouter(() => {
  // Router mode/base are configured in quasar.config.js > build
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  router.beforeEach((to) => {
    const isSignedIn = hasSession()

    if (to.meta.requiresAuth && !isSignedIn) {
      return { name: 'login', query: { redirect: to.fullPath } }
    }

    if (to.meta.guestOnly && isSignedIn) {
      return { name: 'smart-desk' }
    }
  })

  router.afterEach((to) => {
    document.title = to.meta.title ? `${to.meta.title} | ${APP_NAME}` : APP_NAME
  })

  return router
})
