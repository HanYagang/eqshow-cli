# `@eqshow/get-pkg-info`

> TODO: 查询npm包的信息。

## 使用说明

```javascript
const getPkgInfoUtils = require('@eqshow/get-pkg-info');

// TODO: DEMONSTRATE API
```

### getPkgInfo

获取包相关信息。

```javascript
const { getPkgInfo } = require('@eqshow/get-pkg-info');
getPkgInfo(packageName, registry)
```

接收两个参数。第一个参数为npm包的名称。第二个参数为使用的源地址，默认不写使用npm源。返回一个对象。

### getDefaultRegistry

获取默认registry。

```javascript
const { getDefaultRegistry } = require('@eqshow/get-pkg-info');
getDefaultRegistry(false)
```

接收一个boolean参数，默认为false。当为 true 时，返回的是npm 源地址。当为 false 时，返回的是 taobao 源地址。

### getPkgVersions

获取包的所有版本。

```javascript
const { getPkgVersions } = require('@eqshow/get-pkg-info');
getPkgVersions(pkgName, registry)
```

接收两个参数。第一个参数为npm包的名称。第二个参数为使用的源地址，默认使用npm源。返回一个数组。

### getPkgSemverVersions

获取当前主版本号下，大于当前版本的所有版本。

```javascript
const { getPkgSemverVersions } = require('@eqshow/get-pkg-info');
getPkgSemverVersions(pkgName, pkgVersion, registry)
```

接收三个参数。第一个参数为npm包的名称。第二个参数为npm包的版本号。第三个参数为使用的源地址，默认使用npm源。返回一个数组。

### getPkgSemverVersion

获取当前主版本号下，最新的版本号。

```javascript
const { getPkgSemverVersion } = require('@eqshow/get-pkg-info');
getPkgSemverVersion(pkgName, pkgVersion, registry)
```

接收三个参数。第一个参数为npm包的名称。第二个参数为npm包的版本号。第三个参数为使用的源地址，默认使用npm源。返回一个数组。

### getPkgLatestVersion

获取最新稳定版本。

```javascript
const { getPkgLatestVersion } = require('@eqshow/get-pkg-info');
getPkgLatestVersion(pkgName, registry)
```

接收两个参数。第一个参数为npm包的名称，第二个参数为使用的源地址，默认使用npm源。返回一个版本号字符串。
