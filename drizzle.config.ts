import type { Config } from "drizzle-kit"

import { env } from "~/env"

export default {
  schema: "./src/server/db/schema.ts",
  driver: "mysql2",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["website_*"],
} satisfies Config
