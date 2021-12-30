const GeneratorAPI = require("./generator-api")

class Generator {
  constructor(context, { plugin }) {
    // 当前执行环境 cwd
    this.context = context
    // 当前安装的插件信息
    this.plugin = plugin
  }

  async initPlugins() {
    // eslint-disable-next-line no-unused-vars
    const { id, apply, options } = this.plugin
    // eslint-disable-next-line no-unused-vars
    const api = new GeneratorAPI(id, this, options)
    // await apply(api, options)
  }

  async generate() {
    await this.initPlugins()
  }
}

module.exports = Generator
