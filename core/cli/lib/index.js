const path = require('path')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const log = require('@eqshow/log')
const { chalk, semver } = require('@eqshow/shared')
const {
  getPkgSemverVersion
} = require(
  '@eqshow/get-pkg-info'
)
// 包信息
const pkg = require('../package.json')
const {
  REQUIRED_NODE_VERSION,
  EOL_NODE_MAJORS,
  DEFAULT_CLI_HOME
} = require('./constants')
// 注册主程序
const initProgram = require('./program')

// 检查脚手架版本号
function checkPkgVersion() {
  log.notice('cli', pkg.version)
}

// 检查node版本
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted, { includePrerelease: true })) {
    log.error(chalk.red(
      'You are using Node ' + process.version + ', but this version of ' + id +
      ' requires Node ' + wanted + '.\nPlease upgrade your Node version.'
    ))
    process.exit(1)
  }
}

// 检查root sudo情况下进行降级
function checkRoot() {
  const rootCheck = require('root-check')
  rootCheck()
}

// 检查用户主目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error('用户主目录不存在！')
  }
}

// 检查环境变量
function checkEnv() {
  // Dotenv可将.env文件中的变量加载到全局环境变量中
  const dotenv = require('dotenv')
  const dotenvExpand = require('dotenv-expand')
  const dotenvPath = path.resolve(userHome, '.eqshow-cli/.env')
  if (pathExists(dotenvPath)) {
    const env = dotenv.config({
      path: dotenvPath
    })
    dotenvExpand(env)
  }
  createDefaultConfig()
}
// 默认配置
function createDefaultConfig() {
  const cliConfig = {
    home: userHome
  }
  if (process.env.EQX_CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.EQX_CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME)
  }
  process.env.EQX_CLI_HOME_PATH = cliConfig.cliHome
}

// 检查是否开启调试模式
function checkLogLevel() {
  if (process.env.EQX_CLI_DEBUG === 'test') {
    log.level = 'verbose'
  }
}

// 检查更新
async function checkGlobalUpdate() {
  // 获取当前主版本号下，最新版本
  // const latestVersion = await getPkgSemverVersion(pkg.name, pkg.version)
  const latestVersion = await getPkgSemverVersion('@vue/cli', '4.4.4')
  // 提示用户更新到该版本
  if (latestVersion) {
    log.warn(chalk.yellow('\n' + `
      New version available ${chalk.red(pkg.version)} → ${chalk.green(latestVersion)}
      Run npm i -g @eqshow/cli to update!
    `))
  }
}

module.exports = async function core() {
  try {
    // 检查脚手架版本号
    checkPkgVersion()
    // 检查node版本号
    checkNodeVersion(REQUIRED_NODE_VERSION, '@eqshow/cli')
    // 检查是否为废弃的版本，提醒升级
    for (const major of EOL_NODE_MAJORS) {
      if (semver.satisfies(process.version, major)) {
        log.warn(chalk.red(
          `You are using Node ${process.version}.\n` +
          `Node.js ${major} has already reached end-of-life and will not be supported in future major releases.\n` +
          `It's strongly recommended to use an active LTS version instead.`
        ))
      }
    }
    // 检查是否为管理员权限，并进行降级
    checkRoot()
    // 检查是否存在用户主目录，确保在真实环境下运行
    checkUserHome()
    // 检查环境变量
    checkEnv()
    // 最后重置调试权限
    checkLogLevel()
    log.verbose('脚手架主目录: ', process.env.EQX_CLI_HOME_PATH)
    // 检查版本更新
    await checkGlobalUpdate()
    // 注册命令
    initProgram()
  } catch (error) {
    log.error('cli', error)
  }
}
