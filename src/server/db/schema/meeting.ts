import { index, pgEnum } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"

import { createTable, timestamps } from "./util"
import { users } from "./user"

export const meetingStatusEnum = pgEnum("meeting-status", ["upcoming", "ongoing", "completed", "cancelled"])
export const generalMeetings = createTable(
  "general_meetings",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    slug: d.varchar("title", { length: 256 }).unique().notNull(),
    title: d.varchar("title", { length: 256 }).unique().notNull(),
    start: d.timestamp("start", { withTimezone: true }).notNull(),
    end: d.timestamp("end", { withTimezone: true }),
    venue: d.varchar("venue", { length: 512 }), // need to change to output from mapbox
    agenda: d.text(),
    status: meetingStatusEnum("status").default("upcoming").notNull(),
    createdBy: d.uuid("user_id").references(() => users.id, { onDelete: "set null" }), // keep meeting even if user is deleted

    ...timestamps,
  }),
  (t) => [index("slug_idx").on(t.slug)],
)

export const positions = createTable(
  "positions",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
    title: d.text("title").notNull(),
    description: d.text(),
    priority: d.smallint().notNull(), // position order for election
    openings: d.smallint().notNull().default(1),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const candidates = createTable(
  "candidates",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: d.uuid("user_id").references(() => users.id, { onDelete: "set null" }), // keep candidate data even if user is deleted
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const nominations = createTable(
  "nominations",
  (d) => ({
    candidateId: d
      .uuid("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    positionId: d
      .uuid("position_id")
      .notNull()
      .references(() => positions.id, { onDelete: "cascade" }),
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const questionTypeEnum = pgEnum("question-type", ["short", "long", "checkbox"])
export const questions = createTable(
  "questions",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
    order: d.smallint().notNull(), // question order for candidate application
    text: d.text().notNull(),
    type: questionTypeEnum().default("short"),
    required: d.boolean().default(false),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const answers = createTable(
  "answers",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    candidateId: d
      .uuid("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    questionId: d
      .uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    text: d.text().notNull(),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

//Generates voter for when they go to the link and shows on the admin page to get approved
export const voters = createTable(
  "voters",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: d.uuid("user_id").references(() => users.id, { onDelete: "set null" }),
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
    approved: d.boolean().default(false).notNull(),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

// called race in legacy system
export const contestStatusEnum = pgEnum("contest-status", ["closed", "open", "finished"]) // maybe add "restarted" status later
// maybe generate contests only when meeting has started
export const contests = createTable(
  "contests",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
    positionId: d
      .uuid("position_id")
      .notNull()
      .references(() => positions.id, { onDelete: "cascade" }),
    status: contestStatusEnum().default("closed"),
    current: d.boolean().default(false),
    tally: d.json(),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const votes = createTable(
  "votes",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    voterId: d
      .uuid("voter_id")
      .notNull()
      .references(() => voters.id, { onDelete: "cascade" }),
    contestId: d
      .uuid("contest_id")
      .notNull()
      .references(() => contests.id, { onDelete: "cascade" }),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const votePreferences = createTable(
  "vote_preferences",
  (d) => ({
    voteId: d
      .uuid("vote_id")
      .notNull()
      .references(() => votes.id, { onDelete: "cascade" }),
    candidateId: d
      .uuid("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    preference: d.smallint().notNull(),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const winners = createTable(
  "winners",
  (d) => ({
    candidateId: d
      .uuid("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    contestId: d
      .uuid("contest_id")
      .notNull()
      .references(() => contests.id, { onDelete: "cascade" }),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)
