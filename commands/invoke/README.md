# `@eqshow/invoke`

> TODO: 为eqx-cli的 `invoke` 命令。提供了一个直接调用的方法，一个核心构造函数。

## 使用方法

```javascript
const invoke = require('@eqshow/invoke')
// actionParams 为 commanderJS 中action函数的所有参数组成的数组
invoke(actionParams)

// 或者
const { InvokeCommand } = require('@eqshow/invoke')
return new InvokeCommand(actionParams)
```

## InvokeCommand

为 `invoke` 命令的核心构造函数。接收一个参数 `actionParams` 。此参数为 `commander.js` 的 `action` 命令函数的所有参数构成的数组。

### 属性

| 属性          | 说明                                  | 类型   |
| ------------- | ------------------------------------- | ------ |
| _argv         | commanderJs中 invoke 命令接收的所有参数 | Arrary |
| _cmd          | commanderJs中 invoke 命令本身           | Object |
| pluginName    | 要调用的插件的名称                    | String |
| pluginOptions | 脚手架接收的参数                      | Object |

### 方法

| 方法         | 说明                    | 参数                                                         |
| ------------ | ----------------------- | ------------------------------------------------------------ |
| init         | 实例初始化的核心方法    | actionParams                                                 |
| run          | 运行插件                | 接收一个参数，为当前执行上线文。默认为process.cwd()          |
| runGenerator | 调用插件的generator模块 | 接收两个个参数。第一个为当前执行上线文，默认为process.cwd()。第二个为插件信息对象。 |

