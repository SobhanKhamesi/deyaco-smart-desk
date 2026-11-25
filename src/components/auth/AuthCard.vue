<script setup>
/** Rounded card used by the auth pages (login, and later forgot-password). */
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="auth-card">
    <h1 class="auth-card__title">{{ title }}</h1>
    <slot />
  </section>
</template>

<style scoped>
.auth-card {
  width: var(--auth-card-width);
  max-width: 100%;
  padding: 50px var(--auth-card-padding-inline) 110px;
  border-radius: var(--auth-card-radius);
  background: var(--auth-card-bg);
  color: var(--auth-ink);
}

.auth-card__title {
  margin: 0 0 38px;
  font-size: 29px;
  font-weight: 700;
  line-height: 44px;
  letter-spacing: normal;
  text-align: center;
  text-wrap: balance;
}

@media (max-width: 599px) {
  .auth-card {
    padding: 32px 24px 40px;
    border-radius: 28px;
  }

  .auth-card__title {
    margin-bottom: 24px;
    font-size: 22px;
    line-height: 36px;
  }
}
</style>
