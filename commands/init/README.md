# `@eqshow/init`

> TODO: 为eqx-cli的 `init` 命令。提供了一个直接调用的方法，一个核心构造函数。

## 使用方法

```javascript
const init = require('@eqshow/init')
// actionParams 为 commanderJS 中action函数的所有参数组成的数组
init(actionParams)

// 或者
const { InitCommand } = require('@eqshow/init')
return new InitCommand(actionParams)
```

## InitCommand

为 `init` 命令的核心构造函数。接收一个参数 `actionParams` 。此参数为 `commander.js` 的 `action` 命令函数的所有参数构成的数组。

### 属性

| 属性        | 说明                                  | 类型   |
| ----------- | ------------------------------------- | ------ |
| _argv       | commanderJs中 init 命令接收的所有参数 | Arrary |
| _cmd        | commanderJs中 init 命令本身           | Object |
| projectName | 要创建的模板项目名称                  | String |
| cliOptions  | 脚手架命令接收的options参数           | Object |

### 方法

| 方法           | 说明                 | 参数                                                         |
| -------------- | -------------------- | ------------------------------------------------------------ |
| init           | 实例初始化的核心方法 | actionParams                                                 |
| prepare        | 准备工作方法         | ——                                                           |
| getProjectInfo | 获取项目的基本信息   | ——                                                           |
| getTemplate    | 获取项目模板         | ——                                                           |
| templateRender | 动态渲染文件         | ——                                                           |
| exec           | 动态执行命令         | 接收三个参数。第一个为command。第二个为命令参数数组。第三个为配置项。 |

