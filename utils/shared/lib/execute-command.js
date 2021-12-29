const execa = require("execa")

// 动态执行command
exports.executeCommand = (command, args, cwd) => {
  return new Promise((resolve, reject) => {
    const child = execa(command, args, {
      cwd,
      stdio: ["inherit", "inherit", "inherit"]
    })

    child.on("close", (code) => {
      if (code !== 0) {
        reject(`command failed: ${command} ${args.join(" ")}`)
        return
      }
      resolve()
    })
  })
}
