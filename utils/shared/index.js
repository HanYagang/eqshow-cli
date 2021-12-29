const path = require("path")
// 设置打印日志颜色
exports.chalk = require("chalk")
// 版本比对
exports.semver = require("semver")
// 处理路径
exports.slash = require("slash")
// 获取环境信息
Object.assign(exports, require("./lib/env.js"))
// 动态执行命令
Object.assign(exports, require("./lib/execute-command"))

// 判断是否为对象类型
exports.isObject = function (val) {
  return Object.prototype.toString.call(val) === "[object Object]"
}

// 格式化文件路径
exports.normalizeFilePath = function (filePath) {
  if (filePath && typeof filePath === "string") {
    // 获取分隔符，macOS系统下为 '/' win系统下为 '\'
    const sep = path.sep
    if (sep === "/") {
      return filePath
    } else {
      return filePath.replace(/\\/g, "/")
    }
  }

  return filePath
}
