/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import {login_message} from '../global/login_message'

Vue.use(Router)

const routersContextM = require.context('@/pages/manage', true, /router_manage\.js$/);
const routersArrayM = routersContextM.keys().map(key => routersContextM(key).default);

const routerContextL = require.context('@/pages/account', true, /router_login\.js$/);
const routersArrayL = routerContextL.keys().map(key => routerContextL(key).default);


const routers = [
  {
    path: '/',
    name: 'web',
    component: r => require.ensure([], () => r(require('@/components/layout/layout.vue')), 'layout'),
    redirect: '/manage'
  },
  {
    path: '/manage',
    name: 'manage',
    component: r => require.ensure([], () => r(require('@/components/layout/layout-manage.vue')), 'layout_manage'),
    redirect: to => {
      if(login_message.TOKEN || localStorage.TOKEN) {
        return '/manage/commodity'
      }else{
        return '/login'
      }
    },
    children: routersArrayM,
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isLoginPage: true
    },
    component: r => require.ensure([], () => r(require('@/pages/account/login.vue')), 'login'),
  }
]

const router = new Router({
  base: '/',
  routes: routers
});

router.beforeEach((to, from, next) => {
  /*登录检查*/
  if (to.matched.some(res => res.meta.isLoginPage)) {
    // 当前已在登录页面
    next()
  } else {
    if (login_message.TOKEN || localStorage.TOKEN) {
      // 已登录
      next();
    } else {
      // 未登录
      next({
        path: '/login'
      })
    }
  }
})

export default router

