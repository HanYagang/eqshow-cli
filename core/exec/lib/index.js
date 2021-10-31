'use strict';

const Package = require('@eqshow/package')

function exec(...args) {
  const targetPath = process.env.EQX_CLI_TARGET_PATH
  const homePath = process.env.EQX_CLI_HOME_PATH
  // Command对象
  const cmd = args[args.length - 1]
  const cmdName = cmd.name()
  const pkgName = `@eqshow/${cmdName}`
  const pkgVersion = 'latest'

  if (!targetPath) {
    //
    console.log('has storage path')
  }

  const pkg = new Package({
    name: pkgName,
    version: pkgVersion,
    targetPath,
    storagePath: ''
  })

  console.log('pkg: ', pkg)
  console.log(pkg.getRootFilePath())
  // console.log('targetPath: ', targetPath)
  // console.log('homePath: ', homePath)
}

module.exports = exec
