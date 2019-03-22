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
        id: 2,
        parent_id: 1
      },
      {
        name: '退回商品',
        icon: '',
        path: '/manage/commodity/return',
        id: 3,
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
  },
  {
    name: '资金管理',
    icon: '',
    path: '/manage/funds',
    id: 3,
    children: [
      {
        name: '我的资金',
        icon: '',
        path: '/manage/funds/my',
        id: 1,
        parent_id: 3
      },
    ]
  },
  {
    name: '设置',
    icon: '',
    path: '/manage/setting',
    id: 99,
    children: [
      {
        name: '账户权限',
        icon: '',
        path: '/manage/setting/account',
        id: 1,
        parent_id: 99
      },
    ]
  },
]
export {
  menuList
}
