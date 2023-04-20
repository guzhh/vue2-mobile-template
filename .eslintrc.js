module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
  },
  rules: {
    'max-len': 'off', // 此处为具体添加代码
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 允许修改函数的入参
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['config', 'app', 'state', 'row', 'vnode', 'ctx'],
      },
    ],
  },
};
