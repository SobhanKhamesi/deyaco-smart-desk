<script setup>
import { COPYRIGHT_TEXT } from '@/config/app.js'
import BrandIntroVideo from '@/components/auth/BrandIntroVideo.vue'
</script>

<template>
  <!-- RTL grid: first column (form) sits on the right, the brand video on the left -->
  <div class="auth-layout">
    <main class="auth-layout__content">
      <router-view />
    </main>

    <div class="auth-layout__brand">
      <brand-intro-video />
    </div>

    <footer class="auth-layout__footer">{{ COPYRIGHT_TEXT }}</footer>
  </div>
</template>

<style scoped>
.auth-layout {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  min-height: 100vh;
  min-height: 100dvh;
  background: var(--auth-bg);
  overflow: hidden;
}

.auth-layout__content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  padding-block: 32px 72px;
  padding-inline: var(--auth-layout-gutter) var(--auth-layout-gap);
}

.auth-layout__brand {
  position: relative;
  min-height: 100%;
}

.auth-layout__footer {
  position: absolute;
  inset-inline: 0;
  bottom: 40px;
  z-index: 1;
  text-align: center;
  font-size: 22px;
  font-weight: 700;
  color: var(--auth-on-bg);
}

/* Tablets & phones: logo on top, form below, credit at the end */
@media (max-width: 1023px) {
  .auth-layout {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto auto auto;
  }

  .auth-layout__brand {
    order: -1;
    height: 38vh;
  }

  .auth-layout__content {
    justify-content: center;
    padding: 0 16px 24px;
  }

  .auth-layout__footer {
    position: static;
    padding: 8px 16px 24px;
    font-size: 15px;
  }
}
</style>
