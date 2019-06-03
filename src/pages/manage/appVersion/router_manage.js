/* eslint-disable */
export default {
  path: '/manage/appVersion',
  name: 'manage_appVersion',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_appVersion'),
  children: []
};
