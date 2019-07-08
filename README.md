<h1 align=center style="max-width: 100%;">
  <img width="128" height="128" alt="Fusee Logo" src="./fusee.svg" style="max-width: 100%;"><br/>
  <a href="https://github.com/marvinroger/fusee">@marvinroger/fusee</a>
</h1>

<p align=center style="line-height: 2;">
  <a href="https://www.npmjs.com/package/@marvinroger/fusee" target="_blank"><img src="https://img.shields.io/npm/v/@marvinroger/fusee.svg?style=flat-square&color=007acc&label=version&logo=NPM" alt="version" /></a>
  <img src="https://img.shields.io/static/v1.svg?label=&message=TypeScript&color=294E80&style=flat-square&logo=typescript">
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
- [Standard Version](https://github.com/conventional-changelog/standard-version) for release versioning and CHANGELOG generation

## Install

```bash
yarn global add @marvinroger/fusee
```

Then, inside a blank Node.js project, run `fusee init`.
This will install the stack, and add the correct scripts inside the `package.json`.

## Installed scripts

```bash
yarn lint --monorepo [files...]
```

Lint the code with ESlint and Prettier, trying to fix what's fixable.
This runs `eslint --fix` and `prettier --write` on:

- `src/**/*.ts` if not a monorepo
- `packages/**/src/**/*.ts` if `--monorepo` is given
- Only given files if a list of files is supplied

The ESLint config can be found at ⚙[src/configs/eslint.ts](src/configs/eslint.ts), and
the Prettier config at ⚙[src/configs/prettier.ts](src/configs/prettier.ts).

---

```bash
yarn test
```

Test the code with Jest.
This runs jest `--passWithNoTests` with the default Jest config, with TS supported and with
the `/pkg/` path excluded.

The Jest config can be found at ⚙[src/configs/jest.ts](src/configs/jest.ts).

---

```bash
yarn generate-docs
```

Generate the HTML docs from the TypeScript code, into the `docs/` directory.

**Note:** Due to a TypeDoc restriction, every single exported method will be documented (even if not exported from the entry-point). To ignore such methods, add a `@hidden` annotation.

---

```bash
yarn commit
```

Commit with a [Conventional Commits](https://www.conventionalcommits.org) compatible format.

---

```bash
yarn release
```

Bump `package.json` according to the commits, update `CHANGELOG.md` and tag a new release.

## Installed Git hooks

The Husky config can be found at ⚙[src/configs/husky.ts](src/configs/husky.ts).
The following hooks are set:

- `pre-commit`: This runs `lint-staged` with the config at ⚙[src/configs/lint-staged.ts](src/configs/lint-staged.ts). Whenever a file matches the `*.{ts,tsx,js,jsx}` pattern, the `lint` script will be ran on these files, fixing what's fixable. If the lint is unsuccessful and it cannot be auto-fixed, the commit will be aborted.

- `commit-msg`: This runs `commitlint`, checking the message against the [Conventional Commits](https://www.conventionalcommits.org) format. If it fails, the commit is aborted.

There is `pre-push` hook, as it might take too long to build or test the project.
These checks should be done on the CI.
