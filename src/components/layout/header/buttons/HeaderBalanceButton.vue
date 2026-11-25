<script setup>
import { computed } from 'vue'

/**
 * Outlined button that shows a formatted amount
 * (e.g. "اعتبار حساب: ۵۴,۱۲۱,۵۰۴ ریال").
 *
 * `amount` stays numeric so the component owns formatting/locale concerns
 * instead of every call-site having to pre-format the number.
 */
const props = defineProps({
  label: {
    type: String,
    default: 'اعتبار حساب'
  },
  amount: {
    type: [Number, String],
    required: true
  },
  currency: {
    type: String,
    default: 'ریال'
  }
})

defineEmits(['click'])

const formattedAmount = computed(() => Number(props.amount).toLocaleString('fa-IR'))
</script>

<template>
  <q-btn
    outline
    no-caps
    style="padding: 0 40px!important"
    dense
    class="header-balance-btn q-px-xl"
    @click="$emit('click')"
  >
    <span class="header-balance-btn__label">{{ label }}:</span>
    <span class="header-balance-btn__value">{{ formattedAmount }}</span>
    <span class="header-balance-btn__label">{{ currency }}</span>
  </q-btn>
</template>

<style scoped>
.header-balance-btn {
  border: 1px solid var(--btn-outline-border);
  color: var(--btn-outline-color);
  border-radius: 5px;
  height: 36px;
  padding-inline: 14px;
  font-size: 13px;
  gap: 4px;
}

.header-balance-btn__value {
  font-weight: 500;
  margin-inline: 4px;
}
</style>
