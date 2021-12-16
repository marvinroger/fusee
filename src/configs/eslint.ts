import path from 'path'

import { HydratedFuseeOptions } from '../options'

const config = {
  root: true,
  extends: ['@marvinroger/fusee/dist/entrypoints/eslint'],
}

enum Level {
  Off = 'off',
  Warn = 'warn',
  Error = 'error',
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ESLintConfig {
  parserOptions: {
    project: string
  }
  extends: string[]
  rules: {
    [rule: string]: Level | [Level, any]
  }
  settings: any
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export const makeConfig = (
  projectPath: string,
  { react }: HydratedFuseeOptions
) => {
  const config: ESLintConfig = {
    parserOptions: {
      project: path.join(projectPath, 'tsconfig.json'),
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:promise/recommended',
      'plugin:node/recommended-module',
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:prettier/recommended',
    ],

    rules: {
      '@typescript-eslint/explicit-function-return-type': Level.Off,
      '@typescript-eslint/no-parameter-properties': Level.Off,
      '@typescript-eslint/no-unused-vars': [
        Level.Warn,
        { argsIgnorePattern: '^_' },
      ],
      'node/no-unsupported-features/es-syntax': Level.Off,
      'node/no-missing-import': Level.Off,
      'node/shebang': Level.Off,
    },

    settings: {},
  }

  if (react) {
    // React
    config.extends.push('plugin:react/recommended')
    config.settings.react = {
      version: 'detect',
    }
    config.rules['react/prop-types'] = Level.Off

    // React hooks
    config.extends.push('plugin:react-hooks/recommended')

    // Accessibility
    config.extends.push('plugin:jsx-a11y/recommended')
  }

  return config
}

export function buildGetEslintConfig(
  _hydratedFuseeOptions: HydratedFuseeOptions
) {
  /**
   * Get the ESLint configuration object.
   * Also, patch the ESLint module resolution, see https://www.npmjs.com/package/@rushstack/eslint-patch
   */
  function get() {
    require('@rushstack/eslint-patch/modern-module-resolution')

    return config
  }

  return get
}
