import { createRouter, createWebHistory } from 'vue-router'

import PublicLayout from '@/views/public/_PublicLayout.vue'
import AppLayout from '@/views/app/_AppLayout.vue'
import AuthLayout from '@/views/auth/_AuthLayout.vue'
import { useAuthStore } from '@/stores/auth-store'

function RouterFactory(pinia) {
  function removeQueryParams(to) {
    if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash }
  }

  function removeHash(to) {
    if (to.hash) return { path: to.path, query: to.query, hash: '' }
  }

  const auth = useAuthStore(pinia)

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      // PUBLIC
      {
        path: '/',
        component: PublicLayout,
        children: [
          {
            path: '',
            name: 'home',
            component: () => import('@/views/public/HomeView.vue'),
            meta: { title: 'Início' }
          }
        ]
      },
      // APP
      {
        path: '/app',
        component: AppLayout,
        children: [
          {
            path: '',
            name: 'app',
            component: () => import('@/views/app/AppView.vue'),
            meta: {
              requiresAuthentication: true,
              title: 'App'
            }
          }
        ]
      },
      // AUTH routes
      {
        path: '/auth',
        redirect: '/auth/login',
        component: AuthLayout,
        children: [
          {
            path: 'login',
            name: 'login',
            component: () => import('@/views/auth/LoginView.vue'),
            meta: { title: 'Login' }
          }
        ]
      },
      // Catch All
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/shared/ErrorView.vue'),
        meta: { title: 'Erro' }
      }
    ]
  })

  // eslint-disable-next-line no-unused-vars
  router.beforeEach(async (to, from) => {
    const appAlias = import.meta.env.VITE_APP_ALIAS || 'Alias'
    document.title = to.meta.title ? `${appAlias} | ${to.meta.title}` : `${appAlias} | App`

    if (to.meta.requiresAuthentication && !auth.isAuthenticated) {
      return { path: '/auth', query: { returnUrl: to.fullPath } }
    } else {
      return true
    }
  })

  return router
}

export default RouterFactory
