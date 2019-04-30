/* eslint-disable */
export default {
  path: '/manage/commodity',
  name: 'manage_commodity',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_commodity'),
  redirect: '/manage/commodity/online',
  children: [
    {
      path: 'addOrEdit',
      name: 'addOrEdit',
      component: r =>  require.ensure([], () => r(require('./add/add-commodity')), 'add-commodity'),
    },
    {
      path: 'online',
      name: 'online',
      component: r =>  require.ensure([], () => r(require('./online/online-commodity')), 'online-commodity'),
    },
    {
      path: 'return',
      name: 'return',
      component: r =>  require.ensure([], () => r(require('./return/return-commodity')), 'return-commodity'),
    },
  ]
};
