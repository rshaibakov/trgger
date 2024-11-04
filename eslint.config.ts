import { FlatCompat } from '@eslint/eslintrc'
import { fixupConfigRules } from '@eslint/compat'
import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import unicorn from 'eslint-plugin-unicorn'

import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

const config = [
  {
    ignores: ['.next/*'],
  },
  ...fixupConfigRules([
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ]),
  stylistic.configs.customize({
    indent: 2,
    quotes: 'single',
    semi: false,
    jsx: true,
  }),
  unicorn.configs['flat/all'],
  {
    rules: {
      'import/order': [
        'error',
        {
          'newlines-between': 'always',
          'warnOnUnassignedImports': true,
          'groups': [
            'external',
            'builtin',
            'internal',
            'sibling',
            'object',
            'parent',
            'index',
          ],
        },
      ],
    },
  },
]

export default config
