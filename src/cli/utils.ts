import execa from 'execa'
import findRoot from 'find-root'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'
import { Err, Ok, Result } from 'rust-option'

export async function runLocalBin(
  command: string,
  args: string[] = [],
  opts: { cwd?: string } = {}
): Promise<void> {
  await execa(command, args, {
    preferLocal: true,
    localDir: __dirname,
    stdio: 'inherit',
    cwd: opts.cwd,
  })
}

/**
 * Get the package root path from the current cwd.
 *
 * @returns the package root path
 */
export const getPackageRoot = (): Result<string, Error> => {
  try {
    return Ok(findRoot(process.cwd()))
  } catch (_err) {
    return Err(
      new Error(
        'Not in the context of a Node.js project (no package.json found in parents)'
      )
    )
  }
}

export enum PackageContext {
  MonorepoRoot = 'monorepoRoot',
  MonorepoChild = 'monorepoChild',
  SinglePackage = 'singlePackage',
}

interface PackageInformation {
  /** The package root */
  packageRoot: string
  /** The workspace root, if it's a monorepo */
  workspaceRoot?: string
  /** The package context */
  context: PackageContext
  /** If it's a monorepo, the workspace root, otherwise, the package root */
  root: string
}

/**
 * Get the package information, relative to the current cwd.
 *
 * @returns the package information
 */
export const getPackageInformation = (): Result<PackageInformation, Error> => {
  const packageRoot = getPackageRoot()

  if (packageRoot.isErr()) {
    return Err(packageRoot.err().$)
  }

  const workspaceRoot = findYarnWorkspaceRoot(packageRoot.$) || undefined

  const isMonorepo = workspaceRoot !== null
  const root = isMonorepo ? (workspaceRoot as string) : packageRoot.$

  let context = PackageContext.SinglePackage

  if (isMonorepo) {
    context =
      workspaceRoot === packageRoot.$
        ? PackageContext.MonorepoRoot
        : PackageContext.MonorepoChild
  }

  return Ok({
    packageRoot: packageRoot.$,
    workspaceRoot,
    context,
    root,
  })
}
