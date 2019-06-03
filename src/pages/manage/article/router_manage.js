/* eslint-disable */
export default {
  path: '/manage/article',
  name: 'manage_article',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_article'),
  redirect: '/manage/article/list',
  children: [
    {
      path: 'list',
      name: 'list',
      component: r =>  require.ensure([], () => r(require('./list')), 'article-list'),
    },
  ]
};
