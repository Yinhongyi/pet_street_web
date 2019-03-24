/* eslint-disable */
export default {
  path: '/manage/ad',
  name: 'manage_ad',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_ad'),
  redirect: '/manage/ad/list',
  children: [
    {
      path: 'list',
      name: 'list',
      component: r =>  require.ensure([], () => r(require('./list')), 'ad-list'),
    },

  ]
};
