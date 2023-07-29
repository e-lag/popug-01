module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    'airbnb-typescript/base',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: ['./tsconfig.json'],
    // project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json'],
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  overrides: [
    {
      files: ['./**/*.ts'],
      rules: {
        'prettier/prettier': ['error', { endOfLine: 'auto' }],
        '@typescript-eslint/naming-convention': [
          'error',
          {
            format: ['camelCase'],
            leadingUnderscore: 'allow',
            modifiers: ['private'],
            selector: 'property',
            trailingUnderscore: 'allow',
          },
        ],
        complexity: [2, { max: 20 }],
        'max-params': [2, { max: 6 }],
        'import/no-unresolved': 'off',

        '@typescript-eslint/await-thenable': 1,
        '@typescript-eslint/comma-dangle': [
          2,
          {
            arrays: 'always-multiline',
            enums: 'always-multiline',
            exports: 'always-multiline',
            functions: 'always-multiline',
            generics: 'always-multiline',
            imports: 'always-multiline',
            objects: 'always-multiline',
            tuples: 'always-multiline',
          },
        ],
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
          },
        ],
        '@typescript-eslint/explicit-member-accessibility': [
          2,
          {
            accessibility: 'explicit',
            overrides: {
              constructors: 'no-public',
              properties: 'off',
            },
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 2,
        '@typescript-eslint/member-ordering': 2,
        '@typescript-eslint/no-explicit-any': 2,
        '@typescript-eslint/no-floating-promises': 0, // много ложно-положительных срабатываний для knex
        '@typescript-eslint/no-magic-numbers': [
          1,
          {
            ignore: [-1, 0, 1],
            ignoreArrayIndexes: true,
            ignoreDefaultValues: true,
            ignoreEnums: true,
            ignoreNumericLiteralTypes: true,
            ignoreReadonlyClassProperties: true,
          },
        ],
        '@typescript-eslint/no-misused-promises': 0, // много ложно-положительных срабатываний для knex
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/no-unsafe-return': 0,
        '@typescript-eslint/require-await': 1,
        '@typescript-eslint/restrict-template-expressions': [
          2,
          {
            allowAny: true,
            allowBoolean: true,
            allowNullish: true,
            allowNumber: true,
          },
        ],
        '@typescript-eslint/return-await': [2, 'in-try-catch'],
        'arrow-parens': [
          1,
          'always',
          {
            requireForBlockBody: true,
          },
        ],
        'class-methods-use-this': 0,
        'comma-dangle': 0,
        'function-paren-newline': 0, // prettier
        'implicit-arrow-linebreak': 0, // prettier
        'import/default': 2,
        'import/export': 2,
        'import/first': 2,
        'import/named': 2,
        'import/namespace': 2,
        'import/newline-after-import': 2,
        'import/no-cycle': 2,
        'import/no-extraneous-dependencies': [
          2,
          {
            devDependencies: true,
          },
        ],
        'import/order': 0, // simple-import-sort/sort
        'import/prefer-default-export': 0,
        'max-classes-per-file': 0,
        'max-lines': [
          2,
          {
            max: 500,
            skipBlankLines: false,
            skipComments: true,
          },
        ],
        'max-lines-per-function': [
          2,
          {
            max: 200,
            skipBlankLines: false,
            skipComments: true,
          },
        ],
        'no-await-in-loop': 0,
        'no-continue': 0,
        'no-plusplus': [
          2,
          {
            allowForLoopAfterthoughts: true,
          },
        ],
        'no-promise-executor-return': 0,
        'no-restricted-syntax': 0,
        'padding-line-between-statements': [
          2,
          { blankLine: 'always', next: 'if', prev: '*' },
          { blankLine: 'always', next: '*', prev: 'if' },
          {
            blankLine: 'always',
            next: '*',
            prev: ['block-like'],
          },
        ],
        'react/jsx-filename-extension': 0,
        'require-await': 0, // @typescript-eslint/require-await
        'simple-import-sort/imports': [
          2,
          {
            groups: [
              // Side effect imports.
              ['^\\u0000'],
              // Packages.
              // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
              ['^@?\\w'],
              // Absolute imports and other imports such as Vue-style `@/foo`.
              // Anything not matched in another group.
              ['^'],
              // Relative imports.
              // Anything that starts with a dot.
              ['^\\.'],
              // Interfaces, typings
              ['^\\..*(\\/|\\.)(interface|types$|typings$)'],
              // Constants
              ['^\\..*(\\/|\\.)(constant|config)'],
            ],
          },
        ],
        'sort-imports': 0,
        'sort-keys': 0,
      },
      // plugins: ['@typescript-eslint/eslint-plugin'],
      env: {
        jest: true,
        node: true,
      },
    },
  ],

  plugins: ['@typescript-eslint', 'jest', 'simple-import-sort', 'prettier'],
  ignorePatterns: ['.eslintrc.js'],
  root: true,
};
