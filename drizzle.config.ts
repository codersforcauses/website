import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema.ts",
  verbose: true,
  tablesFilter: ["cfc-website_*"],
  // drizzle-kit does not support http connections, use the xata cli instead
  // dbCredentials: {
  //   url: process.env.XATA_DATABASE_URL!,
  // },
})
