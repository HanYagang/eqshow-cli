const path = require("path")
const fs = require("fs")

const pathExists = require("path-exists").sync
const inquirer = require("inquirer")
const fse = require("fs-extra")
const Command = require("@eqshow/command")
const { loadModule, chalk } = require("@eqshow/shared")
const PackageManager = require("@eqshow/package-manager")
const Generator = require("@eqshow/generator")
// 工具方法
const writeFileTree = require("../utils/write-file-tree")

class CreateCommand extends Command {
  async init() {
    // 要创建的项目名称
    this.projectName = this._argv[0] || ""
    // 命令参数
    this.cliOptions = this._argv[1] || {}
    // 执行上下文
    this.context = path.resolve(process.cwd(), this.projectName)
    try {
      await this.prepare()
    } catch (error) {
      console.log(error.message)
    }
  }

  // 准备工作
  async prepare() {
    await this.cleanDir()
    await this.run()
  }

  // 清空目录
  async cleanDir() {
    // 判断当前目录是否为空
    const projectDirExists = pathExists(this.context)
    if (projectDirExists) {
      const fileList = fs.readdirSync(this.context)
      const opts = this.cliOptions
      let { force } = opts
      if (fileList.length) {
        // 是否启用强制清空
        if (!force) {
          const { needClean } = await inquirer.prompt([
            {
              type: "confirm",
              name: "needClean",
              message: "当前目录不为空，是否启用强制清空？",
              default: false
            }
          ])
          force = needClean
        }
        // 是否确认强制更新
        if (force) {
          const { isClean } = await inquirer.prompt({
            type: "confirm",
            name: "isClean",
            message: "是否确认清空当前目录？",
            default: false
          })
          force = isClean
        }
        if (force) {
          console.log("开始清空目录……")
          fse.emptyDirSync(this.context)
          console.log("目录清空完成！！！")
        } else {
          throw Error("当前目录不为空，请清空后或者选择新的目录进行创建")
        }
      }
    }
  }

  // create的核心流程
  async run() {
    // 获取preset信息
    const preset = await this.getPreset()
    preset.plugins = {}

    // 处理preset，获取插件信息
    if (preset.features.includes("styles")) {
      preset.plugins["@eqshow/plugin-styles"] = {}
    }
    if (preset.features.includes("lint")) {
      preset.plugins["@eqshow/plugin-lint"] = {}
    }

    const pm = new PackageManager({
      context: this.context
    })

    console.log(`✨  在 ${chalk.yellow(this.context)} 创建项目.`)

    // 生成 package.json 信息
    const pkg = {
      name: this.projectName,
      version: "0.1.0",
      private: true,
      devDependencies: {}
    }

    const deps = Object.keys(preset.plugins)
    deps.forEach((dep) => {
      let { version } = preset.plugins[dep]

      if (!version) {
        version = "latest"
      }

      pkg.devDependencies[dep] = version
    })

    // write package.json
    await writeFileTree(this.context, {
      "package.json": JSON.stringify(pkg, null, 2)
    })

    // install plugins
    console.log("⚙\u{fe0f}  安装CLI插件. 这可能需要一段时间...")
    console.log()

    await pm.install()

    // run generator
    console.log("🚀  Invoking generators...")
    const plugins = this.resolvePlugins(preset.plugins, pkg)

    const generator = new Generator(this.context, {
      plugins
    })
    await generator.generate()

    // install additional deps (injected by generators) 暂时不需要

    // generate README.md
    console.log()
    console.log("📄  Generating README.md...")
    await writeFileTree(this.context, {
      "README.md": "这是一个 readme 文件"
    })

    // log instructions
    console.log()
    console.log(
      `🎉  Successfully created project ${chalk.yellow(this.projectName)}.`
    )
    console.log(
      "👉  Get started with the following commands:\n\n" +
        (this.context === process.cwd()
          ? ""
          : chalk.cyan(` ${chalk.gray("$")} cd ${this.projectName}\n`)) +
        chalk.cyan(` ${chalk.gray("$")} ${"yarn serve"}`)
    )
    console.log()
  }

  // 交互式问答，获取创建项目的信息
  async getPreset() {
    const answers = await inquirer.prompt({
      name: "features",
      type: "checkbox",
      message: "检查项目所需的功能",
      choices: [
        {
          name: "样式",
          value: "styles",
          checked: true
        },
        {
          name: "lint校验",
          value: "lint",
          checked: true
        }
      ]
    })

    return answers
  }

  // 获取插件列表
  resolvePlugins(rawPlugins) {
    const plugins = []

    for (const id of Object.keys(rawPlugins)) {
      const apply = loadModule(`${id}/generator`, this.context) || (() => {})
      let options = rawPlugins[id] || {}

      plugins.push({ id, apply, options })
    }

    return plugins
  }
}

function create(args) {
  return new CreateCommand(args)
}

module.exports.CreateCommand = CreateCommand
module.exports = create
