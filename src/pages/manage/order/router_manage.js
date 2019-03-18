/* eslint-disable */
export default {
  path: '/manage/order',
  name: 'manage_order',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_order'),
  redirect: '/manage/order/order_list',
  children: [
    {
      path: 'order_list',
      name: 'order_list',
      component: r =>  require.ensure([], () => r(require('./order-list/list')), 'order-list'),
    },
  ]
};
