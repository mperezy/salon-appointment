import pluginJs from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
// export default [
//   { files: ["**/*.{js,mjs,cjs,ts}"] },
//   { languageOptions: { globals: globals.browser } },
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

export default tseslint.config(
  {
    ignores: [
      "dist",
      "node_modules",
      "app/src/graphql-generated",
      "server/src/graphql-server/generated",
      "server/src/prisma/generated",
    ],
  },
  {
    extends: [pluginJs.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "linebreak-style": ["error", "unix"],
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-imports": "error",
      semi: ["error", "always"],
      eqeqeq: ["error", "always"],

      "max-len": [
        "error",
        {
          code: 100,
          ignoreComments: true,
        },
      ],

      "no-console": "error",

      "no-trailing-spaces": [
        "error",
        {
          skipBlankLines: true,
        },
      ],

      "eol-last": ["error", "always"],
    },
  },
);
