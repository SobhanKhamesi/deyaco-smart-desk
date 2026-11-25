<script setup>
import { computed, onMounted, ref } from 'vue'
import { createProject, fetchProjects } from '@/services/smart-desk/projectService.js'
import ProjectCard from '@/components/smart-desk/ProjectCard.vue'
import ProjectCreateCard from '@/components/smart-desk/ProjectCreateCard.vue'
import ProjectCreateDialog from '@/components/smart-desk/ProjectCreateDialog.vue'

const projects = ref([])
const isLoading = ref(false)
const searchQuery = ref('')

const isCreateDialogOpen = ref(false)
const isCreating = ref(false)

const filteredProjects = computed(() => {
  const query = searchQuery.value?.trim()
  if (!query) return projects.value
  return projects.value.filter((project) => project.title.includes(query))
})

async function loadProjects() {
  isLoading.value = true
  try {
    projects.value = await fetchProjects()
  } finally {
    isLoading.value = false
  }
}

async function handleCreateProject(payload) {
  isCreating.value = true
  try {
    const project = await createProject(payload)
    projects.value.push(project)
    isCreateDialogOpen.value = false
  } finally {
    isCreating.value = false
  }
}

onMounted(loadProjects)
</script>

<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-col-gutter-md">
      <div class="row items-center q-gutter-x-sm">
        <h2 class="page-title q-my-none">پروژه‌ها</h2>
        <q-btn
          outline
          rounded
          size="sm"
          color="primary"
          icon="eva-plus"
          label="ایجاد پروژه جدید"
          @click="isCreateDialogOpen = true"
        />
      </div>

      <q-input
        v-model="searchQuery"
        dense
        clearable
        debounce="300"
        color="primary"
        label="فیلتر عنوان پروژه"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div v-if="isLoading" class="flex flex-center q-mt-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else class="q-mt-lg row q-gutter-md">
      <project-card v-for="project in filteredProjects" :key="project.id" :project="project" />
      <project-create-card @click="isCreateDialogOpen = true" />
    </div>

    <project-create-dialog
      v-model="isCreateDialogOpen"
      :loading="isCreating"
      @submit="handleCreateProject"
    />
  </q-page>
</template>
