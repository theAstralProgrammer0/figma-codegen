export default [
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    ignores: ["node_modules", "dist", "build"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },
    plugins: {
      prettier: require("eslint-plugin-prettier")
    },
    rules: {
      "prettier/prettier": "error" // treat prettier issues as ESLint errors
    }
  }
];

