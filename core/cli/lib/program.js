// 注册主程序及命令

const commander = require('commander')
const leven = require('leven')
const { chalk } = require('@eqshow/shared')
const pkg = require('../package.json')
// 建议命令
function suggestCommands(unknownCommand) {
  const availableCommands = commander.map(cmd => cmd._name)
  let suggestion
  availableCommands.forEach(cmd => {
    const isBestMatch = leven(cmd, unknownCommand) < leven(suggestion || '', unknownCommand)
    if (leven(cmd, unknownCommand) < 3 && isBestMatch) {
      suggestion = cmd
    }
  })
  if (suggestion) {
    console.log(`  ` + chalk.red(`你的意思是 ${chalk.yellow(suggestion)} 吗?`))
    console.log()
  }
}

module.exports = function initProgram() {
  const program = new commander.Command(pkg.version)

  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(`${pkg.name} ${pkg.version}`, '-v --version', '输出当前版本号')
    .helpOption('-h, --help', '显示当前命令的使用文档')
    .addHelpText('after', '\n  运行 '+ chalk.cyan('eqx <command> --help') + ' 来展示当前命令的详细使用文档\n')

  program
    .command('test')
    .description('测试用的命令')
    .action(() => {
      console.log('测试用的命令')
    })
  
  // 处理未知命令并匹配建议
  program
    .on('command:*', operands => {
      const unknownCommand = operands[0]
      program.outputHelp()
      console.log(`  ` + chalk.red(`未知命令 ${chalk.yellow(unknownCommand)}.`))
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