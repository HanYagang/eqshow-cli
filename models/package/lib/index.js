'use strict';

const path = require('path')
const pkgDir = require('pkg-dir').sync
const npminstall = require('npminstall')
const {
  isObject,
  normalizeFilePath
} = require('@eqshow/shared')
const { getDefaultRegistry } = require('@eqshow/get-pkg-info')

class Package {
  constructor(options) {
    if (!options) {
      throw new Error('Package的options参数不能为空！')
    }
    if (!isObject(options)) {
      throw new Error('Package的options参数必须为对象类型！')
    }
    // pkg的名称
    this.name = options.name
    // pkg的版本
    this.version = options.version
    // pkg的指定路径（绝对路径）
    this.targetPath = options.targetPath
  }

  // pkg的存储路径
  get storagePath() {
    //
    return 'storage path'
  }

  // 判断pkg是否存在
  exists() {
    let targetPath = process.env.EQX_CLI_TARGET_PATH
    if (targetPath) {
      console.log('指定模式')
    } else {
      console.log('缓存模式')
    }
  }

  // 安装pkg
  install() {
    return npminstall({
      root: this.targetPath,
      storeDir: path.resolve(this.targetPath, 'node_modules'),
      registry: getDefaultRegistry(),
      pkgs: [
        { name: 'vue', version: '~2.6.13' },
      ],
    })
  }

  // 更新pkg
  update() {}

  // 获取入口文件路径
  getRootFilePath() {
    // 1、获取package.json所在目录
    const dir = pkgDir(this.targetPath)
    if (!dir) return null
    // 2、读取package.json
    const pkg = require(path.resolve(dir, 'package.json'))
    // 3、返回格式化之后的包入口文件路径
    if (pkg && pkg.main) {
      return normalizeFilePath(path.resolve(dir, pkg.main))
    }
    return null
  }
}

module.exports = Package
