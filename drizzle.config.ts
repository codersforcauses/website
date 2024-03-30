import type { Config } from "drizzle-kit"
import { getXataClient } from "~/server/db/xata"

// const xata = getXataClient()

export default {
  schema: "./src/server/db/schema.ts",
  verbose: true,
  driver: "pg",
  tablesFilter: ["cfc-website_*"],
} satisfies Config
