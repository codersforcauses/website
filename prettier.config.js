/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  trailingComma: "all",
  semi: false,
  endOfLine: "lf",
  printWidth: 120,
  tabWidth: 2,
  tailwindConfig: "./tailwind.config.ts",
  importOrder: ["^~/components/(.*)$", "^~/(.*)$", "^[./]"],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"],
}

export default config
