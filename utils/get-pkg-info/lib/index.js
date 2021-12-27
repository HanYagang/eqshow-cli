const urlJoin = require("url-join")
const axios = require("axios")
const { semver } = require("@eqshow/shared")

// 获取包相关信息
function getPkgInfo(pkgName, registry) {
  if (!pkgName) return null
  // 获取源路径 npm源 或者 taobao源
  const registryUrl = registry || getDefaultRegistry()
  const pkgInfoUrl = urlJoin(registryUrl, pkgName)
  return axios.get(pkgInfoUrl).then((res) => {
    if (res.status === 200 && res.data) {
      return res.data
    }
    return null
  })
}

// 获取默认registry
function getDefaultRegistry(isOriginal = false) {
  return isOriginal
    ? "https://registry.npmjs.org"
    : "https://registry.npm.taobao.org"
}

// 获取包的所有版本
async function getPkgVersions(pkgName, registry) {
  const data = await getPkgInfo(pkgName, registry)
  return data ? Object.keys(data.versions) : []
}

// 获取当前主版本号下，大于当前版本的所有版本
async function getPkgSemverVersions(pkgName, pkgVersion, registry) {
  const versions = await getPkgVersions(pkgName, registry)
  return versions
    .filter((version) => semver.satisfies(version, `^${pkgVersion}`))
    .sort((a, b) => (semver.lt(a, b) ? 1 : -1))
}

// 获取当前主版本号下，最新的版本号
async function getPkgSemverVersion(pkgName, pkgVersion, registry) {
  const semverVersions = await getPkgSemverVersions(
    pkgName,
    pkgVersion,
    registry
  )
  return semverVersions[0]
}

// 获取最新稳定版本
async function getPkgLatestVersion(pkgName, registry) {
  let versions = await getPkgVersions(pkgName, registry)
  versions = versions.filter((v) => !semver.prerelease(v)) // 过滤稳定版本
  return versions[0]
}

module.exports = {
  getDefaultRegistry,
  getPkgInfo,
  getPkgVersions,
  getPkgSemverVersions,
  getPkgSemverVersion,
  getPkgLatestVersion
}
