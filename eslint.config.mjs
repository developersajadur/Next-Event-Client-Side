import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["node_modules", "dist"],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Adjust these rules as needed
      "@typescript-eslint/no-explicit-any": "off", // Disable any type warnings
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { 
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }
      ],
      "react/no-unescaped-entities": "off", // Disable HTML entity warnings
      "react-hooks/exhaustive-deps": "warn", // Keep as warning
      "@typescript-eslint/no-non-null-asserted-optional-chain": "warn", // Keep as warning
      "react-hooks/rules-of-hooks": "error", // Keep as error (important)
    },
  },
];

export default eslintConfig;
