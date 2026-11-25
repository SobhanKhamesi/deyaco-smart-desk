<script setup>
import { DRAWER_WIDTH } from '@/config/app.js'
import { navigationItems } from '@/config/navigation.js'
import AppDrawerItem from './AppDrawerItem.vue'

const isOpen = defineModel({ type: Boolean, default: false })

const scrollThumbStyle = {
  borderRadius: '5px',
  backgroundColor: '#303030',
  width: '6px',
  opacity: 0.5,
}

const scrollBarStyle = {
  borderRadius: '9px',
  backgroundColor: 'transparent',
  width: '9px',
  opacity: 0.2,
}
</script>

<template>
  <q-drawer v-model="isOpen" show-if-above :width="DRAWER_WIDTH" class="app-drawer">
    <q-scroll-area class="fit" :thumb-style="scrollThumbStyle" :bar-style="scrollBarStyle">
      <div class="app-drawer__top">
        <!-- Logo placeholder -->
        <q-avatar class="app-drawer__logo" size="35px" rounded />

        <q-space />

        <q-btn
          flat
          round
          dense
          icon="eva-bar-chart-outline"
          class="app-drawer__toggle rotate-90"
          aria-label="جمع کردن منو"
          @click="isOpen = false"
        />
      </div>

      <q-list>
        <app-drawer-item v-for="item in navigationItems" :key="item.id" :item="item" />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<style>
/* Not scoped: QDrawer renders the class on its own <aside>, outside this scope */
.app-drawer {
  background: var(--sidebar-bg);
  box-shadow: var(--sidebar-shadow);
}
</style>

<style scoped>
.app-drawer__top {
  display: flex;
  align-items: center;
  padding: 14px 16px;
}

.app-drawer__logo {
  background: linear-gradient(135deg, var(--sidebar-avatar-start), var(--sidebar-avatar-end));
  color: #fff;
  border-radius: 11px;
}

.app-drawer__toggle {
  color: var(--sidebar-item-color);
}
</style>
