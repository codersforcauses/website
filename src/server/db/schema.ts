import { relations, sql } from "drizzle-orm"
import {
  bigint,
  boolean,
  index,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `cfc-website_${name}`)

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 32 }).primaryKey(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    preferred_name: varchar("preferred_name", { length: 64 }).notNull(),
    pronouns: varchar("pronouns", { length: 32 }).notNull(),
    student_number: varchar("student_number", { length: 8 }).unique(),
    university: varchar("university", { length: 128 }), // non UWA
    github: varchar("github", { length: 128 }),
    discord: varchar("discord", { length: 128 }),
    subscribe: boolean("subscribe").default(true),
    role: mysqlEnum("role", ["member", "committee", "executive", "past", "honorary", "admin"]), // honorary: hlm, past: past committee

    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (user) => ({
    emailIndex: index("email_idx").on(user.email),
  }),
)
