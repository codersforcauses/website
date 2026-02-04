import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./src/server/db/migrations",
  schema: "./src/server/db/schema.ts",
  verbose: true,
  dialect: "postgresql",
  tablesFilter: ["cfc-website_*"],
  dbCredentials: {
    url: process.env.SUPABASE_DB_URL!,
  },
})
