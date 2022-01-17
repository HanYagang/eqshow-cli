# `@eqshow/create`

> TODO: 为eqx-cli的create命令。提供了一个直接调用的方法，一个核心工具类。

## 使用方法

```
const create = require('@eqshow/create');
// actionParams 为 commanderJS 中action函数的所有参数组成的数组
create(actionParams)

// 或者
const { CreateCommand } = require('@eqshow/create')
const createInstance = new CreateCommand(actionParams)
createInstance.run()

// TODO: DEMONSTRATE API
```

## CreateCommand

为create命令的核心类。接收一个参数 `actionParams` 。此参数为 `commander.js` 的 `action` 命令函数的所有参数构成的数组。

### 属性

| 属性        | 说明                                  | 类型   |
| ----------- | ------------------------------------- | ------ |
| _argv       | commanderJs中create命令接收的所有参数 | Arrary |
| _cmd        | commanderJs中create命令本身           | Object |
| projectName | 要创建的项目名称                      | String |
| cliOptions  | 脚手架命令接收的option参数            | Object |
| context     | 新建项目的执行上下文（根据项目名称）  | String |
|             |                                       |        |
|             |                                       |        |

### 方法

| 方法     | 说明                 | 回调参数     |
| -------- | -------------------- | ------------ |
| init     | 实例初始化的核心方法 | actionParams |
| prepare  | 核心准备工作         |              |
| cleanDir | 清空目录的流程       |              |
|          |                      |              |

