import eslintPluginAstro from 'eslint-plugin-astro';
import astroEslintParser from 'astro-eslint-parser';
import typescriptParser from '@typescript-eslint/parser';
import jsxA11y from 'eslint-plugin-jsx-a11y'
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
//   {
//     files: ['**/*.astro'],
//     languageOptions: {
//       parser: astroEslintParser,
//       parserOptions: {
//         parser: '@typescript-eslint/parser',
//         extraFileExtensions: ['.astro'],
//       },
//     },
//   },
  {
        // Define the configuration for `<script>` tag.
    // Script in `<script>` is assigned a virtual file name with the `.js` extension.
    // files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    // languageOptions: {
    //   parser: typescriptParser,
    // },
    // files: ['**/*.{js,ts,tsx,jsx,vue,astro}'],
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    }
  },
//   {
//     ignores: ['dist', 'node_modules', '.github', 'types.generated.d.ts'],
//   },
];