const fs = require('fs')
const archiver = require('archiver')

function zipDirectory({ input, output }) {
  return new Promise((resolve) => {
    console.log(`zipping directory ${input} to ${output}`)
    const zipOutputStream = fs.createWriteStream(output)
    const zipArchive = archiver('zip', { zlib: { level: 9 } })

    zipArchive.on('end', function () {
      resolve()
    })

    zipArchive.pipe(zipOutputStream)
    zipArchive.directory(input, false)
    zipArchive.finalize()
  })
}

module.exports = zipDirectory
