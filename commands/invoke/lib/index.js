const { loadModule, chalk } = require("@eqshow/shared")
const Generator = require("@eqshow/generator")
const Command = require("@eqshow/command")

class InvokeCommand extends Command {
  init(args) {
    this.pluginName = args[0]
    this.pluginOptions = this._argv[this._argv.length - 1]
  }

  async run(context) {
    if (!context) context = process.cwd()
    const { pluginName: name, pluginOptions: options } = this
    // 获取插件的generator函数
    const pluginGenerator = loadModule(`${name}/generator`, context)

    const plugin = {
      id: name,
      apply: pluginGenerator,
      options
    }

    await this.runGenerator(context, plugin)
  }

  async runGenerator(context, plugin) {
    const generator = new Generator(context, { plugin })

    console.log(`🚀  正在调用的生成器 ${plugin.id}...`)
    console.log()

    await generator.generate()

    console.log(
      `${chalk.green("✔")}  已成功调用插件的生成器: ${chalk.cyan(plugin.id)}`
    )
  }
}

module.exports.InvokeCommand = InvokeCommand
module.exports = (...args) => {
  try {
    return new InvokeCommand(...args)
  } catch (error) {
    console.log("error", error.message)
  }
}
