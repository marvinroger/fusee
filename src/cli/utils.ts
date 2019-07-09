import { spawn } from 'child_process'
import * as path from 'path'
import { binMapping } from './bin-mapping'

const isWin = process.platform === 'win32'

export function die(msg: string): void {
  console.error(msg)
  process.exit(1)
}

export async function runBin(
  command: string,
  args: string[] = [],
  failIfFail: boolean = true
): Promise<number> {
  return new Promise((resolve, reject) => {
    const packageName = binMapping[command]

    if (!packageName) {
      return reject(new Error('This command is not supported'))
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const pkg = require(`${packageName}/package`)

    if (!pkg.bin || !pkg.bin[command]) {
      return reject(
        new Error(
          `Cannot find the binary "${command}" in the "${packageName}" package`
        )
      )
    }

    const relativeBinPath = pkg.bin[command] as string
    const pkgPath = require
      .resolve(`${packageName}/package`)
      .slice(0, 'package.json'.length * -1) // remove the `package.json` from the path

    const binPath = path.join(pkgPath, relativeBinPath)

    const commandPath = path.resolve(binPath + (isWin ? '.cmd' : ''))

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
