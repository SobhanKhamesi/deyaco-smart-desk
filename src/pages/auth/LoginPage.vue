<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { LOGIN_TITLE } from '@/config/app.js'
import { login } from '@/services/auth/authService.js'
import AuthCard from '@/components/auth/AuthCard.vue'
import LoginForm from '@/components/auth/LoginForm.vue'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const isSubmitting = ref(false)

// TODO: point these to real pages once they are migrated
const helpLinks = [
  { id: 'forgot-password', label: 'فراموشی رمز عبور', to: '/forgot-password' },
  { id: 'cooperation', label: 'همکاری با ما', to: '/cooperation' },
]

/** Only allow internal paths (prevents open redirects via ?redirect=). */
function getRedirectPath() {
  const { redirect } = route.query
  const isInternalPath =
    typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//')
  return isInternalPath ? redirect : '/'
}

async function handleLogin(credentials) {
  isSubmitting.value = true
  try {
    await login(credentials)
    await router.replace(getRedirectPath())
  } catch (error) {
    // HTTP errors are already reported by the axios interceptor
    if (!error.isAxiosError) {
      $q.notify({ type: 'negative', message: 'ورود ناموفق بود' })
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <auth-card :title="LOGIN_TITLE">
    <login-form :loading="isSubmitting" @submit="handleLogin" />

    <nav class="login-page__links">
      <router-link v-for="link in helpLinks" :key="link.id" :to="link.to" class="login-page__link">
        {{ link.label }}
      </router-link>
    </nav>
  </auth-card>
</template>

<style scoped>
.login-page__links {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-inline: 12px 4px;
}

.login-page__link {
  font-size: 13px;
  font-weight: 500;
  color: var(--auth-link-color);
}

.login-page__link:hover {
  text-decoration: underline;
}
</style>
