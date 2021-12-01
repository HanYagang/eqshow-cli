'use strict';

const path = require('path')
const pkgDir = require('pkg-dir').sync
const npminstall = require('npminstall')
const pathExists = require('path-exists').sync
const fse = require('fs-extra')
const { getDefaultRegistry, getPkgLatestVersion } = require('@eqshow/get-pkg-info')
const {
  isObject,
  normalizeFilePath,
  semver
} = require('@eqshow/shared')

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
    // 缓存模式/指定模式
    this.cache = options.cache
  }

  // 判断缓存的pkg是否存在
  async exists() {
    if (this.cache) {
      // 缓存目录不存在则创建目录
      if (this.cache && !pathExists(this.targetPath)) {
        fse.mkdirpSync(path.resolve(this.targetPath, 'node_modules'))
      }
      // 包是否存在
      let pkgPath = path.resolve(this.targetPath, `node_modules/${'@vue/cli'}/package.json`)
      if (pathExists(pkgPath)) {
        const pkg = require(pkgPath)
        const { version } = pkg
        if (version) {
          this.version = version
          return true
        }
      }
      // 包不存在，则获取最新版本号
      if (this.version === 'latest') {
        this.version = await getPkgLatestVersion('@vue/cli')
        return false
      }
    }
    return pathExists(this.targetPath)
  }

  // 安装pkg
  install() {
    return npminstall({
      registry: getDefaultRegistry(),
      pkgs: [{
        name: '@vue/cli',
        version: this.version
      }],
      root: this.targetPath,
      storeDir: path.resolve(this.targetPath, 'node_modules'),
    })
  }

  // 检查更新pkg
  async update() {
    const latestVersion = await getPkgLatestVersion('@vue/cli')
    if (semver.gt(latestVersion, this.version)) {
      await npminstall({
        root: this.targetPath,
        storeDir: path.resolve(this.targetPath, 'node_modules'),
        registry: getDefaultRegistry(),
        pkgs: [{
          name: '@vue/cli',
          version: latestVersion
        }],
      })
      this.version = latestVersion
    }
  }

  // 获取入口文件路径
  getRootFilePath() {
    // 1、获取package.json所在目录
    const dir = pkgDir(this.targetPath)
    if (dir) {
      // 2、读取package.json
      const pkg = require(path.resolve(dir, 'package.json'))
      // 3、返回格式化之后的包入口文件路径
      if (pkg && pkg.main) {
        return normalizeFilePath(path.resolve(dir, pkg.main))
      }
    }
    return null
  }
}

module.exports = Package
