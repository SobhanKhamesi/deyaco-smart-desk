<script setup>
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { COMPANY_NAME } from '@/config/app.js'
import { logout } from '@/services/auth/authService.js'
import { useUserStore } from '@/stores/user.js'
import HeaderBalanceButton from './HeaderBalanceButton.vue'
import HeaderTopUpButton from './HeaderTopUpButton.vue'
import HeaderClockMenu from './HeaderClockMenu.vue'
import HeaderUserMenu from './HeaderUserMenu.vue'

const props = defineProps({
  isDrawerOpen: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['toggle-drawer'])

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const pageTitle = computed(() => route.meta.title || COMPANY_NAME)

// The drawer has its own close button, so the header toggle is only needed
// when the drawer is closed or on small screens (overlay mode).
const showDrawerToggle = computed(() => !props.isDrawerOpen || $q.screen.lt.md)

const fullscreenIcon = computed(() =>
  $q.fullscreen.isActive ? 'bi-fullscreen-exit' : 'bi-fullscreen',
)

async function handleUserMenuSelect(actionId) {
  if (actionId === 'logout') {
    await logout()
    await router.replace({ name: 'login' })
  }
  // TODO: 'change-password' and 'change-printer' once those pages exist
}
</script>

<template>
  <q-header class="app-header">
    <q-toolbar class="app-header__toolbar">
      <q-btn
        v-if="showDrawerToggle"
        flat
        round
        dense
        icon="bi-list"
        aria-label="باز و بسته کردن منو"
        @click="$emit('toggle-drawer')"
      />

      <q-btn
        flat
        round
        dense
        size="xs"
        :icon="fullscreenIcon"
        aria-label="تمام صفحه"
        class="gt-xs"
        @click="$q.fullscreen.toggle()"
      />

      <h1 class="app-header__title ellipsis">{{ pageTitle }}</h1>

      <q-space />

      <div class="app-header__actions">
        <header-balance-button :amount="userStore.balance" class="gt-sm" />
        <header-top-up-button class="gt-sm" />
        <header-clock-menu class="gt-xs" />
        <header-user-menu @select="handleUserMenuSelect" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<style scoped>
.app-header {
  background: var(--header-bg);
  color: var(--header-title-color);
}

.app-header__toolbar {
  min-height: var(--header-height);
  gap: 8px;
}

.app-header__title {
  margin: 0;
  margin-inline-start: 16px;
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  letter-spacing: normal;
  color: var(--header-title-color);
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
