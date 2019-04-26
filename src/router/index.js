/*eslint-disable*/
import Vue from 'vue'
import Router from 'vue-router'
import $http from '../global/$http'
import $store from '../store'

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
      if(localStorage.P_S_TOKEN_KEY) {
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
    $store.commit('changeLoading', true)
    if (localStorage.P_S_TOKEN_KEY) {
      // 已登录
      if($store.state.hasUpdateFeature&&$store.state.hasUpdateCharacteristic&&$store.state.hasUpdateShapes&&$store.state.hasUpdateGrade){
        $store.commit('changeLoading', false)
        next()
        return
      }
      let getFeaturesList = new Promise((resolve, reject)=>{
        $http.get('api/mgmt/public/dict/featuresType').then((res)=>{
          if(res.code === 1000){
            $store.commit('updateFeatureList', res.data.dictList)
            resolve()
          }
        })
      })
      let getCharacteristicList = new Promise((resolve, reject)=>{
        $http.get('api/mgmt/public/dict/traitType').then((res)=>{
          if(res.code === 1000){
            $store.commit('updateCharacteristicList', res.data.dictList)
            resolve()
          }
        })
      })
      let getShapes = new Promise((resolve, reject)=>{
        $http.get('api/mgmt/public/dict/classificShape').then((res)=>{
          if(res.code === 1000){
            $store.commit('updateShapesList', res.data.dictList)
            resolve()
          }
        })
      })
      let getGrade = new Promise((resolve, reject)=>{
        $http.get('api/mgmt/public/dict/petGrade').then((res)=>{
          if(res.code === 1000){
            $store.commit('updateGradeList', res.data.dictList)
            resolve()
          }
        })
      })
      Promise.all([getFeaturesList,getCharacteristicList,getShapes]).then(()=>{
        $store.commit('changeLoading', false)
        next();
      })
        .catch(()=>{
          $store.commit('changeLoading', false)

      })
    } else {
      // 未登录
      $store.commit('changeLoading', false)
      next({
        path: '/login'
      })
    }
  }
})

export default router

