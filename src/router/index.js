// index.js 把准备好的路由组件注册到路由里

import Vue from 'vue'
import Router from 'vue-router'
import login from "./map/login"
import user from "./map/user"
import home from "./map/home"

Vue.use(Router);

let routes = [...login, ...user, ...home];

const router = new Router({
  mode: 'history',
  routes,
});


// 路由拦截器
router.beforeEach(async (to, from, next) => {
  console.log(to)
  if (to.matched.some(record => record.meta.auth) && to.meta.auth) { // 判断该路由是否需要登录权限
    let token = localStorage.getItem('token');

    if (token) { // 获取当前的 token 是否存在
      next()
    } else {
      // 不存在 token，需要重新认证
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  next();
});

export default router

