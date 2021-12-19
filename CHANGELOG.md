# Changelog

## 4.0.3

### Patch Changes

- 2975c80: Resolve fusee file relative to the ESLint file

## 4.0.2

### Patch Changes

- c8ff57a: Update eslint-plugin-promise which fixed its eslint peer dependency range

## 4.0.1

### Patch Changes

- 1fae608: Fix peer dependencies range

## 4.0.0

### Major Changes

- c24ee0e: Update dependencies and simplify usage

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [3.3.9](https://github.com/marvinroger/fusee/compare/v3.3.8...v3.3.9) (2020-03-25)

### Bug Fixes

- no args CLI handling ([b1c64d1](https://github.com/marvinroger/fusee/commit/b1c64d115ee7bb54355b6b703cc8e897eb0fd0ee))

### [3.3.8](https://github.com/marvinroger/fusee/compare/v3.3.7...v3.3.8) (2020-03-04)

### [3.3.7](https://github.com/marvinroger/fusee/compare/v3.3.6...v3.3.7) (2019-10-24)

### Bug Fixes

- **eslint:** remove orphan comment rule ([0483582](https://github.com/marvinroger/fusee/commit/0483582))

### [3.3.6](https://github.com/marvinroger/fusee/compare/v3.3.5...v3.3.6) (2019-10-24)

### [3.3.5](https://github.com/marvinroger/fusee/compare/v3.3.4...v3.3.5) (2019-10-11)

### Bug Fixes

- CLI was called when building the fusee ([b5c7136](https://github.com/marvinroger/fusee/commit/b5c7136))

### [3.3.4](https://github.com/marvinroger/fusee/compare/v3.3.3...v3.3.4) (2019-10-11)

### Bug Fixes

- use local bin instead of execa ([cfd7f74](https://github.com/marvinroger/fusee/commit/cfd7f74))

### [3.3.3](https://github.com/marvinroger/fusee/compare/v3.3.2...v3.3.3) (2019-10-06)

### Bug Fixes

- fix command spawning ([6df3b0a](https://github.com/marvinroger/fusee/commit/6df3b0a))

### [3.3.2](https://github.com/marvinroger/fusee/compare/v3.3.1...v3.3.2) (2019-10-06)

### Bug Fixes

- more reliable command spawning ([dd2479f](https://github.com/marvinroger/fusee/commit/dd2479f))

### [3.3.1](https://github.com/marvinroger/fusee/compare/v3.3.0...v3.3.1) (2019-10-06)

### Bug Fixes

- **eslint:** add more reliable patch ([f4bd223](https://github.com/marvinroger/fusee/commit/f4bd223))

## [3.3.0](https://github.com/marvinroger/fusee/compare/v3.2.2...v3.3.0) (2019-08-28)

### Features

- read CLI params (like monorepo) directly from the fusee.js file ([e1c1228](https://github.com/marvinroger/fusee/commit/e1c1228))

### [3.2.2](https://github.com/marvinroger/fusee/compare/v3.2.1...v3.2.2) (2019-08-18)

### Bug Fixes

- fix package build ([36cdabc](https://github.com/marvinroger/fusee/commit/36cdabc))

### [3.2.1](https://github.com/marvinroger/fusee/compare/v3.2.0...v3.2.1) (2019-08-18)

### Bug Fixes

- fix compilation errors ([ac1586f](https://github.com/marvinroger/fusee/commit/ac1586f))

## [3.2.0](https://github.com/marvinroger/fusee/compare/v3.1.3...v3.2.0) (2019-08-18)

### Bug Fixes

- fix bad lint-staged config ([d3c4d5f](https://github.com/marvinroger/fusee/commit/d3c4d5f))

### Features

- **eslint:** enable eslint recommended ([84c53e0](https://github.com/marvinroger/fusee/commit/84c53e0))
- **ts:** emit declaration and enable incremental compilation ([c75b218](https://github.com/marvinroger/fusee/commit/c75b218))

### [3.1.3](https://github.com/marvinroger/fusee/compare/v3.1.2...v3.1.3) (2019-08-04)

### Bug Fixes

- add missing dependencies ([392c8ab](https://github.com/marvinroger/fusee/commit/392c8ab))

### [3.1.2](https://github.com/marvinroger/fusee/compare/v3.1.1...v3.1.2) (2019-08-04)

### Bug Fixes

- remove ESLint deps from peerDependencies ([317a24c](https://github.com/marvinroger/fusee/commit/317a24c))

### [3.1.1](https://github.com/marvinroger/fusee/compare/v3.1.0...v3.1.1) (2019-08-04)

### Bug Fixes

- move ESLint dependencies to dependencies field ([ad4bf56](https://github.com/marvinroger/fusee/commit/ad4bf56))

## [3.1.0](https://github.com/marvinroger/fusee/compare/v3.0.2...v3.1.0) (2019-08-03)

### Features

- add ESLint dependencies resolver patch ([42f19bc](https://github.com/marvinroger/fusee/commit/42f19bc))

### [3.0.2](https://github.com/marvinroger/fusee/compare/v3.0.1...v3.0.2) (2019-07-09)

### Bug Fixes

- disable some node eslint rules for TS ([8601976](https://github.com/marvinroger/fusee/commit/8601976))

### [3.0.1](https://github.com/marvinroger/fusee/compare/v3.0.0...v3.0.1) (2019-07-09)

### Bug Fixes

- TS interface not exported ([8c9795a](https://github.com/marvinroger/fusee/commit/8c9795a))

## [3.0.0](https://github.com/marvinroger/fusee/compare/v2.2.1...v3.0.0) (2019-07-09)

### Bug Fixes

- bin could not be run when `bin` as string ([9370251](https://github.com/marvinroger/fusee/commit/9370251))

### Features

- add global settings and enhance ESLint rules ([e5462ec](https://github.com/marvinroger/fusee/commit/e5462ec))

### BREAKING CHANGES

- the way of accessing configuration changes

### [2.2.1](https://github.com/marvinroger/fusee/compare/v2.2.0...v2.2.1) (2019-07-09)

### Bug Fixes

- **prettier:** ignore CHANGELOG.md ([fb7a2de](https://github.com/marvinroger/fusee/commit/fb7a2de))

## [2.2.0](https://github.com/marvinroger/fusee/compare/v2.1.0...v2.2.0) (2019-07-09)

### Features

- make the bin resolver compatible with Yarn PnP ([7ab3d8c](https://github.com/marvinroger/fusee/commit/7ab3d8c))

## [2.1.0](https://github.com/marvinroger/fusee/compare/v2.0.1...v2.1.0) (2019-07-08)

### Features

- add .prettierignore to avoid formatting useless files ([cfdcb1e](https://github.com/marvinroger/fusee/commit/cfdcb1e))

### [2.0.1](https://github.com/marvinroger/js-dev-core/compare/v2.0.0...v2.0.1) (2019-07-08)

### Bug Fixes

- fix lint-staged configuration after upgrade ([7b441db](https://github.com/marvinroger/js-dev-core/commit/7b441db))
- migrate assets "dev-core" to fusee ([7b1db98](https://github.com/marvinroger/js-dev-core/commit/7b1db98))

## [2.0.0](https://github.com/marvinroger/js-dev-core/compare/v1.11.0...v2.0.0) (2019-07-08)

### Features

- rename dev-core to fusee ([2d3536c](https://github.com/marvinroger/js-dev-core/commit/2d3536c))

### BREAKING CHANGES

- the npm package changes too

## [1.11.0](https://github.com/marvinroger/js-dev-core/compare/v1.9.3...v1.11.0) (2019-06-06)

### Bug Fixes

- prevent eslint error because of unmatching pattern ([c06b7e0](https://github.com/marvinroger/js-dev-core/commit/c06b7e0))

### Features

- add support for monorepos ([f3813bf](https://github.com/marvinroger/js-dev-core/commit/f3813bf))

## [1.10.0](https://github.com/marvinroger/js-dev-core/compare/v1.9.3...v1.10.0) (2019-06-06)

### Features

- add support for monorepos ([eef8f6a](https://github.com/marvinroger/js-dev-core/commit/eef8f6a))

### [1.9.3](https://github.com/marvinroger/js-dev-core/compare/v1.9.2...v1.9.3) (2019-04-24)

### Bug Fixes

- add eslint dependencies as peerDependencies ([89397f1](https://github.com/marvinroger/js-dev-core/commit/89397f1))

### [1.9.2](https://github.com/marvinroger/js-dev-core/compare/v1.9.1...v1.9.2) (2019-04-12)

### Bug Fixes

- allow expressions not having an explicit return type ([a444c31](https://github.com/marvinroger/js-dev-core/commit/a444c31))

### [1.9.1](https://github.com/marvinroger/js-dev-core/compare/v1.9.0...v1.9.1) (2019-04-12)

### Bug Fixes

- commit-msg hook param passing ([c5e9e1f](https://github.com/marvinroger/js-dev-core/commit/c5e9e1f))

## [1.9.0](https://github.com/marvinroger/js-dev-core/compare/v1.8.3...v1.9.0) (2019-04-12)

### Features

- add commit, release and changelog creation/lint ([a88a6c0](https://github.com/marvinroger/js-dev-core/commit/a88a6c0))
