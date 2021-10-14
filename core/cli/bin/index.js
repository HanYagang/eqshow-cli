#! /usr/bin/env node
'use strict';

const importLocal = require('import-local')
const log = require('@eqshow/log')


if (importLocal(__filename)) {
  log.info('cli', '正在使用本地版本的eqx脚手架')
} else {
  require('../lib')()
}