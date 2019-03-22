/* eslint-disable */
export default {
  path: '/manage/funds',
  name: 'manage_funds',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_funds'),
  redirect: '/manage/funds/my',
  children: [
    {
      path: 'my',
      name: 'my',
      component: r =>  require.ensure([], () => r(require('./my/index')), 'my'),
    },
  ]
};
