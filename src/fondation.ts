const path = require('path')

enum PackageContext {
  MonorepoRoot = 'monorepoRoot',
  MonorepoChild = 'monorepoChild',
  SinglePackage = 'singlePackage',
}

interface ProjectInformation {
  context: PackageContext
  resolvedRoot: string
  workspace?: {
    root: string
    packageJson: any
  }
  package: {
    root: string
    packageJson: any
  }
}

interface Tester {
  addDependencyTest: (testName: string, deps: Record<string, string>) => Tester
  addCustomTest: (
    testName: string,
    fn: (info: ProjectInformation) => Promise<boolean>
  ) => Tester
  removeDependencyTest: (testName: string | string[]) => Tester
  removeCustomTest: (testName: string | string[]) => Tester
}

interface Verifier {
  passDependencyTest: (dep: string | string[]) => void
  passCustomTest: (name: string | string[]) => void
  ignoreDependencyTest: (dep: string | string[]) => void
  ignoreCustomTest: (name: string | string[]) => void
}

interface CommandUtils {
  runProjectBin: (name: string, args: string[]) => Promise<void>
}

interface Builder {
  test: (fn: (tester: Tester) => void) => Builder
  configuration: (
    configurationName: string,
    fn: (parentConfiguration: any) => any
  ) => Builder
  command: (
    commandName: string,
    verifyFn: (verifier: Verifier) => void,
    handler: (
      parentHandler: () => void,
      info: ProjectInformation,
      utils: CommandUtils
    ) => void
  ) => Builder
}

interface Engine {
  getConfig: (name?: string) => any
}

interface Fusee {
  engine: (name: string, fn: (options: any, builder: Builder) => void) => Fusee
  getEngine: (name: string) => Engine
}

/**
 * Root
 */

const fusee = {} as Fusee

fusee.engine('eslint', (options, builder) => {
  builder.test((tester) => {
    tester.addDependencyTest('eslint', { eslint: '^5.0.0' })
    tester.addDependencyTest('eslintTypescript', { 'eslint-ts': '^5.0.0' })
    tester.addDependencyTest('eslintPlugins', {
      'eslint-plugin-todo': '^5.0.0',
    })

    if (options.react) {
      tester.addDependencyTest('eslintReact', { 'eslint-react': '^5.0.0' })
    }

    tester.addCustomTest(
      'eslintRcExists',
      async (_info: ProjectInformation) => {
        return true
      }
    )
  })

  builder.command(
    'lint',
    (verifier) => {
      verifier.passDependencyTest([
        'eslint',
        'eslintTypescript',
        'eslintPlugins',
      ])

      if (options.react) {
        verifier.passDependencyTest('eslintReact')
      }

      verifier.passCustomTest('eslintRcExists')
    },
    async (_parentHandler, info, utils) => {
      if (info.context === PackageContext.MonorepoRoot) {
        throw new Error(
          'This command must be run in the context of a package (not workspace root)'
        )
      }

      await utils.runProjectBin('eslint', [
        '--ignore-path',
        path.join(info.resolvedRoot, '.gitignore'),
        '--fix',
        'src/**/*.ts',
      ])
    }
  )

  builder.configuration('eslintRc', () => ({
    parser: 'eslint-ts',
  }))
})

/**
 * Child
 */

// Alright, let's imagine our team does not use ts

// override the 'eslint' engine
fusee.engine('eslint', (options, builder) => {
  // override the tests
  builder.test((tester) => {
    tester.removeDependencyTest('eslintTypescript')
  })

  // override the command, to remove the typescript test
  builder.command(
    'lint',
    (verifier) => {
      verifier.ignoreDependencyTest(['eslintTypescript'])
    },
    (parentHandler) => {
      return parentHandler()
    }
  )

  // override the configuration
  builder.configuration('eslintRc', (parentConfiguration) => ({
    ...parentConfiguration,
    parser: 'babel',
  }))
})

/**
 * Usage
 */

fusee.getEngine('eslint').getConfig()
