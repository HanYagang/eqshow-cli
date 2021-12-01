'use strict';

const path = require('path')
const Package = require('@eqshow/package')

async function exec(...args) {
  let targetPath = process.env.EQX_CLI_TARGET_PATH
  const homePath = process.env.EQX_CLI_HOME_PATH
  // Command对象
  const cmd = args[args.length - 1]
  const cmdName = cmd.name()
  const pkgName = `@eqshow/${cmdName}`
  const pkgVersion = 'latest'
  // 是否为缓存模式，对应的为指定模式
  const cache = !targetPath
  const CACHE_DIR = 'dependencies'

  if (cache) {
    targetPath = path.resolve(homePath, CACHE_DIR)
  }
  // 创建pacakge信息
  const pkg = new Package({
    name: pkgName,
    version: pkgVersion,
    targetPath,
    cache
  })

  if (cache) { // 缓存模式
    if (await pkg.exists()) {
      // 检查更新
      await pkg.update()
    } else {
      await pkg.install()
    }
  } else { // 指定模式
    const rootFilePath = pkg.getRootFilePath()
    console.log('root file path: ', rootFilePath)
  }
}

module.exports = exec
