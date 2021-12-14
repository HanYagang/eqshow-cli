const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const fse = require('fs-extra')
const Command = require('@eqshow/command')
const Package = require('@eqshow/package')

class CreateCommand extends Command {
  async init() {
    this.projectName = this._argv[0] || ''
    const opts = this._cmd.opts()
    const { force } = opts
    try {
      await this.prepare()
    } catch (error) {
      console.log(error.message)
    }
  }
  // 准备工作
  async prepare() {
    // 判断当前目录是否为空
    const fileList = fs.readdirSync(process.cwd())
    const opts = this._cmd.opts()
    let { force } = opts
    if (fileList.length) {
      // 是否启用强制清空
      if (!force) {
        const { isClean } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'isClean',
            message: '当前目录不为空，是否启用强制清空？',
            default: false
          }
        ])
        force = isClean
      }
      // 是否确认强制更新
      if (force) {
        const { isClean } = await inquirer.prompt({
          type: 'confirm',
          name: 'isClean',
          message: '是否确认清空当前目录？',
          default: false
        })
        force = isClean
      }
      if (force) {
        fse.emptyDirSync(process.cwd())
      } else {
        throw Error('当前目录不为空，请清空后或者选择新的目录进行创建')
      }
    }
    // 获取项目基本信息
    const projectInfo = await this.getProjectInfo()
    // 获取模板信息
    await this.getTemplate(projectInfo)
  }

  // 获取项目基本信息
  async getProjectInfo() {
    const result = Object.create(null)
    const { type } = await inquirer.prompt({
      type: 'list',
      name: 'type',
      message: '请选择创建项目的类型',
      default: 0,
      choices: [
        {
          value: 'project',
          name: '普通项目'
        },
        {
          value: 'component',
          name: '组件库'
        }
      ]
    })
    result.type = type
    // 设置包名和版本
    if (result.type === 'project') {
      result.name = '@eqshow/template-project'
    } else if (type === 'component') {
      result.name = '@eqshow/template-component'
    }
    // 设置默认版本
    result.version = 'latest'
    return result
  }

  // 获取模板
  async getTemplate({ name, version }) {
    const pkg = new Package({
      name,
      version,
      targetPath: path.resolve(process.env.EQX_CLI_HOME_PATH, 'template'),
      cache: true
    })

    if (await pkg.exists()) {
      // 检查更新
      await pkg.update()
    } else {
      await pkg.install()
    }

    console.log('pkg: ', pkg.storagePath)
  }
}

function create(...args) {
  return new CreateCommand(args)
}

module.exports.CreateCommand = CreateCommand
module.exports = create
