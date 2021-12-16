import execa from 'execa'

export function die(msg: string): void {
  process.exitCode = 1
  throw new Error(msg)
}

export function buildRunLocalBin(dirRelativeTo: string) {
  return async (command: string, args: string[] = []): Promise<void> => {
    await execa(command, args, {
      preferLocal: true,
      localDir: dirRelativeTo,
      stdio: 'inherit',
    })
  }
}
