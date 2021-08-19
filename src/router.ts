import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import NProgress from "nprogress"

NProgress.configure({ showSpinner: false })

const router = createRouter({
      history: createWebHistory(),
      routes: [
            {
                  path: '/login',
                  name: 'login',
                  meta: {
                        title: 'Login - 登录'
                  },
                  component: () => import('@/views/login/login.vue')
            },
            {
                  path: '/',
                  name: 'layout',
                  meta: {
                        title: 'Layout - layout'
                  },
                  component: () => import('@/views/layout/layout.vue'),
                  redirect: "/home",
                  children: [
                        {
                              path: '/home',
                              name: 'home',
                              meta: {
                                    title: 'Home - 工作台'
                              },
                              component: () => import('@/views/home/home.vue')
                        },
                        {
                              path: '/ordersubmit',
                              name: 'orderSubmit',
                              meta: {
                                    title: 'Order - 工单'
                              },
                        },
                        {
                              path: '/query',
                              name: 'query',
                              meta: {
                                    title: 'Query - 查询'
                              },
                        },
                        {
                              path: '/audit',
                              name: 'audit',
                              meta: {
                                    title: '审核'
                              },
                              children: [
                                    {
                                          path: '/audit',
                                          name: 'audit',
                                          meta: {
                                                title: '审核'
                                          },
                                    }
                              ]
                        },
                  ]
            }
      ] as Array<RouteRecordRaw>
})


router.beforeEach((to, from, next) => {
      NProgress.start()
      // if (!sessionStorage.getItem('user') && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
      //       next(false);
      //       router.replace({ name: 'login' }).then(() => {
      //       }).finally(() => NProgress.NProgress.done())
      // } else {
      next()
      // }

})

router.afterEach(() => {
      NProgress.done()
})

export default router