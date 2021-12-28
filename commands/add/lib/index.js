const Command = require("@eqshow/command")

class AddCommand extends Command {
  init() {
    this.pluginName = this._argv[0] || ""
    this.pluginOptions = this._argv[1] || {}
    console.log("add command: ", Object.keys(this))
  }
}

function add(...args) {
  return new AddCommand(args)
}

module.exports = add
