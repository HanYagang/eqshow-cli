# `@eqshow/exec`

> TODO: 动态加载command

## 使用方法

```
const exec = require('@eqshow/exec');

program
  .action(exec)
```

作为action的回调函数传入，会根据命令解析出对应的包，然后去下载（如果本地没有缓存的话）进而去执行。
