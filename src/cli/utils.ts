import execa from 'execa'
import findRoot from 'find-root'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'
import path from 'path'
import { Err, Ok, Result } from 'rust-option'
import { FUSEE_FILE_NAME } from 'src/constants'
import { fusee } from '../fusee'

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
const getPackageRoot = (): Result<string, Error> => {
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
const getPackageInformation = (): Result<PackageInformation, Error> => {
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

/**
 * Load the fusee and the package information.
 */
export function loadContext(): Result<
  { packageInformation: PackageInformation; fusee: ReturnType<typeof fusee> },
  Error
> {
  const packageInformation = getPackageInformation()

  if (packageInformation.isErr()) {
    return Err(packageInformation.err().$)
  }

  const fuseePath = path.join(packageInformation.$.root, FUSEE_FILE_NAME)

  try {
    const fusee = require(fuseePath)

    return Ok({
      packageInformation: packageInformation.$,
      fusee,
    })
  } catch {
    return Err(new Error('Cannot find fusee.js in root'))
  }
}
