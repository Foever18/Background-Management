import Vue from 'vue'
import VueRouter from 'vue-router'

const Welcome = () => import('@/views/Home/Welcome.vue')

Vue.use(VueRouter)

const routes = [

  {
    path: '/login', component: () => import('@/views/Login')
  },

  {
    path: '/',
    component: () => import('@/views/Home'),
    redirect: '/Welcome',
    children: [
      {
        path: 'Welcome',
        component: Welcome
      },
      {
        path: 'user',
        component: () => import('@/views/User'),
        meta: { title: '用户列表', parentTitle: '用户管理' }
      },
      // 权限管理
      {
        path: 'roles',
        component: () => import('@/views/Roles'),
        meta: { title: '角色列表', parentTitle: '权限管理' }
      },
      {
        path: 'permission',
        component: () => import('@/views/PermissionList'),
        meta: { title: '权限列表', parentTitle: '权限管理' }
      },
      // 商品管理
      {
        path: 'goods',
        component: () => import('@/views/goods'),
        meta: { title: '商品列表', parentTitle: '商品管理' }
      },
      {
        path: 'params',
        component: () => import('@/views/params'),
        meta: { title: '分类参数', parentTitle: '商品管理' }
      },
      {
        path: 'categories',
        component: () => import('@/views/categories'),
        meta: { title: '商品分类', parentTitle: '商品管理' }
      },
      {
        path: 'addGoods',
        component: () => import('@/views/goods/addgoods.vue'),
        meta: { title: '添加商品', parentTitle: '商品管理' }
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
