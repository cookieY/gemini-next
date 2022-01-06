import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import NProgress from "nprogress"
import { store } from "./store"

NProgress.configure({ showSpinner: false })

const router = createRouter({
      history: createWebHashHistory(),
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
                                                title: 'Order - 工单申请列表'
                                          },
                                          component: () => import('@/views/apply/apply.vue'),
                                    },
                                    {
                                          path: '/apply/order',
                                          name: 'apply/order',
                                          meta: {
                                                title: 'Order - 工单填写'
                                          },
                                          component: () => import('@/views/apply/order.vue'),
                                    },
                                    {
                                          path: '/apply/query',
                                          name: 'apply/query',
                                          meta: {
                                                title: 'Query - 查询'
                                          },
                                          component: () => import('@/views/query/query.vue'),
                                    }
                              ]
                        },
                        {
                              path: '/server',
                              name: 'server',
                              component: () => import('@/views/common/subLayout.vue'),
                              children: [
                                    {
                                          path: '/server/order/audit',
                                          meta: {
                                                title: '工单审核'
                                          },
                                          component: () => import('@/views/common/auditLayout.vue'),
                                    },
                                    {
                                          path: '/server/order/:tp/list',
                                          meta: {
                                                title: '工单列表'
                                          },
                                          component: () => import('@/views/server/order/list.vue'),
                                    },
                                    {
                                          path: '/server/order/:tp/profile',
                                          meta: {
                                                title: 'Order - 工单详情'
                                          },
                                          component: () => import('@/components/orderProfile/orderProfile.vue'),
                                    }
                              ]
                        },
                        {
                              path: '/manager',
                              name: 'manager',
                              component: () => import('@/views/common/subLayout.vue'),
                              redirect: "/manager/user",
                              children: [
                                    {
                                          path: '/manager/user',
                                          name: 'manager/user',
                                          meta: {
                                                title: 'User - 用户'
                                          },
                                          component: () => import('@/views/manager/user/user.vue'),
                                    },
                                    {
                                          path: '/manager/db',
                                          name: 'manager/db',
                                          meta: {
                                                title: 'DB - 数据源'
                                          },
                                          component: () => import('@/views/manager/db/db.vue'),
                                    },
                                    {
                                          path: '/manager/flow',
                                          name: 'manager/flow',
                                          meta: {
                                                title: 'Flow - 流程'
                                          },
                                          component: () => import('@/views/manager/flow/flow.vue'),
                                    },
                                    {
                                          path: '/manager/policy',
                                          name: 'manager/policy',
                                          meta: {
                                                title: 'Policy - 权限组'
                                          },
                                          component: () => import('@/views/manager/policy/policy.vue'),
                                    },
                                    {
                                          path: '/manager/rules',
                                          name: 'manager/rules',
                                          meta: {
                                                title: 'Rules - 审核规则'
                                          },
                                          component: () => import('@/views/manager/rules/rules.vue'),
                                    },
                                    {
                                          path: '/manager/autotask',
                                          name: 'manager/autotask',
                                          meta: {
                                                title: 'AutoTask - 自动化任务'
                                          },
                                          component: () => import('@/views/manager/autotask/autotask.vue'),
                                    },
                                    {
                                          path: '/manager/setting',
                                          name: 'manager/setting',
                                          meta: {
                                                title: 'Setting - 设置'
                                          },
                                          component: () => import('@/views/manager/setting/setting.vue'),
                                    }
                              ]
                        }
                  ]
            }
      ] as Array<RouteRecordRaw>
})


router.beforeEach((to, from, next) => {
      NProgress.start()
      if (store.state.user.account.token === '' && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
            next(false);
            router.replace({ name: 'login' }).then(() => {
            }).finally(() => NProgress.done())
      } else {
            next()
      }

})

router.afterEach(() => {
      NProgress.done()
})

export default router