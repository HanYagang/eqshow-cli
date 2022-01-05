const path = require("path")

const fse = require("fs-extra")
const globby = require("globby")
const pkgDir = require("pkg-dir").sync
const ejs = require("ejs")

class GeneratorAPI {
  /**
   * @param {string} id - 插件名称
   * @param {Generator} generator - Generator实例
   * @param {object} options - generator配置
   */
  constructor(id, generator, options) {
    this.id = id
    this.generator = generator
    this.options = options
    // 获取 package.json 所在的工作目录
    const baseDir = pkgDir(process.cwd())
    this.baseDir = baseDir
  }

  // 注入回调
  _injectCallBacks(cb) {
    this.generator.callbacks.push(cb)
  }

  async render(src) {
    const obj = {}
    Error.captureStackTrace(obj)
    const callSite = obj.stack.split("\n")[2]

    // the regexp for the stack when called inside a named function
    const namedStackRegExp = /\s\((.*):\d+:\d+\)$/
    // the regexp for the stack when called inside an anonymous
    const anonymousStackRegExp = /at (.*):\d+:\d+$/

    let matchResult = callSite.match(namedStackRegExp)
    if (!matchResult) {
      matchResult = callSite.match(anonymousStackRegExp)
    }

    // 获取 render 指定所在的目录
    const source = path.resolve(path.dirname(matchResult[1]), src)

    // 收集回调 -> ejs渲染文件
    this._injectCallBacks(async () => {
      // 获取所有文件路径
      const files = await globby("**", {
        cwd: source,
        ignore: ["node_modules/**", "public/**", "yarn.lock"],
        nodir: true
      })

      // 渲染所有文件
      files.forEach((file) => {
        // 模板所在的完整路径
        const absolutePath = path.resolve(source, file)
        ejs.renderFile(absolutePath, {}, {}, (err, result) => {
          if (err) throw Error(err)
          // 要被渲染的完整路径
          const filePath = path.resolve(this.baseDir, file)
          fse.ensureDirSync(path.dirname(filePath))
          fse.writeFileSync(filePath, result)
        })
      })
    })
  }
}

module.exports = GeneratorAPI
