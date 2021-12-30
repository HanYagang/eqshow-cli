const Command = require("@eqshow/command")
const { chalk, resolveModule } = require("@eqshow/shared")
const PackageManager = require("@eqshow/package-manager")
const { getPkgLatestVersion } = require("@eqshow/get-pkg-info")
const invoke = require("@eqshow/invoke")

class AddCommand extends Command {
  async init() {
    this.pluginToAdd = this._argv[0] || ""
    this.pluginOptions = this._argv[1] || {}
    this.parsingPlugin()

    console.log()
    console.log(`📦  安装中 ${chalk.cyan(this.pluginName)}...`)
    console.log()

    const pm = new PackageManager({ context: process.cwd() })
    // 获取版本号
    if (!this.pluginVersion) {
      const version = await getPkgLatestVersion(this.pluginName)
      this.pluginVersion = version
    }
    // 安装插件
    await pm.add(`${this.pluginName}@${this.pluginVersion}`)

    console.log()
    console.log(
      `${chalk.green("✔")}  成功安装插件: ${chalk.cyan(this.pluginName)}`
    )
    console.log()

    // 判定安装的包是否存在generator文件
    const generatorPath = resolveModule(
      `${this.pluginName}/generator`,
      process.cwd()
    )
    if (generatorPath) {
      invoke(this.pluginName, this.pluginOptions, process.cwd())
    } else {
      console.log(`插件 ${this.pluginName} 并没有一个被调用的 generator 文件`)
    }
  }

  // 解析插件名称和版本号
  parsingPlugin() {
    const pluginRe = /^(@?[^@]+)(?:@(.+))?$/
    // eslint-disable-next-line no-unused-vars
    const [_skip, pluginName, pluginVersion] = this.pluginToAdd.match(pluginRe)
    this.pluginName = pluginName
    this.pluginVersion = pluginVersion
  }
}

function add(...args) {
  return new AddCommand(args)
}

module.exports = add
