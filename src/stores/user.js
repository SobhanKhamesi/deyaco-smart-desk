import { acceptHMRUpdate, defineStore } from 'pinia'

/**
 * Current user's profile and account balance.
 * Values are placeholders until the profile endpoint is connected.
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    // TODO(api): load from the profile endpoint
    fullName: 'کاربر ۱',
    balance: 54_121_504,
  }),
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
