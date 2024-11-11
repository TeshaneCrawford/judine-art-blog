const eslintPluginAstro = require('eslint-plugin-astro');
const typescriptParser = require('@typescript-eslint/parser');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y')

module.exports = [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],

  {
    files: ['*.ts', '*.tsx'],
    parser: typescriptParser,
    parserOptions: {
      project: './tsconfig.json',
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  
  // JSX A11y recommended configuration
  ...eslintPluginJsxA11y.configs.recommended,
  
  // Astro specific files configuration
  {
    files: ['*.astro'],
    parser: 'astro-eslint-parser',
    parserOptions: {
      parser: typescriptParser,
      extraFileExtensions: ['.astro']
    },
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  },
  {
    ignores: ['dist', 'node_modules', '.github', 'types.generated.d.ts', '.astro'],
  },
];