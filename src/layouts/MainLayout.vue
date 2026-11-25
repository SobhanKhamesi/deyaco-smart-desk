<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/header/AppHeader.vue'
import AppDrawer from '@/components/layout/drawer/AppDrawer.vue'

// `false` + `show-if-above` on the drawer: open on desktop, closed on mobile
const isDrawerOpen = ref(false)

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value
}
</script>

<template>
  <q-layout view="lhr Lpr lFr">
    <app-header :is-drawer-open="isDrawerOpen" @toggle-drawer="toggleDrawer" />
    <app-drawer v-model="isDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
