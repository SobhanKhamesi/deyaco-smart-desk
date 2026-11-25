<script setup>
import { computed } from 'vue'
import { useNow } from '@/composables/useNow.js'
import { formatLongDate, formatTime } from '@/utils/formatters.js'
import HeaderDropdown from './HeaderDropdown.vue'

/** Current time in the header; the dropdown shows today's Jalali date. */
const now = useNow()

const timeLabel = computed(() => formatTime(now.value))
const dateLabel = computed(() => formatLongDate(now.value))
</script>

<template>
  <header-dropdown :text="timeLabel" aria-label="تاریخ امروز">
    <template #header>{{ dateLabel }}</template>
  </header-dropdown>
</template>
