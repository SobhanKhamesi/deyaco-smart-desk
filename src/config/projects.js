/**
 * Side drawer navigation tree.
 *
 * Shape of an item:
 * {
 *   id: string            unique key, also used for :key in v-for
 *   label: string         Persian label shown in the drawer
 *   icon: string          Quasar icon name (bootstrap-icons, prefixed "bi-")
 *   to: string            route path — only for leaf items (no "children")
 *   children: Item[]      present (even if empty) => rendered as an
 *                         expandable group instead of a direct link
 * }
 *
 * This only reproduces the structure/labels visible in the screenshot.
 * Groups whose sub-items weren't visible are left with an empty
 * `children` array — fill them in as you build out each section.
 */
export const projects = [
  {
    caption: 'اداری دفتر فرهنگیان یزد',
    all_tasks_percent_value: '0.3',
    all_tasks_percent: '30%',
    user_tasks_percent_value: '0.45',
    user_tasks_percent: '45%',
    last_compelete_task_month: '1 ماه پیش',
    open_task_count: 4,
    task_compelete_count: 2,
    all_tasks_count: 9,
  },

  {
    caption: 'تست طراحی',
    all_tasks_percent_value: '0.71',
    all_tasks_percent: '71%',
    user_tasks_percent_value: '0.55',
    user_tasks_percent: '55%',
    last_compelete_task_month: '2 ماه پیش',
    task_compelete_count: 0,
    all_tasks_count: 0,
  },


]
