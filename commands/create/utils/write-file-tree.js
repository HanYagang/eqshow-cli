const path = require("path")
const fse = require("fs-extra")

module.exports = function (dir, files) {
  Object.keys(files).forEach((name) => {
    // 文件路径
    const filePath = path.join(dir, name)
    fse.ensureDirSync(path.dirname(filePath))
    fse.writeFileSync(filePath, files[name])
  })
}
