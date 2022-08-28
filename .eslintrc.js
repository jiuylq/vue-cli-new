module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures:{
      // 支持装饰器
      legacyDecorators: true
    }
  },
  rules: {
    'no-console': 'off',// process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': 'off',// process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new': 'off',
    'prefer-const': 'off',
    'curly': [2, 'multi-line'], //if等，单行可以不适用{}，多行必须使用{}
    'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
    'no-undef': 2, //不能有未定义的变量
    // 强制使用一致的反勾号、双引号或单引号
    'quotes': 'off',
    // "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }],
    // 'semi': ["never", { "omitLastInOneLineBlock": true}],  //不允许分号作为语句的结尾（除了消除歧义声明开始)/使用;结尾
    'semi': 0, // 0 = off, 1 = warn, 2 = error
    'use-isnan': 2, //禁止比较时使用NaN，只能用isNaN()
    'generator-star-spacing': 'off', // 强制 generator 函数中 * 号周围使用一致的空格
    'space-before-function-paren': 'off', // 强制在 function的左括号之前使用一致的空格
    'no-new': 'off', // 禁止使用 new 以避免产生副作用
    'no-var': 'off',
    'no-useless-return': 'off',
    'no-unreachable': 'off'
    // 'keyword-spacing': ["error", { "overrides": {
    //   "if": { "after": false },
    //   "for": { "after": false },
    //   "while": { "after": false }
    // } }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
