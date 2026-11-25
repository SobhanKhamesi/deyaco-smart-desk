<script setup>
import { computed } from 'vue'
import { formatNumber } from '@/utils/formatters.js'

/**
 * Outlined button showing a formatted amount,
 * e.g. "اعتبار حساب: ۵۴٬۱۲۱٬۵۰۴ ریال".
 * `amount` stays numeric so formatting lives in one place.
 */
const props = defineProps({
  label: {
    type: String,
    default: 'اعتبار حساب',
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: 'ریال',
  },
})

defineEmits(['click'])

const formattedAmount = computed(() => formatNumber(props.amount))
</script>

<template>
  <q-btn outline no-caps dense class="header-balance-btn" @click="$emit('click')">
    <span>{{ label }}:</span>
    <span class="header-balance-btn__value">{{ formattedAmount }}</span>
    <span>{{ currency }}</span>
  </q-btn>
</template>

<style scoped>
.header-balance-btn {
  height: 36px;
  padding-inline: 40px;
  border-radius: 5px;
  color: var(--btn-outline-color);
  font-size: 13px;
}

.header-balance-btn::before {
  border-color: var(--btn-outline-border);
}

.header-balance-btn__value {
  margin-inline: 4px;
  font-weight: 500;
}
</style>
