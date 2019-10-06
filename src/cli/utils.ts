import execa from 'execa'

export function die(msg: string): void {
  process.exitCode = 1
  throw new Error(msg)
}

export async function runLocalBin(
  command: string,
  args: string[] = []
): Promise<void> {
  await execa(command, args, {
    preferLocal: true,
    localDir: __dirname,
    stdio: 'inherit',
    stderr: 'inherit',
  })
}
