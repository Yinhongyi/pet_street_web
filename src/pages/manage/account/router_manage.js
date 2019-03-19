/* eslint-disable */
export default {
  path: '/manage/account',
  name: 'manage_account',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_account'),
  redirect: '/manage/account/authority',
  children: [
    {
      path: 'authority',
      name: 'authority',
      component: r =>  require.ensure([], () => r(require('./authority/index')), 'account-authority'),
    },
  ]
};
