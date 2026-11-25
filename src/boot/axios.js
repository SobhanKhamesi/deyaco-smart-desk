import axios from 'axios'
import { defineBoot } from '#q-app'
import { Notify } from 'quasar'
import { API_BASE_URL } from '@/config/app.js'
import { clearSession, getAccessToken } from '@/services/auth/session.js'

const REDIRECT_DELAY_MS = 1000
const NOT_FOUND_REDIRECT_DELAY_MS = 2000

const MESSAGES = Object.freeze({
  network: 'ارتباط با سرور برقرار نشد',
  unauthorized: 'نشست شما منقضی شده است',
  invalidCredentials: 'نام کاربری یا رمز عبور اشتباه است',
  forbidden: 'دسترسی ندارید!',
  server: 'مشکلی در سمت سرور رخ داده است',
})

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { Accept: 'application/json' },
})

function notifyError(message, position = 'bottom') {
  if (!message) return
  Notify.create({ type: 'negative', position, message })
}

/** Laravel-style `{ errors: { field: ['msg', ...] } }` → flat list of messages */
function getValidationMessages(data) {
  const errors = data?.errors
  if (!errors || typeof errors !== 'object') return []
  return Object.values(errors).flat().filter(Boolean)
}

function handleResponseError(error, router) {
  if (axios.isCancel(error)) return

  const { response } = error
  if (!response) {
    notifyError(MESSAGES.network)
    return
  }

  const { status, data } = response
  const validationMessages = getValidationMessages(data)

  if (validationMessages.length > 0) {
    validationMessages.forEach((message) => notifyError(message))
    return
  }

  switch (status) {
    case 401:
      // Requests such as login opt out: there a 401 means wrong credentials
      if (error.config?.skipAuthRedirect) {
        notifyError(data?.message || MESSAGES.invalidCredentials)
        break
      }
      notifyError(MESSAGES.unauthorized, 'center')
      clearSession()
      router.replace({
        name: 'login',
        query: { redirect: router.currentRoute.value.fullPath },
      })
      break

    case 403:
      notifyError(MESSAGES.forbidden, 'center')
      setTimeout(() => router.replace('/'), REDIRECT_DELAY_MS)
      break

    case 404:
      notifyError(data?.message, 'center')
      setTimeout(() => router.replace('/'), NOT_FOUND_REDIRECT_DELAY_MS)
      break

    default:
      if (status >= 500) notifyError(data?.message || MESSAGES.server)
      else notifyError(data?.message)
  }
}

export default defineBoot(({ app, router }) => {
  // Read the token on every request so a fresh login is picked up without a reload.
  api.interceptors.request.use((config) => {
    const token = getAccessToken()
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      handleResponseError(error, router)
      return Promise.reject(error)
    },
  )

  // Allows `this.$api` in Options API components
  app.config.globalProperties.$api = api
})
