# `@eqshow/shared`

> TODO: 提供了常用的工具库及工具函数。

## 使用方法

```javascript
const shared = require('@eqshow/shared');

// TODO: DEMONSTRATE API
```

## 工具库

对外提供了常用的工具库。

```javascript
const {
  chalk,
  semver,
  slash
} = require('@eqshow/shared')
```

`chalk` 可以设置控制台打印日志的颜色。`semver` 是常见的版本号对比工具库。`slash` 可以处理一些地址路径。

## 工具函数

| 方法              | 介绍                                     | 参数                                                         |
| ----------------- | ---------------------------------------- | ------------------------------------------------------------ |
| hasYarn           | 本地是否安装了yarn                       | ——                                                           |
| executeCommand    | 动态执行command                          | 接收三个参数。第一个为要执行的command。第二个为commmand的参数组成的数组。第三个为当前执行环境。 |
| normalizeFilePath | 格式化路径，兼容处理win、macOS的路径地址 | 接收一个参数。为路径地址。                                   |
| isObject          | 判定是否为对象                           | 接收一个任意值。                                             |
| resolveModule     | 获取模块的绝对路径                       | 接收两个参数。第一个为模块名称。第二个为执行上下文。         |
| loadModule        | 加载执行一个模块的代码                   | 接收两个参数。第一个为要加载的模块名称。第二个为执行上下文。 |
