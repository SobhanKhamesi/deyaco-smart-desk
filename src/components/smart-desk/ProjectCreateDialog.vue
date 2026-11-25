<script setup>
import { ref, watch } from 'vue'

/**
 * "New project" form dialog.
 * Emits `submit` with `{ title, color, memberIds }`; the parent saves it.
 */
defineProps({
  /** `{ label, value }` list of users that can be added as members */
  memberOptions: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['submit'])

const isOpen = defineModel({ type: Boolean, default: false })

const PROJECT_COLORS = ['teal', 'orange', 'blue', 'red', 'green', 'purple']

const createEmptyForm = () => ({ title: '', color: PROJECT_COLORS[0], memberIds: [] })

const form = ref(createEmptyForm())

const titleRules = [(value) => !!value?.trim() || 'عنوان پروژه را وارد کنید']

// Start with a clean form every time the dialog opens
watch(isOpen, (open) => {
  if (open) form.value = createEmptyForm()
})

function submit() {
  emit('submit', { ...form.value, title: form.value.title.trim() })
}
</script>

<template>
  <q-dialog v-model="isOpen">
    <q-card class="project-create-dialog">
      <q-form @submit="submit">
        <q-card-section>
          <div class="text-h6">ایجاد پروژه جدید</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="form.title"
            label="عنوان پروژه"
            autofocus
            lazy-rules
            :rules="titleRules"
          />

          <div class="text-grey-7 q-mt-sm">انتخاب رنگ نماد پروژه</div>
          <div>
            <q-radio
              v-for="color in PROJECT_COLORS"
              :key="color"
              v-model="form.color"
              :val="color"
              :color="color"
              :aria-label="color"
              keep-color
            />
          </div>

          <q-separator class="q-my-md" />

          <q-select
            v-model="form.memberIds"
            :options="memberOptions"
            label="انتخاب اعضا"
            multiple
            use-chips
            emit-value
            map-options
            outlined
            dense
          >
            <template #no-option>
              <q-item>
                <q-item-section class="text-grey">کاربری یافت نشد</q-item-section>
              </q-item>
            </template>
          </q-select>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn v-close-popup flat label="انصراف" color="grey-7" />
          <q-btn unelevated type="submit" label="ایجاد پروژه" color="primary" :loading="loading" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<style scoped>
.project-create-dialog {
  width: 500px;
  max-width: 90vw;
}
</style>
