import { defineConfig } from "drizzle-kit"
import { env } from "~/env"

export default defineConfig({
  out: "./drizzle",
  schema: "./src/server/db/schema/index.ts",
  dialect: "postgresql",
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["cfc_website_*"],
})
