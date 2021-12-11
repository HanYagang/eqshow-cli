'use strict';
const Command = require('@eqshow/command')

class CreateCommand extends Command {
}

function create(...args) {
  return new CreateCommand(args)
}

module.exports.CreateCommand = CreateCommand
module.exports = create
