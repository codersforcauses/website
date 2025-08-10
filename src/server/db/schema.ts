import { bigint, boolean, index, pgEnum, pgTableCreator, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
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

    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
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

    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (payment) => [index("user_id_idx").on(payment.user_id), index("event_id_idx").on(payment.event_id)],
)

export const iconEnum = pgEnum("icon", PROJECT_ICONS)
export const typeEnum = pgEnum("type", PROJECT_TYPES)

// TODO: add view for project members
// for projects
export const Project = pgTable(
  "project",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    icon: iconEnum("icon").notNull(), // icon for the types of project
    logo: varchar("logo", { length: 256 }).notNull(),
    img: varchar("img", { length: 256 }),
    name: varchar("name", { length: 256 }).notNull(),
    client: varchar("client", { length: 256 }).notNull(),
    type: typeEnum("icon").notNull(), // e.g. Mobile application, PWA, Website
    start_date: timestamp("start_date").$default(() => new Date()), // start_date in the form
    end_date: timestamp("end_date").$default(() => new Date()), // end_date in the form
    website_url: varchar("url", { length: 256 }), // link in the form
    source: varchar("source", { length: 256 }), // source code link
    impact: varchar("impact", { length: 1024 }).array().notNull(), // impact of the project, <string>[]
    desc: varchar("desc", { length: 2048 }).notNull(), // description of the project
    tech: varchar("tech", { length: 256 }).array().notNull(), // technologies used in the project, <string>[]
    is_receiving_application: boolean("is_receiving_application").default(false).notNull(), // whether the project is receiving applications or not
    application_url: varchar("application_url", { length: 256 }), // link to the application form
    is_archived: boolean("is_archived").default(false).notNull(), // archived projects means they are visible on projects page
    createdAt: timestamp("created_at")
      .$default(() => new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (project) => [index("name_idx").on(project.name)],
)

// for project members
export const ProjectMember = pgTable(
  "project_member",
  {
    id: uuid("id")
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    project_id: uuid("project_id").references(() => Project.id, { onDelete: "cascade", onUpdate: "cascade" }),
    user_id: uuid("user_id").references(() => User.id, { onDelete: "cascade", onUpdate: "cascade" }),
    joinedAt: timestamp("joined_at")
      .$default(() => new Date())
      .notNull(),
  },
  (projectMember) => [index("project_user_idx").on(projectMember.project_id, projectMember.user_id)],
)
