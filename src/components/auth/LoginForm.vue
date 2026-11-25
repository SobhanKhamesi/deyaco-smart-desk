<script setup>
import { ref } from 'vue'

/** Username/password form. Emits `submit` with the credentials; the page performs the login. */
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const form = ref({ username: '', password: '' })

const rules = {
  username: [(value) => !!value?.trim() || 'نام کاربری را وارد کنید'],
  password: [(value) => !!value || 'رمز ورود را وارد کنید'],
}

function submit() {
  emit('submit', { username: form.value.username.trim(), password: form.value.password , cooperation_type_id: 1 })
}
</script>

<template>
  <q-form class="login-form" greedy @submit="submit">
    <div class="login-form__field">
      <label for="login-username" class="login-form__label">نام کاربری</label>
      <q-input
        v-model="form.username"
        for="login-username"
        class="login-form__input"
        borderless
        autofocus
        autocomplete="username"
        lazy-rules="ondemand"
        hide-bottom-space
        no-error-icon
        :rules="rules.username"
      />
    </div>

    <div class="login-form__field">
      <label for="login-password" class="login-form__label">رمز ورود</label>
      <q-input
        v-model="form.password"
        for="login-password"
        class="login-form__input"
        type="password"
        borderless
        autocomplete="current-password"
        lazy-rules="ondemand"
        hide-bottom-space
        no-error-icon
        :rules="rules.password"
      />
    </div>

    <q-btn
      type="submit"
      unelevated
      no-caps
      label="ورود"
      class="login-form__submit full-width"
      :loading="loading"
    />
  </q-form>
</template>

<style scoped>
.login-form__field + .login-form__field {
  margin-top: 12px;
}

.login-form__label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  color: var(--auth-ink);
}

.login-form__input :deep(.q-field__control) {
  height: var(--auth-input-height);
  padding-inline: 16px;
  border-radius: var(--auth-input-radius);
  background: var(--auth-input-bg);
  box-shadow: var(--auth-input-shadow);
}

.login-form__input :deep(.q-field__native) {
  color: var(--auth-ink);
  font-size: 15px;
}

.login-form__submit {
  height: var(--auth-button-height);
  margin-top: 33px;
  border-radius: var(--auth-button-radius);
  background: var(--auth-button-bg);
  color: var(--auth-button-color);
  font-size: 22px;
  font-weight: 700;
}
</style>
