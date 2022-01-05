const GeneratorAPI = require("./generator-api")

class Generator {
  constructor(context, { plugin }) {
    // 当前执行环境 cwd
    this.context = context
    // 当前安装的插件信息
    this.plugin = plugin
    // 收集回调 -> 解决插件中执行异步渲染等的问题
    this.callbacks = []
  }

  /**
   * 初始化插件信息
   * 1. 调用回调函数
   */
  async initPlugins() {
    const { id, apply, options } = this.plugin
    const api = new GeneratorAPI(id, this, options)
    await apply(api, options)
  }

  // 清空收集的回调队列
  async flushCallbacks() {
    for (const callback of this.callbacks) {
      await callback()
    }
  }

  async generate() {
    // 收集插件的render回调
    await this.initPlugins()
    // 清空回调队列
    await this.flushCallbacks()
  }
}

module.exports = Generator
