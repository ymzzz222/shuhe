export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/home.vue'),
  },
  {
    path: '/home_details',
    name: 'home_details',
    component: () => import('../views/home/details.vue'),
  }
]