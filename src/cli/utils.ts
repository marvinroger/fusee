import { spawn } from 'child_process'
import * as path from 'path'
import { binMapping } from './bin-mapping'

const isWin = process.platform === 'win32'

export function die(msg: string): void {
  console.error(msg)
  process.exitCode = 1
}

export async function runBin(
  command: string,
  args: string[] = []
): Promise<number> {
  return new Promise((resolve, reject) => {
    const packageName = binMapping[command]

    if (!packageName) {
      return reject(new Error('This command is not supported'))
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(`${packageName}/package`)

    if (!pkg.bin) {
      return reject(new Error(`Package "${packageName}" has no binary`))
    }

    let relativeBinPath: string | undefined
    if (typeof pkg.bin === 'string' && packageName === command) {
      relativeBinPath = pkg.bin
    } else if (!pkg.bin[command]) {
      return reject(
        new Error(
          `Cannot find the binary "${command}" in the "${packageName}" package`
        )
      )
    } else {
      relativeBinPath = pkg.bin[command]
    }

    const pkgPath = require
      .resolve(`${packageName}/package`)
      .slice(0, 'package.json'.length * -1) // remove the `package.json` from the path

    const binPath = path.join(pkgPath, relativeBinPath as string)

    const commandPath = path.resolve(binPath + (isWin ? '.cmd' : ''))

    const commandProcess = spawn(commandPath, args, {
      stdio: 'inherit',
    })

    commandProcess.on('close', code => {
      if (code === 0) {
        resolve(code)
      } else {
        process.exitCode = code
        reject(new Error('The command failed'))
      }
    })
  })
}
