/* eslint-disable */
export default {
  path: '/manage/order',
  name: 'manage_order',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_order'),
  redirect: '/manage/order/payment',
  children: [
    {
      path: 'waiting_payment',
      name: 'waiting_payment',
      component: r =>  require.ensure([], () => r(require('./payment/list')), 'add-commodity'),
    },
  ]
};
