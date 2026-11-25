<script setup>
/**
 * Solid teal call-to-action button from the header
 * (e.g. "افزایش اعتبار (آنلاین)").
 *
 * Kept generic (label/icon as props, plain "click" emit) so it can be
 * reused anywhere a similarly-styled primary action button is needed,
 * not just for this one label.
 */
defineProps({
  label: {
    type: String,
    default: 'افزایش اعتبار (آنلاین)'
  },
  icon: {
    type: String,
    default: ''
  }
})

defineEmits(['click'])
</script>

<template>
  <q-btn
    unelevated
    no-caps
    dense
    class="header-online-btn"
    style="padding: 0 50px!important"
    :icon="icon || undefined"
    :label="label"
    @click="$emit('click')"
  />
</template>

<style scoped>
.header-online-btn {
  background: var(--btn-online-bg);
  color: var(--btn-online-color);
  border-radius: 5px;
  font-weight: 500;
  font-size: 13px;
  padding-inline: 18px;
  height: 36px;
}
</style>
