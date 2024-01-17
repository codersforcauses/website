import type { Config } from "drizzle-kit"

import { env } from "~/env"

export default {
	schema: "./src/server/db/schema.ts",
	driver: "mysql2",
	dbCredentials: {
		uri: env.DATABASE_URL,
	},
	tablesFilter: ["cfc-website_*"],
} satisfies Config
