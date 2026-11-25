import { defineStore } from '#q-app'
import { createPinia } from 'pinia'

export default defineStore(() => {
  const pinia = createPinia()

  // Register Pinia plugins here, e.g. pinia.use(SomePiniaPlugin)

  return pinia
})
