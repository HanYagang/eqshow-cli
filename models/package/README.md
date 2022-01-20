# `@eqshow/package`

> TODO: 定义了任意安装包的基础信息。

## Usage

```
const Package = require('@eqshow/package')

// 创建pacakge信息
const pkg = new Package({
  name: pkgName,
  version: pkgVersion,
  targetPath,
  cache
})

```

此构造函数接收一个对象作为配置项。配置项主要接收4个属性。

| 配置项属性 |          说明                | 类型 |
|:----|:----------------------------|:-----:|
| name | 依赖包的名称 | String |
| version | 依赖包的版本 | String |
| targetPath | 指定要使用的依赖包的绝对路径 | String |
| cache | 是否启用缓存模式 | Boolean |

## 属性

| 属性        | 说明                               | 类型    | 默认值 |
| ----------- | ---------------------------------- | ------- | ------ |
| storagePath | 依赖包缓存路径，只在缓存模式下可用 | String  | null   |
| name        | 依赖包的名称                       | String  |        |
| version     | 依赖包的版本                       | String  |        |
| targetPath  | 指定要使用的依赖包的绝对路径       | String  |        |
| cache       | 是否启用缓存模式                   | Boolean |        |

## 方法

| 方法            | 说明                  | 参数 |
| --------------- | --------------------- | ---- |
| exists          | 判断缓存的pkg是否存在 | ——   |
| install         | 安装依赖包            | ——   |
| update          | 检查并更新依赖包      | ——   |
| getRootFilePath | 获取入口文件路径      | ——   |
