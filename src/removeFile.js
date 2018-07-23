const fs = require('fs')

function removeFile(file) {
  return new Promise((resolve, reject) => {
    console.log(`removing ${file}`)
    fs.unlink(file, (err) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}

module.exports = removeFile
