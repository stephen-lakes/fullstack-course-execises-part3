const globals = require("globals");
const stylisticJs = require("@stylistic/eslint-plugin-js");
const js = require("@eslint/js");

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  _overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}", "**/*.js"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  get overrides() {
    return this._overrides;
  },
  set overrides(value) {
    this._overrides = value;
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/linebreak-style": ["error", "unix"],
    "@stylistic/js/quotes": [
      "error",
      "double",
      { allowTemplateLiterals: true },
    ],
    "@stylistic/js/semi": ["error", "never"],
    eqeqeq: "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { before: true, after: true }],
    "no-console": "off",
  },
  ignorePatterns: ["dist/**", "build/**"], // Corrected property name
};
