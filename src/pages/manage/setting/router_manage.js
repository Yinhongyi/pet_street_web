/* eslint-disable */
export default {
  path: '/manage/setting',
  name: 'manage_setting',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_setting'),
  redirect: '/manage/setting/account-list',
  children: [
    {
      path: 'account-list',
      name: 'account-list',
      component: r =>  require.ensure([], () => r(require('./account/list')), 'setting-account-list'),
    },
    {
      path: 'authority-list',
      name: 'authority-list',
      component: r =>  require.ensure([], () => r(require('./authority/list')), 'setting-authority-list'),
    },
    {
      path: 'account',
      name: 'account',
      component: r =>  require.ensure([], () => r(require('./account/index')), 'setting-account'),
    },
    {
      path: 'authority',
      name: 'authority',
      component: r =>  require.ensure([], () => r(require('./authority/index')), 'setting-authority'),
    },
  ]
};
