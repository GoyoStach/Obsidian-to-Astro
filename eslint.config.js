import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import astroEslintParser from 'astro-eslint-parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  // Global ignores
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '.vscode/**',
      'public/**'
    ]
  },

  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // Astro plugin recommended
  ...eslintPluginAstro.configs.recommended,

  // TypeScript files configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      '@typescript-eslint/triple-slash-reference': 'off' // Allow Astro env references
    }
  },

  // Astro files configuration
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: ['.astro']
      }
    },
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off', // Astro uses expressions differently
      '@typescript-eslint/no-empty-object-type': 'off', // Allow empty interfaces in Astro
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_|^Props' }
      ],
      'no-undef': 'off' // TypeScript handles this
    }
  },

  // CommonJS files (tailwind.config.cjs, etc.)
  {
    files: ['**/*.cjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        process: 'readonly'
      }
    }
  },

  // JavaScript/Module files
  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  // Disable rules that conflict with Prettier (must be last)
  eslintConfigPrettier
]
