import { LocalStorage } from 'quasar'
import { STORAGE_KEYS } from '@/config/app.js'

/** Auth session persisted in LocalStorage (keys shared with the legacy ERP). */

export function getAccessToken() {
  return LocalStorage.getItem(STORAGE_KEYS.token)
}

export function hasSession() {
  return Boolean(getAccessToken())
}

/**
 * @param {{ token: string, user?: object }} session
 */
export function setSession({ token, user }) {
  LocalStorage.set(STORAGE_KEYS.token, token)
  LocalStorage.set(STORAGE_KEYS.auth, user ?? true)
}

export function clearSession() {
  Object.values(STORAGE_KEYS).forEach((key) => LocalStorage.remove(key))
}
