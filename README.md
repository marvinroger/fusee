# Marvin ROGER's JS dev core

This module provides tooling to lint, format, test and write JS modules.

It makes use of the following stack:

- Prettier for code style linting and formatting
- ESLint for JS/TS linting
- Jest for testing
- [TO-DO] Husky / lint-staged for Git hooks

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

**Note:** Every single exported method will be documented (even those which are not exported from the entry-point). To ignore such methods, add a `@hidden` annotation.
