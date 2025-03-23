// @ts-check
const tseslint = require("typescript-eslint");
const rootConfig = require("../../eslint.config.js");

module.exports = tseslint.config(
  ...rootConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "mtt",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "mtt",
          style: "kebab-case",
        },
      ],
      "@typescript-eslint/no-empty-function": "warn",
      "@/semi": "error",
      "@/quotes": [
        "error",
        "single",
        {
          "avoidEscape": true,
          "allowTemplateLiterals": true
        }
      ],
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@angular-eslint/component-class-suffix": [
        "warn",
        {
          "suffixes": [
            "Component",
            "",
          ]
        }
      ]
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  }
);
