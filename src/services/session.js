import { LocalStorage } from 'quasar'
import { STORAGE_KEYS } from '@/config/app.js'

/** Auth session persisted in LocalStorage (shared with the legacy ERP). */

export function getAccessToken() {
  return LocalStorage.getItem(STORAGE_KEYS.token)
}

export function clearSession() {
  Object.values(STORAGE_KEYS).forEach((key) => LocalStorage.remove(key))
}
