const fs = require('fs')

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, content) => {
      if (err) {
        reject(err)
        return
      }
      resolve(content.toString())
    })
  })
}

module.exports = readFile
