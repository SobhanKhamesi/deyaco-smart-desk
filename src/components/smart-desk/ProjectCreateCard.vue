<script setup>
/** "+ پروژه جدید" tile shown after the project cards. */
defineEmits(['click'])
</script>

<template>
  <q-card
    flat
    class="project-create-card flex flex-center cursor-pointer"
    role="button"
    tabindex="0"
    @click="$emit('click')"
    @keydown.enter="$emit('click')"
  >
    <div class="text-center text-primary">
      <q-icon name="eva-plus" size="3rem" />
      <div class="project-create-card__label">پروژه جدید</div>
    </div>
  </q-card>
</template>

<style scoped>
.project-create-card {
  width: var(--project-card-width);
  height: var(--project-card-height);
  border: 1px solid var(--project-card-border);
  background: var(--project-card-bg);
}

.project-create-card__label {
  font-size: 20px;
  font-weight: 500;
}
</style>
