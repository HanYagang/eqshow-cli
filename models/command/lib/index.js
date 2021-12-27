class Command {
  constructor(args) {
    const cmd = args[args.length - 1]
    const argv = args.slice(0, args.length - 1)
    // 参数
    this._argv = argv
    // 命令本身
    this._cmd = cmd
    // 初始化执行command
    this.init()
  }

  init() {
    throw Error("必须重写init函数")
  }
}

module.exports = Command
