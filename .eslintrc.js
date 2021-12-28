module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    // 结尾分号
    "prettier/prettier": [
      2,
      {
        // 解决win系统换行符报错问题
        endOfLine: "auto",
        semi: false,
        // 禁止末尾逗号
        trailingComma: "none"
      }
    ],
    "no-console": 0,
    "no-case-declarations": 0,
    "no-empty": 0,
    "no-var": 1,
    quotes: [2, "double", { avoidEscape: true, allowTemplateLiterals: false }],
    // 强制 getter 和 setter 在对象中成对出现
    "accessor-pairs": [
      2,
      { setWithoutGet: true, enforceForClassMembers: true }
    ],
    // 强制数组方法的回调函数中有 return 语句
    "array-callback-return": [
      2,
      {
        allowImplicit: false,
        checkForEach: false
      }
    ],
    // 强制在点号之前和之后一致的换行(点操作符和属性放在同一行)
    "dot-location": [2, "property"],
    // 强制尽可能地使用点号
    "dot-notation": [2, { allowKeywords: true }],
    // 要求使用 === 和 !==
    eqeqeq: [2, "always", { null: "ignore" }],
    // 强制数组方括号中使用一致的空格
    "array-bracket-spacing": [2, "never"],
    // 禁止或强制在代码块中开括号前和闭括号后有空格
    "block-spacing": [2, "always"],
    // 强制在代码块中使用一致的大括号风格
    "brace-style": [2, "1tbs", { allowSingleLine: true }],
    // 强制使用骆驼拼写法命名约定
    camelcase: [
      2,
      {
        allow: ["^UNSAFE_"],
        properties: "never",
        ignoreGlobals: true
      }
    ],
    // 要求或禁止类成员之间出现空行
    "lines-between-class-members": [
      2,
      "always",
      { exceptAfterSingleLine: true }
    ],
    // 要求构造函数首字母大写
    "new-cap": [2, { newIsCap: true, capIsNew: false, properties: true }],
    // 要求对象字面量简写语法
    "object-shorthand": [1, "properties"],
    // 强制 generator 函数中 * 号周围使用一致的空格
    "generator-star-spacing": [2, { before: true, after: true }]
  }
  // "no-async-promise-executor": 2,
}
