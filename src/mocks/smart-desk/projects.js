/**
 * Mock API response for the Smart Desk project list.
 * Shape mirrors the expected back-end payload (snake_case);
 * the service layer maps it to the front-end model.
 *
 * Remove once `GET /smart-desk/projects` is available.
 */
export const projectsResponse = [
  {
    id: 1,
    title: 'اداری دفتر فرهنگیان یزد',
    color: null,
    image: null,
    total_progress: 0.3,
    my_progress: 0.45,
    last_completed_task_at: '2026-10-21T09:30:00Z',
    open_tasks_count: 4,
    completed_tasks_count: 2,
    total_tasks_count: 9,
  },
  {
    id: 2,
    title: 'تست طراحی',
    color: null,
    image: null,
    total_progress: 0.71,
    my_progress: 0.55,
    last_completed_task_at: '2026-09-20T12:00:00Z',
    open_tasks_count: 0,
    completed_tasks_count: 5,
    total_tasks_count: 7,
  },
]
