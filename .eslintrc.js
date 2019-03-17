module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['prettier', 'prettier/vue', 'plugin:vue/strongly-recommended'],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'error',
    //强制使用单引号
    quotes: ['error', 'single'],
    //强制使用分号结尾
    semi: ['error', 'always']
  }
};
