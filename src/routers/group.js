export default [
  {
    path: '/group',
    name: 'group',
    component: () => import('../views/group/index.vue'),
  },
  {
    path: '/group_details',
    name: 'group_details',
    component: () => import('../views/group/details.vue'),
  }
]