'use strict';

const path = require('path')
const pkgDir = require('pkg-dir').sync
const npminstall = require('npminstall')
const pathExists = require('path-exists').sync
const fse = require('fs-extra')
const { getDefaultRegistry, getPkgLatestVersion } = require('@eqshow/get-pkg-info')
const {
  isObject,
  normalizeFilePath
} = require('@eqshow/shared')
const log = require('@eqshow/log')

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

  // 获取缓存文件名称前缀
  get cacheFilePrefix() {
    return this.name.replace(/\//, '_')
  }

  // 获取缓存地址 
  get storagePath() {
    if (this.cache) {
      return path.resolve(this.targetPath, `node_modules/_${'@vue_cli'}@${this.version}@${'@vue/cli'}`)
    }
    return null
  }

  async prepare() {
    // 缓存目录不存在则创建目录
    if (this.cache && !pathExists(this.targetPath)) {
      fse.mkdirpSync(this.targetPath)
    }
    // 获取版本号
    if (this.version === 'latest') {
      try {
        this.version = await getPkgLatestVersion('@vue/cli')
      } catch (error) {
        log.error(error.message)
      }
    }
  }

  // 判断缓存的pkg是否存在
  async exists() {
    if (this.cache) {
      await this.prepare()
      return pathExists(this.storagePath)
    }
    return false
  }

  // 安装pkg
  install() {
    return npminstall({
      registry: getDefaultRegistry(),
      root: this.targetPath,
      storeDir: path.resolve(this.targetPath, 'node_modules'),
      pkgs: [{
        name: '@vue/cli',
        version: this.version
      }],
    })
  }

  // 更新pkg
  update() {}

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
