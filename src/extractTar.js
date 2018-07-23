const tar = require('tar')

function extractTar({ input, output }) {
  console.log(`extracting tar ${input} to ${output}`)
  return tar.extract({ file: input, cwd: output })
}

module.exports = extractTar
