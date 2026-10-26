import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {ignores: ["**/*.js", "**/*.d.ts"]},
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {"@stylistic": stylistic},
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-require-imports": ["error", {allowAsImport: true}],
            "@stylistic/semi": "error",
            "@stylistic/quotes": "error",
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/member-delimiter-style": "error",
        },
    },
);
