/*eslint-disable*/
import Vue from 'vue'

let login_message = new Vue({
  data(){
    return {
      TOKEN: '',
      userData: {},
    }
  },
  create(){
    this.TOKEN = localStorage.getItem('TOKEN') || '';
  },
})
export {
  login_message
}
