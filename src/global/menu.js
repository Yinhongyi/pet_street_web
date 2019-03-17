/*eslint-disable*/
const menuList = [
  {
    name: '商品管理',
    icon: '',
    path: '/manage/commodity',
    id: 1,
    children: [
      {
        name: '新增商品',
        icon: '',
        path: '/manage/commodity/add',
        id: 1
      },
      {
        name: '在线商品',
        icon: '',
        path: '/manage/commodity/online',
        id: 1
      },
      {
        name: '交易中',
        icon: '',
        path: '/manage/commodity/transaction',
        id: 1
      },
      {
        name: '已出售',
        icon: '',
        path: '/manage/commodity/sold',
        id: 1
      },
      {
        name: '已下架',
        icon: '',
        path: '/manage/commodity/down',
        id: 1
      },
    ]
  },
  {
    name: '订单管理',
    icon: '',
    path: '/manage/order',
    id: 1,
    children: [
      {
        name: '待付款',
        icon: '',
        path: '/manage/order/waiting_payment',
        id: 1
      },
      {
        name: '待发货',
        icon: '',
        path: '/manage/order/waiting_consignment',
        id: 1
      },
      {
        name: '已发货',
        icon: '',
        path: '/manage/order/done_consignment',
        id: 1
      },
      {
        name: '已完成',
        icon: '',
        path: '/manage/order/done',
        id: 1
      },
    ]
  }
]
// let menu = new Vue({
//   data(){
//     return {
//       list: [],
//       userData: {},
//     }
//   },
//   create(){
//     this.TOKEN = localStorage.getItem('TOKEN') || '';
//   },
// })
export {
  menuList
}
