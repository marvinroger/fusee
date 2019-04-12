# Marvin ROGER's JS dev core

This module provides tooling to lint, format, test and write JS modules.

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
yarn global add @marvinroger/dev-core
```

Then, inside a blank Node.js project, run `dev-core init`.
This will install the stack, and add the correct scripts inside the `package.json`.

## Installed scripts

```bash
yarn lint
```

Lint the code with Prettier and ESLint, trying to fix what's fixable.

---

```bash
yarn test
```

Test the code with Jest.

---

```bash
yarn generate-docs
```

Generate the HTML docs from the TypeScript code, into the `docs/` directory.

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

**Note:** Due to a TypeDoc restriction, every single exported method will be documented (even if not exported from the entry-point). To ignore such methods, add a `@hidden` annotation.
