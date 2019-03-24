/* eslint-disable */
export default {
  path: '/manage/review',
  name: 'manage_review',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_review'),
  redirect: '/manage/review/not',
  children: [
    {
      path: 'not',
      name: 'not',
      component: r =>  require.ensure([], () => r(require('./not/index')), 'review-not'),
    },
    {
      path: 'already',
      name: 'already',
      component: r =>  require.ensure([], () => r(require('./already/index')), 'review-already'),
    },
  ]
};
