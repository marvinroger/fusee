# Fusee

A fusee is a "bundle" made of multiple opt-in features.

## Building a fusee

```js
const fusee = buildFusee(builder => {
  builder.feature('lint').setup(feature => {
    feature.fact('has-eslint-dep').dependencies({ eslint: '^5.0.0' })
    feature.fact('has-eslintrc').custom(async info => {
      if (hasFile(info.package.root, '.eslintrc.js')) {
        return true
      }

      return false
    })

    feature.configuration('eslintrc')
      .requireFacts(['has-eslint-dep', 'has-eslintrc'])
      .export(async () => {
        return {
          parser: 'babel-eslint'
        }
      })

    feature.command('lint')
      .requireFacts(['has-eslint-dep', 'has-eslintrc'])
      .handle(async (info, utils) => {
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
      })
  })
})

export default fusee
```

### Feature

A feature represents... A feature, like "lint", "test", "docs", "typescript".
A feature can depend on other features. For example a "lint/react" feature could depend on the "lint" feature. A "git-hook" feature could also depend on the "lint" and "validate-commit" features.

### Fact

Each feature can define a number of facts. For example a "lint" feature would probably have a "has-eslint-dep" fact, and a "has-eslintrc" fact.

A fact can be checked with a custom function, or with some built-in helpers (like check if a dependency is installed, for example).

### Configuration

A feature can define a number of configurations. A "lint" feature would probably have only one configuration, that would be named "eslintrc".

A configuration can require some facts to be met. The "eslint" configuration could require the "has-eslint-dep" and "has-eslintrc" facts. If a required fact is not met, getting a configuration will fail with a clear error message.

### Command

A feature can define a number of commands. A "lint" feature would probably have a "lint" command, that would run the ESLint CLI.

Similarly to configurations, a command can require some facts to be met. Th "lint" command could require the "has-eslint-dep" and "has-eslintrc" facts. If a required fact is not met, calling a command will fail with a clear error message.

## Using a fusee

Define a `fusee.js` in the root of your package:

```js
import myFusee from '@mycorp/my-fusee'

const fusee = myFusee({ features: ['lint', 'test', 'docs'] })

export default fusee
```
