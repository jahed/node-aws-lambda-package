const path = require('path')
const makeDirectory = require('../src/makeDirectory')
const execute = require('../src/execute')
const extractTar = require('../src/extractTar')
const removeFile = require('../src/removeFile')
const zipDirectory = require('../src/zipDirectory')
const readJSON = require('../src/readJSON')
const removeDirectory = require('../src/removeDirectory')

function getArchiveName(packageJson) {
  return `${packageJson.name.replace(/@/g, '').replace(/\//g, '-')}-v${packageJson.version}`
}

function packageUsingPackageJson({ packageRoot, packageJson }) {
  const archiveName = getArchiveName(packageJson)
  const tmpDir = path.resolve(packageRoot, '.lambda-package')
  const packFile = path.resolve(packageRoot, `${archiveName}.tgz`)
  const outputFile = path.resolve(packageRoot, `${archiveName}.zip`)
  const packageDir = path.resolve(tmpDir, 'package')

  const cleanUp = () => Promise.all([removeDirectory(tmpDir), removeFile(packFile)])

  return Promise.resolve()
    .then(() => execute('yarn pack', { cwd: packageRoot }))
    .then(() => makeDirectory(tmpDir))
    .then(() => extractTar({ input: packFile, output: tmpDir }))
    .then(() => execute('yarn install --production', { cwd: packageDir }))
    .then(() => zipDirectory({
      input: packageDir,
      output: outputFile
    }))
    .then(
      () => {
        cleanUp()
        return {
          outputFile: outputFile
        }
      },
      e => {
        cleanUp()
        return Promise.reject(e)
      }
    )
}

function packageForLambda({ packageRoot = process.cwd() } = {}) {
  return readJSON(path.resolve(packageRoot, 'package.json')).then(
    packageJson => packageUsingPackageJson({ packageRoot, packageJson }),
    e => Promise.reject(new Error(`expected current directory to have a package.json. ${e.message}`))
  )
}

module.exports = packageForLambda
