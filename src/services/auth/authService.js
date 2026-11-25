import { api } from '@/boot/axios'
import { clearSession, setSession } from './session.js'

/**
 * Authentication API.
 *
 * Expected back-end contract (adjust here if the ERP differs):
 *   POST login  { email, password }  →  { token: string, user?: object }
 */

/**
 * @param {{ email: string, password: string }} credentials
 */
export async function login({ email, password, cooperation_type_id }) {
  // `skipAuthRedirect`: a 401 here means wrong credentials, not an expired session
  const { data } = await api.post('login', { email, password , cooperation_type_id }, { skipAuthRedirect: true })

  if (!data?.token) {
    throw new Error('Login response does not contain a token')
  }

  setSession({ token: data.token, user: data.user })
}

export async function logout() {
  // TODO(api): call the logout endpoint once it exists, e.g. await api.post('logout')
  clearSession()
}
