'use strict';
const Command = require('@eqshow/command')

class CreateCommand extends Command {
}

function create(...args) {
  console.log('create: ',args.slice(0, args.length - 1))
  return new CreateCommand()
}

module.exports.CreateCommand = CreateCommand
module.exports = create
