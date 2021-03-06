import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/view/:title',
    name: 'View',
    component: () => import('@/views/View.vue')
  },
  {
    path: '/read/:title/:chapter',
    name: 'Read',
    component: () => import('@/views/Read.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/Search.vue')
  },
  {
    path: '/abount',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
