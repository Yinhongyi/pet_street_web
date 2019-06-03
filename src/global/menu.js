/*eslint-disable*/
const menuList = [
  {
    name: '商品管理',
    icon: '',
    path: '/manage/commodity',
    id: 1,
    permission: ['2'],
    children: [
      {
        name: '新增商品',
        icon: '',
        path: '/manage/commodity/addOrEdit',
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
    permission: ['2'],
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
    permission: ['2'],
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
    name: '审核',
    icon: '',
    path: '/manage/review',
    id: 4,
    permission: ['4'],
    children: [
      {
        name: '未审核',
        icon: '',
        path: '/manage/review/not',
        id: 1,
        parent_id: 4
      },
      {
        name: '已审核',
        icon: '',
        path: '/manage/review/already',
        id: 2,
        parent_id: 4
      },
    ]
  },
  {
    name: '分类设置',
    icon: '',
    path: '/manage/classify',
    id: 5,
    permission: ['4'],
    children: [
      {
        name: '一级分类',
        icon: '',
        path: '/manage/classify/first_level',
        id: 1,
        parent_id: 5
      },
      {
        name: '二级分类',
        icon: '',
        path: '/manage/classify/second_level',
        id: 2,
        parent_id: 5
      },
    ]
  },
  {
    name: '文章审核',
    icon: '',
    path: '/manage/article/list',
    id: 8,
    permission: ['4'],
    children: []
  },
  {
    name: '广告管理',
    icon: '',
    path: '/manage/ad/list',
    id: 6,
    permission: ['4'],
    children: []
  },
  {
    name: 'APP版本设置',
    icon: '',
    path: '/manage/appVersion',
    id: 7,
    permission: ['4'],
    children: []
  },
/*
  {
    name: '设置',
    icon: '',
    path: '/manage/setting',
    id: 99,
    children: [
      {
        name: '账户列表',
        icon: '',
        path: '/manage/setting/account-list',
        id: 1,
        parent_id: 99
      },
      {
        name: '权限列表',
        icon: '',
        path: '/manage/setting/authority-list',
        id: 1,
        parent_id: 99
      },
    ]
  },
*/
]
export {
  menuList
}
