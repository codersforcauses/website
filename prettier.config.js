/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  trailingComma: "all",
  semi: false,
  tabWidth: 2,
  endOfLine: "lf",
  printWidth: 120,
  plugins: [
    "prettier-plugin-tailwindcss",
    // "@trivago/prettier-plugin-sort-imports"
  ],
  tailwindFunctions: ["cva", "cn"],
  tailwindStylesheet: "./src/styles/globals.css",
  // importOrder: ["^~/components/(.*)$", "^~/(.*)$", "^[./]"],
  // importOrderSeparation: true,
  // importOrderSortSpecifiers: true,
}

export default config
