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

  // 缓存路径(仅缓存模式可使用)
  get storagePath() {
    if (this.cache) {
      return path.resolve(this.targetPath, 'node_modules', this.name)
    }
    return null
  }

  // 判断缓存的pkg是否存在
  async exists() {
    if (this.cache) {
      // 缓存目录不存在则创建目录
      if (this.cache && !pathExists(this.targetPath)) {
        fse.mkdirpSync(path.resolve(this.targetPath, 'node_modules'))
      }
      // 包是否存在
      let pkgPath = path.resolve(this.storagePath, 'package.json')
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
        this.version = await getPkgLatestVersion(this.name)
      }
      return false
    }
    return pathExists(this.targetPath)
  }

  // 安装pkg
  install() {
    console.log('install', this.version)
    return npminstall({
      registry: getDefaultRegistry(),
      pkgs: [{
        name: this.name,
        version: this.version
      }],
      root: this.targetPath,
      storeDir: path.resolve(this.targetPath, 'node_modules'),
    })
  }

  // 检查更新pkg
  async update() {
    const latestVersion = await getPkgLatestVersion(this.name)
    if (semver.gt(latestVersion, this.version)) {
      console.log('更新安装包……')
      await npminstall({
        root: this.targetPath,
        storeDir: path.resolve(this.targetPath, 'node_modules'),
        registry: getDefaultRegistry(),
        pkgs: [{
          name: this.name,
          version: latestVersion
        }],
      })
      console.log('安装包更新完成！！！')
      this.version = latestVersion
    }
  }

  // 获取入口文件路径
  getRootFilePath() {
    // 1、获取package.json所在目录
    let dir = null
    if (this.cache) {
      /**
       * 用this.storagePath获取的是包的软链接地址，当包存在更新，
       * 更新之后执行包里内容还是之前的内容，为了解决这个问题，
       * 我们获取更新之后包的实际地址，那样就解决这个问题了
       */
      dir = pkgDir(path.resolve(
        this.targetPath,
        'node_modules',
        `_${this.name.replace(/\//, '_')}@${this.version}@${this.name}`
      ))
    } else {
      dir = pkgDir(this.targetPath)
    }
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
