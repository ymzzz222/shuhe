export default [
  {
    path: '/cardlist',
    name: 'cardlist',
    component: () => import('../views/cardlist/index.vue'),
  },
  {
    path: '/cardlist_details',
    name: 'cardlist_details',
    component: () => import('../views/cardlist/details.vue'),
  }
]