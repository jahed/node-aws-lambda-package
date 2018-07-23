const readFile = require('./readFile')

function readJSON(file) {
  return readFile(file).then(content => JSON.parse(content))
}

module.exports = readJSON
