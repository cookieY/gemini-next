import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import NProgress from "nprogress"
import '@/style/theme.less'

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
                              path: '/apply',
                              name: 'apply',
                              meta: {
                                    title: 'Order - 工单'
                              },
                              redirect: "/apply/list",
                              component: () => import('@/views/common/subLayout.vue'),
                              children: [
                                    {
                                          path: '/apply/list',
                                          name: 'apply/list',
                                          meta: {
                                                title: 'Order - 工单申请'
                                          },
                                          component: () => import('@/views/apply/apply.vue'),
                                    },
                                    {
                                          path: '/apply/order',
                                          name: 'apply/order',
                                          meta: {
                                                title: 'Order - 工单申请'
                                          },
                                          component: () => import('@/views/apply/order.vue'),
                                    },
                                    {
                                          path: '/apply/order/profile',
                                          name: 'apply/order/profile',
                                          meta: {
                                                title: 'Order - 工单申请'
                                          },
                                          component: () => import('@/components/orderProfile/orderProfile.vue'),
                                    }
                              ]
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
                              component: () => import('@/views/common/subLayout.vue'),
                              redirect: "/audit/order/list",
                              children: [
                                    {
                                          path: '/audit/order/list',
                                          name: 'audit',
                                          meta: {
                                                title: '审核'
                                          },
                                          component: () => import('@/views/audit/order.vue'),
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