const shell = require('shelljs')

function execute(command, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(`running "${command}" at ${options.cwd || process.cwd()}`)
        shell.exec(command, options, (code, stdout, stderr) => {
          if (code === 0) {
            resolve({ code, stdout, stderr })
          } else {
            reject(new Error(`"${command}" exited with code "${code}"`))
            return
          }
        })
    })
}

module.exports = execute
