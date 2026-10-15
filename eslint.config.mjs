import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // The service-role client is importable only from the LMS domain layer and route handlers (TSD 2.1, R42).
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/lms/service-role", "**/lms/service-role"],
              message: "The service-role client may only be imported from src/lms and src/app/api.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/lms/**", "src/app/api/**"],
    rules: { "no-restricted-imports": "off" },
  },
]);

export default eslintConfig;
