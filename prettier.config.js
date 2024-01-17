/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  trailingComma: "all",
  semi: false,
  endOfLine: "lf",
  printWidth: 120,
  tabWidth: 2,
  tailwindConfig: "./tailwind.config.ts",
  plugins: ["prettier-plugin-tailwindcss"],
}

export default config
