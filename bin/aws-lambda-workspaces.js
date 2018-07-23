#!/usr/bin/env node
const path = require('path')
const args = require('minimist')(process.argv.slice(2))
const packageForLambda = require('../src/packageForLambda')
const execute = require('../src/execute')

const logJson = args.json

Promise.resolve()
  .then(() => execute('yarn workspaces info'))
  .then(result => JSON.parse(result.stdout))
  .then(workspaces => Object.keys(workspaces)
    .map(name => workspaces[name])
    .map(workspace => workspace.location)
    .map(location => path.resolve(process.cwd(), location))
  )
  .then(packageRoots => Promise.all(
    packageRoots.map(packageRoot => packageForLambda({ packageRoot }))
  ))
  .then(results => {
    if (logJson) {
      console.log(JSON.stringify(results))
    } else {
      console.log(`Success! Your zip files are here:\n  ${results.map(r => r.outputFile).join('\n  ')}`)
    }
  })
  .catch(error => {
    if (logJson) {
      console.error(JSON.stringify({ error: { message: error.message } }))
    } else {
      console.error('Failed...', error)
    }
  })
