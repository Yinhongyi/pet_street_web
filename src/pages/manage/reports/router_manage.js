/* eslint-disable */
export default {
  path: '/manage/reports',
  name: 'manage_reports',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_reports'),
  redirect: '/manage/reports/reports_list',
  children: [
    {
      path: 'reports_list',
      name: 'reports_list',
      component: r =>  require.ensure([], () => r(require('./reports-list/list')), 'reports-list'),
    },
  ]
};
