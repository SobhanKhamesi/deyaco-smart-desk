/**
 * Route meta (merged from parent to child):
 *   title        — shown in the header and the browser tab.
 *                  Routes without a title fall back to the company / app name.
 *   requiresAuth — redirect to the login page when there is no session.
 *   guestOnly    — redirect signed-in users away (e.g. the login page).
 */
const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    // meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'smart-desk',
        component: () => import('@/pages/smart-desk/SmartDeskPage.vue'),
      },
    ],
  },

  {
    path: '/login',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: { guestOnly: true },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { title: 'ورود' },
      },
    ],
  },

  // Must stay last
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'صفحه یافت نشد' },
  },
]

export default routes
