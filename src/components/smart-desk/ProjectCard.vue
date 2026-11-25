<script setup>
import { computed } from 'vue'
import { formatNumber, formatPercent, formatRelativeTime, getInitials } from '@/utils/formatters.js'

const props = defineProps({
  /** @type {import('vue').PropType<import('@/services/smart-desk/projectService.js').Project>} */
  project: {
    type: Object,
    required: true,
  },
})

defineEmits(['open'])

const progressBars = computed(() => [
  { id: 'total', label: 'وضعیت کل پروژه', value: props.project.totalProgress },
  { id: 'mine', label: 'وظایف من', value: props.project.myProgress },
])

const avatarClass = computed(() =>
  props.project.color ? `bg-${props.project.color}` : 'project-card__avatar--default',
)

const lastCompletedLabel = computed(
  () => formatRelativeTime(props.project.lastCompletedTaskAt) || '—',
)

const tasksSummary = computed(
  () =>
    `${formatNumber(props.project.completedTasksCount)} از ${formatNumber(props.project.totalTasksCount)}`,
)
</script>

<template>
  <q-card flat class="project-card cursor-pointer column" @click="$emit('open', project)">
    <q-card-section class="text-center">
      <q-avatar size="45px" class="project-card__avatar" :class="avatarClass">
        <q-img v-if="project.image" :src="project.image" :alt="project.title" />
        <span v-else>{{ getInitials(project.title) }}</span>
      </q-avatar>
      <div class="q-mt-md">{{ project.title }}</div>
    </q-card-section>

    <q-card-section class="project-card__meta q-pt-none">
      <div v-for="bar in progressBars" :key="bar.id" class="q-mb-sm">
        <div>{{ bar.label }}:</div>
        <q-linear-progress size="xl" :value="bar.value" color="primary">
          <div class="absolute-full flex flex-center">
            <q-badge
              color="white"
              text-color="primary"
              class="project-card__badge"
              :label="formatPercent(bar.value)"
            />
          </div>
        </q-linear-progress>
      </div>
    </q-card-section>

    <q-space />

    <q-separator class="project-card__separator" />

    <q-card-section class="project-card__meta q-gutter-y-sm">
      <div>
        <span>آخرین وظیفه انجام شده: </span>
        <span class="text-green">{{ lastCompletedLabel }}</span>
      </div>

      <div class="row items-center justify-between">
        <span>وظایف انجام شده: {{ tasksSummary }}</span>
        <q-badge
          v-if="project.openTasksCount > 0"
          color="grey-1"
          text-color="grey-9"
          :label="formatNumber(project.openTasksCount)"
        >
          <q-tooltip>وظایف باز</q-tooltip>
        </q-badge>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.project-card {
  width: var(--project-card-width);
  height: var(--project-card-height);
  border: 1px solid var(--project-card-border);
  background: var(--project-card-bg);
  color: var(--project-card-color);
}

.project-card__avatar {
  border-radius: 11px;
  color: #ffffff;
}

.project-card__avatar--default {
  background: var(--project-avatar-bg);
}

.project-card__meta {
  font-size: 12px;
  color: var(--project-card-muted-color);
}

.project-card__badge {
  font-size: 11px;
}

.project-card__separator {
  background: rgba(255, 255, 255, 0.6);
}
</style>
