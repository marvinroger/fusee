import execa from 'execa'
import * as path from 'path'

const LOCAL_BIN_PATH = path.resolve(__dirname, '../../node_modules/.bin')
const IS_WINDOWS = process.platform === 'win32'

export function die(msg: string): void {
  process.exitCode = 1
  throw new Error(msg)
}

export async function runLocalBin(
  command: string,
  args: string[] = []
): Promise<void> {
  const resolvedCommand = `${command}${IS_WINDOWS ? '.cmd' : ''}`
  await execa(path.resolve(path.join(LOCAL_BIN_PATH, resolvedCommand)), args, {
    stdio: 'inherit',
  })
}
