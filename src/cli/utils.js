/* eslint-disable @typescript-eslint/no-var-requires */

const { spawn } = require('child_process')
const path = require('path')

const isWin = process.platform === 'win32'

function die(msg) {
  console.error(msg)
  process.exit(1)
}

async function runBin(command, args = [], failIfFail = true) {
  return new Promise(resolve => {
    const commandPath = path.resolve(
      __dirname,
      '../../node_modules/.bin/',
      command + (isWin ? '.cmd' : '')
    )

    const commandProcess = spawn(commandPath, args, {
      stdio: 'inherit',
    })

    commandProcess.on('close', code => {
      if (failIfFail) {
        process.exit(code)
      } else {
        resolve(code)
      }
    })
  })
}

module.exports = {
  die,
  runBin,
}
