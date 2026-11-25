<script setup>
import { useUserStore } from '@/stores/user.js'
import HeaderDropdown from './HeaderDropdown.vue'

/**
 * Settings / user dropdown in the header.
 * Emits `select` with the action id; the actions themselves will be wired
 * up once authentication is handled by the new front-end.
 */
defineEmits(['select'])

const userStore = useUserStore()

const actions = [
  { id: 'logout', label: 'خروج', icon: 'eva-log-out-outline' },
  { id: 'change-password', label: 'تغییر کلمه عبور', icon: 'fa-solid fa-key' },
  { id: 'change-printer', label: 'تغییر پرینتر پیش فرض', icon: 'fa-solid fa-print' },
]
</script>

<template>
  <header-dropdown icon="bi-gear" aria-label="تنظیمات کاربر">
    <template #header>
      <div class="row items-center">
        <div class="col">{{ userStore.fullName }}</div>
        <q-btn
          v-close-popup
          flat
          round
          dense
          icon="eva-log-out-outline"
          aria-label="خروج"
          @click="$emit('select', 'logout')"
        />
      </div>
    </template>

    <q-list dense>
      <q-item
        v-for="action in actions"
        :key="action.id"
        v-close-popup
        clickable
        class="user-menu__item"
        @click="$emit('select', action.id)"
      >
        <q-item-section side>
          <q-icon :name="action.icon" size="14px" />
        </q-item-section>
        <q-item-section>{{ action.label }}</q-item-section>
      </q-item>
    </q-list>
  </header-dropdown>
</template>

<style>
/* Not scoped: rendered inside the teleported QMenu */
.user-menu__item {
  min-height: 32px;
  padding-inline-start: 24px;
  color: var(--dropdown-item-color);
  font-size: 13px;
}

.user-menu__item .q-item__section--side {
  padding-inline-end: 8px;
  color: inherit;
}
</style>
