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
  let pkg
  // /c/Users/韩/Desktop/eqshow-cli/commands/create/lib

  // 未指定包的路径，那么会去缓存路径中查找
  if (!targetPath) {
    targetPath = path.resolve(homePath, 'dependencies')
    pkg = new Package({
      name: pkgName,
      version: pkgVersion,
      targetPath,
    })

    if (pkg.exists()) {
      console.log('pkg存在')
    } else {
      await pkg.install()
    }
  } else {
    pkg = new Package({
      name: pkgName,
      version: pkgVersion,
      targetPath,
    })
  }

  const rootFilePath = pkg.getRootFilePath()
  console.log('root file path: ', rootFilePath)
}

module.exports = exec
