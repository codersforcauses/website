import { index, uniqueIndex } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"

import { createTable, timestamps } from "./util"

export const users = createTable(
  "user",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    name: d.text().notNull(),
    preferredName: d.text("preferred_name").notNull(),
    email: d.text().notNull().unique(),
    emailVerified: d.boolean("email_verified").default(false).notNull(),
    image: d.text(),
    pronouns: d.text().notNull(),
    studentNumber: d.varchar("student_number", { length: 8 }).unique(),
    university: d.text(), // non UWA
    github: d.text().unique(),
    discord: d.text().unique(),
    subscribe: d.boolean().default(true),
    squareCustomerId: d.text("square_customer_id").unique(),

    // admin plugin
    role: d.text(),
    banned: d.boolean().default(false),
    banReason: d.text("ban_reason"),
    banExpires: d.timestamp("ban_expires", { withTimezone: true }),
    ...timestamps,
  }),
  (t) => [uniqueIndex("user_email_idx").on(t.email), index("user_name_idx").on(t.name)],
)

export const accounts = createTable(
  "account",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: d
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerId: d.text("provider_id").notNull(),
    accountId: d.text("account_id").notNull(),
    idToken: d.text("id_token"),
    refreshToken: d.text("refresh_token"),
    accessToken: d.text("access_token"),
    refreshTokenExpiresAt: d.timestamp("refresh_token_expires_at", {
      withTimezone: true,
    }),
    accessTokenExpiresAt: d.timestamp("access_token_expires_at", {
      withTimezone: true,
    }),
    scope: d.text(),
    password: d.text(),
    ...timestamps,
  }),
  (t) => [index("account_user_id_idx").on(t.userId)],
)

export const sessions = createTable(
  "session",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    token: d.text().notNull().unique(),
    ipAddress: d.text("ip_address"),
    userAgent: d.text("user_agent"),
    userId: d
      .uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    impersonatedBy: d.uuid("impersonated_by").references(() => users.id),
    expiresAt: d.timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
    ...timestamps,
  }),
  (t) => [index("session_user_id_idx").on(t.userId), index("session_token_idx").on(t.token)],
)

export const verifications = createTable(
  "verification",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    identifier: d.text().notNull(),
    value: d.text().notNull(),
    expiresAt: d.timestamp("expires_at", { mode: "date", withTimezone: true }).notNull(),
    ...timestamps,
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)],
)
