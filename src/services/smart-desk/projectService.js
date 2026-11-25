/**
 * Smart Desk project API.
 *
 * Components never talk to axios or mock data directly — they call these
 * functions. Switching from mocks to the real back-end only touches this file.
 */

// import { api } from '@/boot/axios'
import { projectsResponse } from '@/mocks/smart-desk/projects.js'

/**
 * @typedef {object} Project
 * @property {number} id
 * @property {string} title
 * @property {string|null} color            Quasar colour name, e.g. "teal"
 * @property {string|null} image
 * @property {number} totalProgress         0..1
 * @property {number} myProgress            0..1
 * @property {string|null} lastCompletedTaskAt ISO date
 * @property {number} openTasksCount
 * @property {number} completedTasksCount
 * @property {number} totalTasksCount
 */

/** @returns {Project} */
function mapProject(raw) {
  return {
    id: raw.id,
    title: raw.title,
    color: raw.color ?? null,
    image: raw.image ?? null,
    totalProgress: Number(raw.total_progress) || 0,
    myProgress: Number(raw.my_progress) || 0,
    lastCompletedTaskAt: raw.last_completed_task_at ?? null,
    openTasksCount: raw.open_tasks_count ?? 0,
    completedTasksCount: raw.completed_tasks_count ?? 0,
    totalTasksCount: raw.total_tasks_count ?? 0,
  }
}

/** @returns {Promise<Project[]>} */
export async function fetchProjects() {
  // TODO(api): const { data } = await api.get('smart-desk/projects')
  const data = projectsResponse
  return data.map(mapProject)
}

/**
 * @param {{ title: string, color: string|null, memberIds: number[] }} payload
 * @returns {Promise<Project>}
 */
export async function createProject(payload) {
  // TODO(api): const { data } = await api.post('smart-desk/projects', { title, color, member_ids })
  const data = {
    id: Date.now(),
    title: payload.title,
    color: payload.color,
    total_progress: 0,
    my_progress: 0,
  }
  return mapProject(data)
}
