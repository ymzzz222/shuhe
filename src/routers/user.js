export default [
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/user.vue'),
    redirect:"/user/fabu",
    children: [
      {
        path: '/user/fabu',
        name: 'userFabu',
        component: () => import('../views/user/fabu.vue'),
      },
      {
        path: '/user/shuhe',
        name: 'userShuhe',
        component: () => import('../views/user/shuhe.vue'),
      },
      {
        path: '/user/shouchang',
        name: 'userShouchang',
        component: () => import('../views/user/shouchang.vue'),
      },
      {
        path: '/user/guanzhu',
        name: 'userGuanzhu',
        component: () => import('../views/user/guanzhu.vue'),
      },
      {
        path: '/user/fensi',
        name: 'userFensi',
        component: () => import('../views/user/fensi.vue'),
      }
    ]
  }
]