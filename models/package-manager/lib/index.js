const { hasYarn, executeCommand } = require("@eqshow/shared")

// 当前支持的包管理器
// const SUPPORTED_PACKAGE_MANAGERS = ["yarn", "npm"]
// 包管理器配置
const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ["install", "--loglevel", "error"],
    add: ["install", "--loglevel", "error"],
    upgrade: ["update", "--loglevel", "error"],
    remove: ["uninstall", "--loglevel", "error"]
  },
  yarn: {
    install: [],
    add: ["add"],
    upgrade: ["upgrade"],
    remove: ["remove"]
  }
}

class PackageManager {
  constructor({ context }) {
    // 当前执行环境cwd
    this.context = context
    // 当前包管理器
    this.bin = hasYarn() ? "yarn" : "npm"
  }

  // 添加包
  async add(packageName, { dev = true } = {}) {
    const args = dev ? ["-D"] : []
    return await this.runCommand("add", [packageName, ...args])
  }

  // 执行命令
  async runCommand(command, args) {
    return await executeCommand(
      this.bin,
      [...PACKAGE_MANAGER_CONFIG[this.bin][command], ...(args || [])],
      this.context
    )
  }
}

module.exports = PackageManager
