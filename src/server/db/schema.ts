import { boolean, decimal, index, pgEnum, pgTableCreator, serial, timestamp, varchar } from "drizzle-orm/pg-core"

import { NAMED_ROLES } from "~/lib/constants"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `cfc-website_${name}`)

export const roleEnum = pgEnum("role", NAMED_ROLES) // honorary: hlm, past: past committee

export const users = pgTable(
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
    subscribe: boolean("subscribe").default(true).notNull(),
    role: roleEnum("role"),
    square_customer_id: varchar("square_customer_id", { length: 32 }).unique().notNull(),

    // might not need since xata handles it
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (user) => ({
    roleIndex: index("role_idx").on(user.role),
  }),
)

// for refunds and payment history
export const payments = pgTable(
  "payment",
  {
    id: serial("id").primaryKey(),
    user_id: varchar("user_id", { length: 32 }), // guest access in future
    amount: decimal("amount", { scale: 2 }).notNull(),
    currency: varchar("currency", { length: 3 }).default("AUD").notNull(),
    label: varchar("label", { length: 256 }).notNull(),
    event_id: varchar("event_id", { length: 32 }), // TODO: link when events are implemented

    // might not need since xata handles it
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (payment) => ({
    userIndex: index("user_id_idx").on(payment.user_id),
    eventIndex: index("event_id_idx").on(payment.event_id),
  }),
)
