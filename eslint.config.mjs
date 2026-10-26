import eslint from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {ignores: ["**/*.js"]},
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {"@stylistic": stylistic},
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "@stylistic/semi": "error",
            "@stylistic/quotes": "error",
            "@stylistic/comma-dangle": ["error", "always-multiline"],
            "@stylistic/member-delimiter-style": "error",
        },
    },
);
