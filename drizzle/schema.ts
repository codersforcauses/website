import {
  pgEnum,
  pgTable,
  uuid,
  varchar,
  text,
  smallint,
  bigint,
  boolean,
  timestamp,
  jsonb,
  json,
  index,
  uniqueIndex,
  foreignKey,
  primaryKey,
  unique,
} from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const contestStatus = pgEnum("contest-status", ["closed", "open", "finished"])
export const meetingStatus = pgEnum("meeting-status", ["draft", "upcoming", "ongoing", "completed", "cancelled"])
export const questionType = pgEnum("question-type", ["short", "long", "checkbox"])

export const cfcWebsiteAccount = pgTable(
  "cfc_website_account",
  {
    id: uuid().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => cfcWebsiteUser.id, { onDelete: "cascade" }),
    providerId: text("provider_id").notNull(),
    accountId: text("account_id").notNull(),
    idToken: text("id_token"),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { precision: 6, withTimezone: true }),
    accessTokenExpiresAt: timestamp("access_token_expires_at", { precision: 6, withTimezone: true }),
    scope: text(),
    password: text(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
  },
  (table) => [index("account_user_id_idx").using("btree", table.userId.asc().nullsLast())],
)

export const cfcWebsiteAnswer = pgTable("cfc_website_answer", {
  id: uuid().primaryKey(),
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => cfcWebsiteCandidate.id, { onDelete: "cascade" }),
  questionId: uuid("question_id")
    .notNull()
    .references(() => cfcWebsiteQuestion.id, { onDelete: "cascade" }),
  text: text().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteCandidate = pgTable("cfc_website_candidate", {
  id: uuid().primaryKey(),
  userId: uuid("user_id").references(() => cfcWebsiteUser.id, { onDelete: "set null" }),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
})

export const cfcWebsiteContest = pgTable("cfc_website_contest", {
  id: uuid().primaryKey(),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
  positionId: uuid("position_id")
    .notNull()
    .references(() => cfcWebsitePosition.id, { onDelete: "cascade" }),
  status: contestStatus().default("'closed'::\"contest-status\""),
  current: boolean().default(false),
  tally: json(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteGeneralMeeting = pgTable(
  "cfc_website_general_meeting",
  {
    id: uuid().primaryKey(),
    slug: varchar({ length: 256 }).notNull(),
    title: varchar({ length: 256 }).notNull(),
    start: timestamp({ withTimezone: true }).notNull(),
    end: timestamp({ withTimezone: true }),
    venue: jsonb(),
    agenda: text(),
    status: meetingStatus().default("'draft'::\"meeting-status\"").notNull(),
    createdBy: uuid("created_by").references(() => cfcWebsiteUser.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
    venueFallback: varchar("venue_fallback", { length: 128 }),
    room: varchar({ length: 128 }),
  },
  (table) => [
    index("slug_idx").using("btree", table.slug.asc().nullsLast()),
    unique("cfc_website_general_meetings_slug_key").on(table.slug),
  ],
)

export const cfcWebsiteNomination = pgTable("cfc_website_nomination", {
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => cfcWebsiteCandidate.id, { onDelete: "cascade" }),
  positionId: uuid("position_id")
    .notNull()
    .references(() => cfcWebsitePosition.id, { onDelete: "cascade" }),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
})

export const cfcWebsitePayment = pgTable("cfc_website_payment", {
  id: uuid().primaryKey(),
  userId: uuid("user_id").references(() => cfcWebsiteUser.id, { onDelete: "set null" }),
  amount: bigint({ mode: "number" }).notNull(),
  currency: varchar({ length: 3 }).default("AUD").notNull(),
  label: varchar({ length: 256 }).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsitePosition = pgTable("cfc_website_position", {
  id: uuid().primaryKey(),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
  title: text().notNull(),
  description: text().default("").notNull(),
  priority: smallint().notNull(),
  openings: smallint().default(1).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteQuestion = pgTable("cfc_website_question", {
  id: uuid().primaryKey(),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
  order: smallint().notNull(),
  text: text().default("").notNull(),
  type: questionType().default("'short'::\"question-type\"").notNull(),
  required: boolean().default(false).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteSession = pgTable(
  "cfc_website_session",
  {
    id: uuid().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => cfcWebsiteUser.id, { onDelete: "cascade" }),
    token: text().notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    impersonatedBy: uuid("impersonated_by").references(() => cfcWebsiteUser.id),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
  },
  (table) => [
    index("session_token_idx").using("btree", table.token.asc().nullsLast()),
    index("session_user_id_idx").using("btree", table.userId.asc().nullsLast()),
    unique("cfc_website_session_token_key").on(table.token),
  ],
)

export const cfcWebsiteUser = pgTable(
  "cfc_website_user",
  {
    id: uuid().primaryKey(),
    name: text().notNull(),
    preferredName: text("preferred_name").notNull(),
    email: text().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text(),
    pronouns: text().notNull(),
    bio: text(),
    studentNumber: varchar("student_number", { length: 8 }),
    university: text(),
    github: text(),
    discord: text(),
    subscribe: boolean().default(true),
    squareCustomerId: text("square_customer_id"),
    role: text(),
    banned: boolean().default(false),
    banReason: text("ban_reason"),
    banExpires: timestamp("ban_expires", { precision: 6, withTimezone: true }),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
  },
  (table) => [
    uniqueIndex("user_email_idx").using("btree", table.email.asc().nullsLast()),
    index("user_name_idx").using("btree", table.name.asc().nullsLast()),
    unique("cfc_website_user_discord_key").on(table.discord),
    unique("cfc_website_user_email_key").on(table.email),
    unique("cfc_website_user_github_key").on(table.github),
    unique("cfc_website_user_square_customer_id_key").on(table.squareCustomerId),
    unique("cfc_website_user_student_number_key").on(table.studentNumber),
  ],
)

export const cfcWebsiteVerification = pgTable(
  "cfc_website_verification",
  {
    id: uuid().primaryKey(),
    identifier: text().notNull(),
    value: text().notNull(),
    expiresAt: timestamp("expires_at", { precision: 6, withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
      .default(sql`now()`)
      .notNull(),
    updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
  },
  (table) => [index("verification_identifier_idx").using("btree", table.identifier.asc().nullsLast())],
)

export const cfcWebsiteVote = pgTable("cfc_website_vote", {
  id: uuid().primaryKey(),
  voterId: uuid("voter_id")
    .notNull()
    .references(() => cfcWebsiteVoter.id, { onDelete: "cascade" }),
  contestId: uuid("contest_id")
    .notNull()
    .references(() => cfcWebsiteContest.id, { onDelete: "cascade" }),
})

export const cfcWebsiteVotePreference = pgTable("cfc_website_vote_preference", {
  voteId: uuid("vote_id")
    .notNull()
    .references(() => cfcWebsiteVote.id, { onDelete: "cascade" }),
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => cfcWebsiteCandidate.id, { onDelete: "cascade" }),
  preference: smallint().notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteVoter = pgTable("cfc_website_voter", {
  id: uuid().primaryKey(),
  userId: uuid("user_id").references(() => cfcWebsiteUser.id, { onDelete: "set null" }),
  meetingId: uuid("meeting_id")
    .notNull()
    .references(() => cfcWebsiteGeneralMeeting.id, { onDelete: "cascade" }),
  approved: boolean().default(false).notNull(),
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .default(sql`now()`)
    .notNull(),
  updatedAt: timestamp("updated_at", { precision: 6, withTimezone: true }),
})

export const cfcWebsiteWinner = pgTable("cfc_website_winner", {
  candidateId: uuid("candidate_id")
    .notNull()
    .references(() => cfcWebsiteCandidate.id, { onDelete: "cascade" }),
  contestId: uuid("contest_id")
    .notNull()
    .references(() => cfcWebsiteContest.id, { onDelete: "cascade" }),
})
