const { loadModule, chalk } = require("@eqshow/shared")
const Generator = require("@eqshow/generator")

async function invoke(name, options, context) {
  // 获取插件的generator函数
  const pluginGenerator = loadModule(`${name}/generator`, context)

  const plugin = {
    id: name,
    apply: pluginGenerator,
    options
  }

  await runGenerator(context, plugin)
}

async function runGenerator(context, plugin) {
  const generator = new Generator(context, { plugin })

  console.log(`🚀  正在调用的生成器 ${plugin.id}...`)
  console.log()

  await generator.generate()

  console.log(
    `${chalk.green("✔")}  已成功调用插件的生成器: ${chalk.cyan(plugin.id)}`
  )
}

module.exports = (...args) => {
  try {
    invoke(...args)
  } catch (error) {
    console.log("error", error.message)
  }
}
