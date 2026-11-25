<script setup>
/**
 * Flat header button (icon and/or text + chevron) that opens a dropdown panel.
 *
 * Slots:
 *   header — coloured top section of the panel
 *   default — panel body (omit for a header-only panel)
 */
defineProps({
  icon: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
})
</script>

<template>
  <q-btn flat dense no-caps class="header-dropdown" :aria-label="ariaLabel">
    <q-icon v-if="icon" :name="icon" size="18px" />
    <span v-if="text" class="header-dropdown__text">{{ text }}</span>
    <q-icon name="bi-chevron-down" size="12px" class="q-mx-xs" />

    <q-menu anchor="bottom end" self="top end" class="header-dropdown__menu">
      <div class="header-dropdown__panel">
        <div
          v-if="$slots.header"
          class="header-dropdown__panel-header"
          :class="{ 'header-dropdown__panel-header--only': !$slots.default }"
        >
          <slot name="header" />
        </div>
        <div v-if="$slots.default" class="header-dropdown__panel-body">
          <slot />
        </div>
      </div>
    </q-menu>
  </q-btn>
</template>

<style scoped>
.header-dropdown {
  padding-inline: 6px;
  gap: 6px;
  color: var(--header-title-color);
  font-size: 13px;
}

.header-dropdown__text {
  font-variant-numeric: tabular-nums;
}
</style>

<style>
/* Not scoped: QMenu is teleported to <body>, outside this component's scope */
.header-dropdown__menu {
  background: transparent;
  box-shadow: var(--dropdown-shadow);
}

.header-dropdown__panel {
  min-width: 17rem;
  margin-top: 16px;
}

.header-dropdown__panel-header {
  padding: 16px;
  padding-inline-end: 24px;
  border-radius: var(--dropdown-radius) var(--dropdown-radius) 0 0;
  background: var(--dropdown-header-bg);
  color: var(--dropdown-header-color);
  font-size: 16px;
}

.header-dropdown__panel-header--only {
  border-radius: var(--dropdown-radius);
}

.header-dropdown__panel-body {
  padding: 24px 0;
  padding-inline-end: 24px;
  border-radius: 0 0 var(--dropdown-radius) var(--dropdown-radius);
  background: var(--dropdown-body-bg);
}
</style>
