import execa from 'execa'
import findYarnWorkspaceRoot from 'find-yarn-workspace-root'
import fs from 'fs'
import path from 'path'
import pkgDir from 'pkg-dir'
import nodeResolve from 'resolve'
import { FUSEE_FILE_NAME } from '../constants'
import { fusee } from '../fusee'

export async function runBin(
  command: string,
  args: string[] = [],
  opts: { cwd?: string; localDir: string }
): Promise<void> {
  await execa(command, args, {
    preferLocal: true,
    localDir: opts.localDir,
    stdio: 'inherit',
    cwd: opts.cwd,
  })
}

export async function runLocalBin(
  command: string,
  args: string[] = [],
  opts: { cwd?: string } = {}
): Promise<void> {
  await runBin(command, args, { ...opts, localDir: __dirname })
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
const getPackageInformation = async (): Promise<PackageInformation> => {
  const packageRoot = await pkgDir()

  if (!packageRoot) {
    throw new Error(
      'Not in the context of a Node.js project (no package.json found in parents)'
    )
  }

  const workspaceRoot = findYarnWorkspaceRoot(packageRoot) || undefined

  const isMonorepo = workspaceRoot !== undefined
  const root = isMonorepo ? (workspaceRoot as string) : packageRoot

  let context = PackageContext.SinglePackage

  if (isMonorepo) {
    context =
      workspaceRoot === packageRoot
        ? PackageContext.MonorepoRoot
        : PackageContext.MonorepoChild
  }

  return {
    packageRoot: packageRoot,
    workspaceRoot,
    context,
    root,
  }
}

export interface Context {
  packageInformation: PackageInformation
  fusee: ReturnType<typeof fusee>
}

/**
 * Load the fusee and the package information.
 */
export async function loadContext(): Promise<Context> {
  const packageInformation = await getPackageInformation()

  const fuseePath = path.join(packageInformation.root, FUSEE_FILE_NAME)

  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const fusee = require(fuseePath)

    return {
      packageInformation,
      fusee,
    }
  } catch {
    throw new Error(
      'Cannot load fusee.js in root. Make sure it exists, and is valid'
    )
  }
}

/**
 * Read a file.
 *
 * @returns the content of the file
 */
export function readFile(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        return reject(err)
      }

      return resolve(data)
    })
  })
}

/**
 * Resolve the version of a package.
 */
export async function resolveVersion(
  id: string,
  params: { from: string }
): Promise<string | undefined> {
  return new Promise(resolve => {
    nodeResolve(id, { basedir: params.from }, (err, resolved, pkg) => {
      if (err || !resolved) {
        return resolve(undefined)
      }

      resolve(pkg?.version)
    })
  })
}
