# `@eqshow/command`

> TODO: 创建command的基础构造函数。

## Usage

```
const Command = require('@eqshow/command');

class MyCommand extend Command {}

```

只处理了接收的第一个参数。此参数为action回调函数的所有参数组成的数组。

## 属性

| 属性        | 说明                                  | 类型   |
| ----------- | ------------------------------------- | ------ |
| _argv       | commanderJs中任意command接收的所有参数 | Arrary |
| _cmd        | commanderJs中当前command本身           | Object |
|             |                                      |        |

## 方法

| 方法     | 说明                 | 回调参数     |
| -------- | -------------------- | ------------ |
| init     | 实例初始化的核心方法 | actionParams |
|          |                      |              |

通过重写 `init` 函数来达到自定义command初始化的目的。
