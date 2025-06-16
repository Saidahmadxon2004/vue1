import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import Layout from '../components/Layout.vue'
import Kirim from '@/pages/Kirim.vue'
import Chiqim from '@/pages/Chiqim.vue'
import Tolov from '@/pages/Tolov.vue'
import addTolov from '@/pages/addTolov.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard
      },
      {
         path: '/kirim',
        name: 'Kirim',
        component: Kirim

      },{
         path: '/chiqim',
        name: 'Chiqim',
        component: Chiqim

      },{
         path: '/tolov',
        name: 'Tolov',
        component: Tolov,
        props: route => ({
    tolov: route.query.tolov ? JSON.parse(route.query.tolov) : null
  })

      }
    ]
  },{
    path: '/addTolov',
    name: 'AddTolov',
    component: addTolov
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
