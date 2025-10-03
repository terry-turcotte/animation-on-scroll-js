// ESLint flat config
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new

export default [
  {
    files: ["**/*.js"],
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**"
    ],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      // Best practices
      eqeqeq: "error",
      curly: "error",

      // Possible problems
      "no-undef": "error",
      "no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],

      // Stylistic (keep minimal, can be adjusted later)
      "no-trailing-spaces": "warn",
      "eol-last": ["warn", "always"]
    }
  }
];