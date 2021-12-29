const Module = require("module")
const path = require("path")

// Polyfill Node's `Module.createRequireFromPath` if not present (added in Node v10.12.0)
// Use `Module.createRequire` if available (added in Node v12.2.0)
const createRequire =
  Module.createRequire ||
  Module.createRequireFromPath ||
  function (filename) {
    const mod = new Module(filename, null)
    mod.filename = filename
    mod.paths = Module._nodeModulePaths(path.dirname(filename))

    mod._compile("module.exports = require;", filename)

    return mod.exports
  }

exports.resolveModule = function (request, context) {
  let resolvedPath
  try {
    try {
      resolvedPath = createRequire(
        path.resolve(context, "package.json")
      ).resolve(request)
    } catch (e) {
      resolvedPath = require.resolve(request, { paths: [context] })
    }
  } catch (e) {}
  return resolvedPath
}
