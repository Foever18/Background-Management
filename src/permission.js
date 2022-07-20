// 路由守卫配置
import router from './router'
import store from './store'
router.beforeEach((to, from, next) => {
  const token = store.state.token
  if (token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})
