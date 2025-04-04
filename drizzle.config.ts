import { defineConfig } from "drizzle-kit"

import { getXataClient } from "~/server/db/xata"

export default defineConfig({
  out: "./src/server/db/migrations",
  schema: "./src/server/db/schema.ts",
  verbose: true,
  dialect: "postgresql",
  tablesFilter: ["cfc-website_*"],
  dbCredentials: {
    url: getXataClient().sql.connectionString,
  },
})
