import { uuidv7 } from "uuidv7"

import { createTable } from "./prefix"
import { users } from "./user"

export const payments = createTable(
  "payment",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: d.uuid("user_id").references(() => users.id, { onDelete: "set null" }), // guest access in future
    amount: d
      .bigint("amount", {
        mode: "bigint",
      })
      .notNull(),
    currency: d.varchar("currency", { length: 3 }).default("AUD").notNull(),
    label: d.varchar("label", { length: 256 }).notNull(),
    // eventId: d
    //   .uuid("event_id")
    //   .references(() => users.id, { onDelete: "set null" }), // TODO: add events table
    createdAt: d.timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: d.timestamp("updated_at", { withTimezone: true }).$onUpdate(() => new Date()),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export * from "./user"
export * from "./meeting"
