const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')
const fse = require('fs-extra')
const pathExists = require('path-exists').sync
const glob = require('glob')
const ejs = require('ejs')
const Command = require('@eqshow/command')
const Package = require('@eqshow/package')
const { hasYarn } = require('@eqshow/shared')

class CreateCommand extends Command {
  async init() {
    this.projectName = this._argv[0] || ''
    this.cliOptions = this._argv[1] || {}
    try {
      await this.prepare()
    } catch (error) {
      console.log(error.message)
    }
  }
  // 准备工作
  async prepare() {
    // 判断当前目录是否为空
    const projectDir = path.resolve(process.cwd(), this.projectName)
    if (!pathExists(projectDir)) {
      fse.mkdirSync(this.projectName)
    }
    const fileList = fs.readdirSync(projectDir)
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
        console.log('开始清空目录……')
        fse.emptyDirSync(process.cwd())
        console.log('目录清空完成！！！')
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
  async getTemplate(projectInfo) {
    const { name, version } = projectInfo
    const pkg = new Package({
      name,
      version,
      targetPath: path.resolve(process.env.EQX_CLI_HOME_PATH, 'template'),
      cache: true
    })
    // 检查包是否存在，存在则检查更新，不存在则进行安装
    if (await pkg.exists()) {
      // 检查更新
      await pkg.update()
    } else {
      await pkg.install()
    }
    console.log('开始生成模板……')
    fse.copySync(
      path.resolve(pkg.storagePath, 'template'),
      this.projectName
    )
    console.log('模板生成成功，开始ejs渲染模板')
    // 拷贝完成之后，ejs渲染一遍
    await this.templateRender()
    console.log('模板渲染成功！！！')
    const packageManager = (
      this.cliOptions.packageManager ||
      (hasYarn() ? 'yarn' : null) ||
      'npm'
    )
    console.log('安装 node_modules ……')
    const args = packageManager === 'yarn' ? [] : ['install']
    const result = await this.exec(packageManager, args, {
      cwd: path.resolve(process.cwd(), 'hello-world'),
      stdio: 'inherit'
    })
    if (result && result.status === 0) {
      console.log('node_modules安装完成！')
    }
  }

  // ejs渲染模板
  templateRender() {
    return new Promise((resolve, reject) => {
      const cwd = path.resolve(process.cwd(), this.projectName)
      glob('**', {
        cwd,
        ignore: ['node_modules/**', 'public/**', 'yarn.lock'],
        nodir: true,
      }, (err, files) => {
        if (err) reject(err)
        Promise.all(files.map(file => {
          // 完整路径
          const absolutePath = path.resolve(cwd, file)
          return new Promise((_resolve, _reject) => {
            ejs.renderFile(absolutePath, {
              name: this.projectName
            }, {}, (err, result) => {
              if (err) {
                _reject(err)
              } else {
                fse.writeFileSync(absolutePath, result)
                _resolve(result)
              }
            })
          })
        })).then(() => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    })
  }

  // 动态执行命令
  exec(command, args, options) {
    const win32 = process.platform === 'win32'
    const cmd = win32 ? 'cmd' : command
    const cmdArgs = win32 ? ['/c'].concat(command, args) : args
  
    return require('child_process').spawnSync(cmd, cmdArgs, options || {})
  }
}

function create(...args) {
  return new CreateCommand(args)
}

module.exports.CreateCommand = CreateCommand
module.exports = create
