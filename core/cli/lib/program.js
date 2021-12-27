// 注册主程序及命令

const commander = require("commander")
const leven = require("leven")
const { chalk } = require("@eqshow/shared")
const exec = require("@eqshow/exec")
const pkg = require("../package.json")

module.exports = function initProgram() {
  const program = new commander.Command(pkg.version)

  // 建议命令
  function suggestCommands(unknownCommand) {
    const availableCommands = program.commands.map((cmd) => cmd._name)
    let suggestion
    availableCommands.forEach((cmd) => {
      const isBestMatch =
        leven(cmd, unknownCommand) < leven(suggestion || "", unknownCommand)
      if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
        suggestion = cmd
      }
    })
    if (suggestion) {
      console.log(
        "  " + chalk.red(`你的意思是 ${chalk.yellow(suggestion)} 吗?`)
      )
      console.log()
    }
  }

  program
    .name(Object.keys(pkg.bin)[0])
    .usage("<command> [options]")
    .version(`${pkg.name} ${pkg.version}`, "-v --version", "输出当前版本号")
    .helpOption("-h, --help", "显示当前命令的使用文档")
    .addHelpText(
      "after",
      "\n  运行 " +
        chalk.cyan("eqx <command> --help") +
        " 来展示当前命令的详细使用文档\n"
    )

  // create
  program
    .command("create <app-name>")
    .description("创建一个新项目")
    .option("-f, --force", "覆盖目标目录（如果它存在）")
    .option("-tp, --targetPath <target-path>", "指定动态加载文件的路径", "")
    .action(exec)
    .on("option:targetPath", function () {
      const { targetPath } = this.opts()
      process.env.EQX_CLI_TARGET_PATH = targetPath
    })

  // add
  program
    .command("add <plugin-name>")
    .description("添加插件")
    .option("-f, --force", "是否强制添加插件")
    .action((...args) => {
      console.log("add: ", args)
    })

  // 处理未知命令并匹配建议
  program.on("command:*", (operands) => {
    const unknownCommand = operands[0]
    program.outputHelp()
    console.log("  " + chalk.red(`未知命令 ${chalk.yellow(unknownCommand)}.`))
    console.log()
    // 匹配建议
    suggestCommands(unknownCommand)
  })

  // command必传，未传入则打印帮助文档
  if (!process.argv.slice(2).length) {
    program.outputHelp()
    process.exit(1)
  }

  program.parse()
}
