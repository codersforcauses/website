/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config = {
  trailingComma: "all",
  semi: false,
  endofline: "lf",
  maxLength: 120,
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
