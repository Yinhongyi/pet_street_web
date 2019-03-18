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
        id: 1,
        parent_id: 1
      },
      {
        name: '在线商品',
        icon: '',
        path: '/manage/commodity/online',
        id: 1,
        parent_id: 1
      },
      {
        name: '退回商品',
        icon: '',
        path: '/manage/commodity/return',
        id: 1,
        parent_id: 1
      },
    ]
  },
  {
    name: '订单管理',
    icon: '',
    path: '/manage/order',
    id: 2,
    children: [
      {
        name: '列表',
        icon: '',
        path: '/manage/order/order_list',
        id: 1,
        parent_id: 2
      },
    ]
  }
]
export {
  menuList
}
