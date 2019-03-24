/* eslint-disable */
export default {
  path: '/manage/classify',
  name: 'manage_classify',
  component: r => require.ensure([], () => r(require('./index.vue')), 'manage_classify'),
  redirect: '/manage/classify/first_level',
  children: [
    {
      path: 'first_level',
      name: 'first_level',
      component: r =>  require.ensure([], () => r(require('./first_level/index')), 'classify-first'),
    },
    {
      path: 'second_level',
      name: 'second_level',
      component: r =>  require.ensure([], () => r(require('./second_level/index')), 'classify-second'),
    },
  ]
};
