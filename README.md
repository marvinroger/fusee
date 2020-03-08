<h1 align=center style="max-width: 100%;">
  <img width="128" height="128" alt="Fusee Logo" src="https://cdn.jsdelivr.net/gh/marvinroger/fusee@7b1db98006b3acae1da93087c76b31d536df8763/fusee.svg" style="max-width: 100%;"><br/>
  <a href="https://github.com/marvinroger/fusee">@marvinroger/fusee</a>
</h1>

<p align=center style="line-height: 2;">
  <a href="https://www.npmjs.com/package/@marvinroger/fusee" target="_blank"><img src="https://img.shields.io/npm/v/@marvinroger/fusee.svg?style=flat-square&color=007acc&label=version&logo=NPM" alt="version" /></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript"></a>
</p>

<p align=center>
  <b>This module provides tooling to lint, format, test and write JS modules.</b>
</p>

---

It makes use of the following stack:

- [Prettier](https://github.com/prettier/prettier) for code style linting and formatting
- [ESLint](https://eslint.org/) for TS linting
- [Jest](https://jestjs.io/) for testing
- [TypeDoc](https://typedoc.org/) for documentation generation
- [Husky](https://github.com/typicode/husky) / [lint-staged](https://github.com/okonet/lint-staged) for Git hooks
- [Commitizen](https://github.com/commitizen/cz-cli) / [commitlint](https://github.com/conventional-changelog/commitlint) for Git commit messages ([Conventional Commits](https://www.conventionalcommits.org) format)
- [release-it](https://github.com/release-it/release-it) for release

Each of these tools is opt-in.

## Install

```bash
yarn add --dev @marvinroger/fusee typescript
```

Create a `fusee.js` file in your package, with the following content:

```js
module.exports = require('@marvinroger/fusee').fusee({
  monorepo: false, // whether your project is a monorepo
  react: true, // whether your project is using React
})
```

## Usage (each "action" is opt-in)

### Lint / format

Lint the code with ESlint and Prettier, trying to fix what's fixable.
This runs `eslint --fix` and `prettier --write` on:

- `src/**/*.ts` if not a monorepo
- `packages/**/src/**/*.ts` if monorepo
- Only given files if a list of files is supplied (this is how lint-staged is setup)

The ESLint config can be found at ⚙ [src/configs/eslint.ts](src/configs/eslint.ts), and
the Prettier config at ⚙ [src/configs/prettier.ts](src/configs/prettier.ts).

#### Requirements

Run:

```bash
yarn add --dev eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-jest eslint-plugin-node eslint-config-prettier eslint-plugin-prettier eslint-plugin-promise
```

Also, if your fusee is setup with `react: true`:

```bash
yarn add --dev eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

Then, create a `.eslintrc.js` file in your package, with the following content:

```js
module.exports = require('./fusee').eslint()
```

#### Usage

```bash
fusee lint [files...]
```

By default, all `src/` files will be linted, or the specified `files`.

### Test

Test the code with Jest.
This runs jest `--passWithNoTests` with the default Jest config, with TS supported.

The Jest config can be found at ⚙ [src/configs/jest.ts](src/configs/jest.ts).

#### Requirements

Run:

```bash
yarn add --dev jest ts-jest @types/jest
```

Then, create a `jest.config.js` file in your package, with the following content:

```js
// note: if you have a monorepo, you'll want to reference the workspace
// `fusee.js`, so you'll more likely have `require('../fusee')`
module.exports = require('./fusee').jest()
```

#### Usage

```bash
fusee test
```

### Docs generation

Generate the HTML docs from the TypeScript code, into the `docs/` directory.

**Note:** Due to a TypeDoc restriction, every single exported method will be documented (even if not exported from the entry-point). To ignore such methods, add a `@hidden` annotation.

#### Requirements

Run:

```bash
yarn add --dev typedoc
```

#### Usage

```bash
fusee generate-docs
```

### Commit

Commit interactively with a [Conventional Commits](https://www.conventionalcommits.org) compatible format.

#### Requirements

In your `package.json`, add:

```json
{
  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog"
    }
  }
}
```

#### Usage

```bash
fusee commit
```

### Release

Bump `package.json` according to the commits, update `CHANGELOG.md` and tag a new release.

#### Requirements

Run:

```bash
yarn add --dev release-it
```

Then, create a `.release-it.js` file in your package, with the following content:

```js
// note: if you have a monorepo, you'll want to reference the workspace
// `fusee.js`, so you'll more likely have `require('../fusee')`
module.exports = require('./fusee').releaseIt()
```

#### Usage

```bash
fusee release [params...]
```

`params` is optional. These parameters will be passed to the `release-it` cli.

### Git hooks

The Husky config can be found at ⚙ [src/configs/husky.ts](src/configs/husky.ts).
The following hooks are set:

- `pre-commit`: This runs `lint-staged` with the config at ⚙ [src/configs/lint-staged.ts](src/configs/lint-staged.ts). Whenever a file matches the `*.{ts,tsx,js,jsx}` pattern, the `lint` script will be ran on these files, fixing what's fixable. If the lint is unsuccessful and it cannot be auto-fixed, the commit will be aborted.

- `commit-msg`: This runs `commitlint`, checking the message against the [Conventional Commits](https://www.conventionalcommits.org) format. If it fails, the commit is aborted.

There is no `pre-push` hook, as it might take too long to build or test the project.
These checks should be done on the CI.

#### Requirements

The `Lint / format` requirements must be met.

Run:

```bash
yarn add --dev husky
```

Create a `.lintstagedrc.js` with the following content:

```js
module.exports = require('@marvinroger/fusee').lintStaged()
```

Create a `.commitlintrc.js` with the following content:

```js
module.exports = require('@marvinroger/fusee').commitlint()
```

#### Usage

Just use Git normally.
