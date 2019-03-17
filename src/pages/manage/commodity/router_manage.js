/* eslint-disable */
export default {
  path: '/manage/commodity',
  name: 'manage_commodity',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_commodity'),
  redirect: '/manage/commodity/add',
  children: [
    {
      path: 'add',
      name: 'add',
      component: r =>  require.ensure([], () => r(require('./add/add-commodity')), 'add-commodity'),
    },
  ]
};
