import { spawn } from 'child_process'
import * as path from 'path'

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
