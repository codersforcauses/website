import { bigint, boolean, index, jsonb, pgEnum, pgTableCreator, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { invoicePaymentReminderSchema } from "square/dist/types/models/invoicePaymentReminder"
import { v7 as uuidv7 } from "uuid"

import { NAMED_ROLES, PROJECT_ICONS, PROJECT_TYPES } from "~/lib/constants"

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const pgTable = pgTableCreator((name) => `cfc-website_${name}`)

export const roleEnum = pgEnum("role", NAMED_ROLES) // honorary: hlm, past: past committee

export const User = pgTable(
  "user",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    clerk_id: varchar("clerk_id", { length: 32 }).unique().notNull(),
    email: varchar("email", { length: 256 }).unique().notNull(),
    name: varchar("name", { length: 256 }).notNull(),
    preferred_name: varchar("preferred_name", { length: 64 }).notNull(),
    pronouns: varchar("pronouns", { length: 32 }).notNull(),
    /// This is not forced to be unique because we don't verify student number at the moment
    /// If this was unique someone could claim an student number of another student and
    /// prevent them from signing up.
    student_number: varchar("student_number", { length: 8 }),
    university: varchar("university", { length: 128 }),
    github: varchar("github", { length: 128 }),
    discord: varchar("discord", { length: 128 }),
    subscribe: boolean("subscribe").default(true).notNull(),
    role: roleEnum("role"),
    square_customer_id: varchar("square_customer_id", { length: 32 }).unique().notNull(),
    membership_expiry: timestamp("membership_expiry"),
    created_at: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
    // `reminder_pending` id a Flag used to send reminders for membership renewal bc Resend can only send 100 emails per day
    reminder_pending: boolean("reminder_pending").default(false).notNull(),
  },
  (user) => [index("role_idx").on(user.role)],
)

// for refunds and payment history
export const Payment = pgTable(
  "payment",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    user_id: uuid("user_id").references(() => User.id, { onDelete: "set null" }), // guest access in future
    amount: bigint("amount", {
      mode: "bigint",
    }).notNull(),
    currency: varchar("currency", { length: 3 }).default("AUD").notNull(),
    label: varchar("label", { length: 256 }).notNull(),
    event_id: varchar("event_id", { length: 32 }), // TODO: link when events are implemented

    created_at: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (payment) => [index("user_id_idx").on(payment.user_id), index("event_id_idx").on(payment.event_id)],
)

export const iconEnum = pgEnum("project_icon", PROJECT_ICONS)
export const typeEnum = pgEnum("project_type", PROJECT_TYPES)
type TechItem = {
  label: string
  value: string
  path: string
}

type ImpactItem = {
  value: string
}

export const Project = pgTable(
  "project",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    icon: iconEnum("icon"), // icon for the types of project, auto created and updated. depends on the type
    logo_path: varchar("logo_path", { length: 256 }).notNull(),
    img_path: varchar("img_path", { length: 256 }),
    name: varchar("name", { length: 256 }).notNull().unique(),
    client: varchar("client", { length: 256 }).notNull(),
    type: typeEnum("type").notNull(), // e.g. Mobile application, PWA, Website
    start_date: timestamp("start_date"), // start_date in the form
    end_date: timestamp("end_date"), // end_date in the form
    website_url: varchar("website_url", { length: 256 }), // link in the form
    github_url: varchar("github_url", { length: 256 }), // source code link
    impact: jsonb("impact").$type<ImpactItem[]>(), // impact of the project, <string>[]
    description: varchar("description", { length: 1024 }).notNull(), // description of the project
    tech: jsonb("tech").$type<TechItem[]>(), // technologies used in the project, <string>[]
    members: varchar("members", { length: 256 }).array(), // array of user emails
    is_application_open: boolean("is_application_open").default(false).notNull(), // whether the project is receiving applications or not
    application_url: varchar("application_url", { length: 256 }), // link to the application form
    is_public: boolean("is_public").default(false).notNull(), //  means they are visible on projects page
    created_at: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updated_at: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (project) => [index("name_idx").on(project.name)],
)
export const insertProjectSchema = createInsertSchema(Project)
