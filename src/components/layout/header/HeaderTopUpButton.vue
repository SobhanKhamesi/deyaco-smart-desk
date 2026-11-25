<script setup>
/**
 * Solid call-to-action button in the header, e.g. "افزایش اعتبار (آنلاین)".
 */
defineProps({
  label: {
    type: String,
    default: 'افزایش اعتبار (آنلاین)',
  },
  icon: {
    type: String,
    default: undefined,
  },
})

defineEmits(['click'])
</script>

<template>
  <q-btn
    unelevated
    no-caps
    dense
    class="header-top-up-btn"
    :icon="icon"
    :label="label"
    @click="$emit('click')"
  />
</template>

<style scoped>
.header-top-up-btn {
  height: 36px;
  padding-inline: 50px;
  border-radius: 5px;
  background: var(--btn-online-bg);
  color: var(--btn-online-color);
  font-size: 13px;
  font-weight: 500;
}
</style>
