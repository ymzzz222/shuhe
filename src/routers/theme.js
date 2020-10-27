export default [
  {
    path: '/theme',
    name: 'theme',
    component: () => import('../views/theme/index.vue'),
  },
  {
    path: '/theme_details',
    name: 'theme_details',
    component: () => import('../views/theme/details.vue'),
  }
]