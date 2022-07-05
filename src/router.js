import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/HomeView.vue'

Vue.use(VueRouter)

const routerFactory = function () {
  const routes = [
    {
      path: '/',
      component: Home
    },
    ,
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue')
  }
  ]

  const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes
  })

  return router
}


export default routerFactory