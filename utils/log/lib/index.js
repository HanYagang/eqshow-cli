'use strict';

const log = require('npmlog')

// 判断是否启用调试模式 debug模式
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'
// 添加自定义命令
log.addLevel('success', 2000, { fg: 'green', bold: true, bg: 'red' })
// 修改前缀
log.heading = 'eqshow-cli'
// 前缀样式
log.headingStyle = {
  fg: 'red',
  bg: 'white'
}

module.exports = log
