#!/usr/bin/env node
const packageForLambda = require('../src/packageForLambda')
const args = require('minimist')(process.argv.slice(2))

const logJson = args.json

packageForLambda()
  .then(result => {
    if (logJson) {
      console.log(JSON.stringify(result))
    } else {
      console.log(`Success! Your zip file is here:\n  ${result.outputFile}`)
    }
  })
  .catch(error => {
    if (logJson) {
      console.error(JSON.stringify({ error: { message: error.message } }))
    } else {
      console.error('Failed...', error)
    }
  })
