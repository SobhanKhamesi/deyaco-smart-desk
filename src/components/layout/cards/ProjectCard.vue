<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
    <q-card class="project-card-main cursor-pointer" flat bordered>
        <div class="text-center q-mt-md">
          <q-avatar class="project-avatar" size="45px" round>
            <q-img v-if="project.image" :src="project.image"/>
            <span v-else>ای</span>
          </q-avatar>
        </div>
        <div class="text-center q-mt-md">
          {{ project.caption }}
        </div>
        <div class="q-mt-lg q-px-md" style="font-size: 12px;color:#c5c5c5;">
          <div>وضعیت کل پروژه : </div>
          <div>
            <q-linear-progress size="xl" :value="project.all_tasks_percent_value" color="primary">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" style="font-size: 11px" text-color="primary" :label="project.all_tasks_percent" />
              </div>
            </q-linear-progress>
          </div>
        </div>
        <div class="q-mt-sm q-px-md" style="font-size: 12px;color:#c5c5c5;">
          <div>وظایف من : </div>
          <div>
            <q-linear-progress size="xl" :value="project.user_tasks_percent_value" color="primary">
              <div class="absolute-full flex flex-center">
                <q-badge color="white" style="font-size: 11px" text-color="primary" :label="project.user_tasks_percent" />
              </div>
            </q-linear-progress>
          </div>
        </div>

        <q-separator color="grey-1" style="height: 1px" class="q-mt-xl full-width"/>

        <div class="q-mt-md q-px-md" style="font-size: 12px;color:#c5c5c5;">
          <span>آخرین وظیفه انجام شده : </span>
          <span class="text-green">{{ project.last_compelete_task_month}}</span>
        </div>

        <div class="q-my-sm q-px-md row" style="font-size: 12px;color:#c5c5c5;align-items: center;justify-content: space-between">

          <div>
            <q-badge v-if="project.open_task_count && project.open_task_count > 0" color="grey-1" text-color="grey-9" :label="project.open_task_count" />
          </div>

          <div>
            <span>وظایف انجام شده : </span>
            <span>{{ project.task_compelete_count }} از {{ project.all_tasks_count }}</span>
          </div>
        </div>
    </q-card>
</template>

<style scoped>

.project-card-main{
  width: 15rem;
  height: 20rem;
  background: var(--sidebar-bg);
  color: #ffffff;
  border: 1px solid #00bbff
}

.project-avatar {
  background: #888;
  color: #ffffff;
  border-radius: 11px !important;
}

</style>
