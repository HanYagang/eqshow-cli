# `@eqshow/packageManager`

> TODO: 依赖包管理器，通过 `execa` 工具库，在命令行动态添加依赖包。

## 使用方法

```
const PackageManager = require('@eqshow/packageManager');

const pm = new PackageManager({
  context: process.cwd()
})

pm.install()

```

该构造函数接收一个对象作为配置项。具体如下：

## 配置项

| 属性    | 说明                | 类型   |
| ------- | ------------------- | ------ |
| context | execa执行上下文环境 | String |

## 属性

| 属性    | 说明                            | 类型   |
| ------- | ------------------------------- | ------ |
| context | 当前的执行上下文环境            | String |
| bin     | 当前的包管理工具（yarn or npm） | String |

## 方法

| 方法       | 说明                         | 参数                                                         |
| ---------- | ---------------------------- | ------------------------------------------------------------ |
| add        | 添加依赖                     | 接收两个参数。第一个为依赖的名称，第二个参数为配置对象，其中 dev 代表是否为开发依赖，其默认为true。 |
| runCommand | 运行命令                     | 接收两个参数。第一个为要执行的command。第二个为命令参数所组成的数组。 |
| install    | 安装当前package.json中的依赖 | ——                                                           |

