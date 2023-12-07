import { createRouter, createWebHistory } from 'vue-router'

import MainView from '@/views/MainView.vue'
import CommandView from '@/views/CommandView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '',
          name: 'overview',
          component: () => import('@/views/OverviewView.vue'),
        },
        {
          path: '/accounts',
          name: 'accounts',
          component: () => import('@/views/AccountListView.vue'),
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/ProfileView.vue'),
        }
      ]
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('@/views/CategoryListView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/command',
      name: 'command',
      component: CommandView,
      meta: {
        title: '语音记账'
      }
    }
  ]
})

const defaultTitle = 'AI记账'
router.beforeEach((to, from, next) => {
  // @ts-expect-error type is unknown
  window.document.title = to.meta.title ?? defaultTitle
  next()
})

export default router
