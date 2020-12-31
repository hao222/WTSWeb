// index.js 把准备好的路由组件注册到路由里

import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
