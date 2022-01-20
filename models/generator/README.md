# `@eqshow/generator`

> TODO: Generator构造函数。

## 使用方法

```javascript
const Generator = require('@eqshow/generator');

const generator = new Generator(this.context, {
  plugins
})

// TODO: DEMONSTRATE API
```

接收两个参数。第一个参数为当前执行上下文。第二个参数为一个配置对象。

## 参数配置对象

| 属性    | 说明                                                         | 类型  |
| ------- | ------------------------------------------------------------ | ----- |
| plugins | 要执行generator的插件的数组。id为插件名称，apply为要执行的generator文件，options为插件的配置参数对象。 | Array |

## 属性

| 属性      | 说明                       | 类型   |
| --------- | -------------------------- | ------ |
| context   | 执行上下文                 | String |
| plugins   | 同参数配置对象             | Array  |
| callbacks | 收集apply中的api提供的方法 | Array  |

## 方法

| 方法           | 说明                    | 参数 |
| -------------- | ----------------------- | ---- |
| initPlugins    | 执行插件的genertor模块  | ——   |
| flushCallbacks | 遍历调用api收集的方法   | ——   |
| generate       | 执行插件的generator流程 | ——   |

## GeneratorAPI

对外部插件机制提供了一些回调方法。

## 属性

| 属性      | 说明                    | 类型              |
| --------- | ----------------------- | ----------------- |
| id        | 插件名称                | String            |
| generator | 当前的Generator实例对象 | Generator实例对象 |
| options   | 当前command的配置参数   | Object            |
| baseDir   | 执行上下文              | String            |

## 方法

| 方法             | 说明                                        | 参数                           |
| ---------------- | ------------------------------------------- | ------------------------------ |
| _injectCallBacks | 私有方法，收集插件中调用api的函数           | 一个参数，接收回调函数。       |
| render           | render方法，可以写入一些文件，支持ejs渲染。 | 接收一个参数。为一个相对路径。 |

