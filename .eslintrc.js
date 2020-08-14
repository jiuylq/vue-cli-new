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
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-new': 'off',
    'prefer-const': 'off',
    // 强制数组方括号中使用一致的空格
    // "array-bracket-spacing": ["error", "never"],
    // 强制箭头函数的箭头前后使用一致的空格
    // "arrow-spacing": ["error", { "before": true, "after": true }],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    // "block-spacing": ["error", "always"],
    'curly': [2, 'multi-line'], //if等，单行可以不适用{}，多行必须使用{}
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": 'off',
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    "no-unreachable": 'off',
    // 强制尽可能地使用点号
    "dot-notation": 'off',
    // 要求或禁止使用分号代替 ASI
    "semi": 'off',
    // 强制使用一致的反勾号、双引号或单引号
    "quotes": 'off',// ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": false }],
    // 强制在代码块中使用一致的大括号风格
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    // 强制使用骆驼拼写法命名约定
    "camelcase": ["error", { "properties": "never" }],
    // 要求或禁止末尾逗号
    "comma-dangle": 'off',
    // 强制在逗号前后使用一致的空格
    "comma-spacing": ["error", { "before": false, "after": true }],
    // 强制使用一致的逗号风格
    "comma-style": ["error", "last"],
    // 强制在计算的属性的方括号中使用一致的空格
    "computed-property-spacing": ["error", "never"],
    // 要求在构造函数中有 super() 的调用
    // "constructor-super": "error",
    // 强制所有控制语句使用一致的括号风格
    "curly": ["error", "multi-line"],
    // 强制在点号之前和之后一致的换行
    // "dot-location": ["error", "property"],
    // 强制尽可能地使用点号
    // "dot-notation": ["error", { "allowKeywords": true }],
    // 要求或禁止文件末尾存在空行
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
