# `@eqshow/add`

> TODO: 为eqx-cli的 `add` 命令。提供了一个直接调用的方法，一个核心构造函数。

## 使用方法

```javascript
const add = require('@eqshow/add')
// actionParams 为 commanderJS 中action函数的所有参数组成的数组
add(actionParams)

// 或者
const { AddCommand } = require('@eqshow/create')
return new AddCommand(actionParams)
```

## AddCommand

为 `add` 命令的核心构造函数。接收一个参数 `actionParams` 。此参数为 `commander.js` 的 `action` 命令函数的所有参数构成的数组。

### 属性

| 属性          | 说明                                  | 类型   |
| ------------- | ------------------------------------- | ------ |
| _argv         | commanderJs中 add 命令接收的所有参数 | Arrary |
| _cmd          | commanderJs中 add 命令本身           | Object |
| pluginToAdd   | 要添加的参数名称（有可能包含版本号）  | String |
| pluginOptions | 脚手架命令接收的options参数           | Object |
| context       | 新建项目的执行上下文（根据项目名称）  | String |
| pluginName    | 要添加的插件的名称                    | String |
| pluginVersion | 要添加的插件的版本                    | String |

### 方法

| 方法          | 说明                   | 参数         |
| ------------- | ---------------------- | ------------ |
| init          | 实例初始化的核心方法   | actionParams |
| parsingPlugin | 解析插件的名称和版本号 | ——           |

