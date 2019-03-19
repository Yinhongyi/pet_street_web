// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $http from './global/$http'
// 引入自写公共组件
import '@/components/common'

// 按需引入elementUI
import { Button, Select, Option, Input, Pagination, Radio, RadioGroup, Checkbox, CheckboxButton, DatePicker, Upload, Dialog } from 'element-ui'

Vue.config.productionTip = false
Vue.prototype.$http = $http

// vue使用引入的elementUI部分组件
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Checkbox)
Vue.use(CheckboxButton)
Vue.use(DatePicker)
Vue.use(Upload)
Vue.use(Dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
