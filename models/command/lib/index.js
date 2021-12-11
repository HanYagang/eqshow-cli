'use strict';

class Command {
  constructor(args) {
    const cmd = args[args.length - 1]
    const argv = args.slice(0, args.length - 1)
    // 参数
    this._argv = argv
    // 命令本身
    this._cmd = cmd
    console.log('command', this._argv)
  }
}

module.exports = Command
