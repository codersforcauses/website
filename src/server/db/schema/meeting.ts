import { index, pgEnum } from "drizzle-orm/pg-core"
import { uuidv7 } from "uuidv7"
import * as z from "zod"

import type { retrieveSuggestion } from "~/lib/mapbox"
import { MEETING_CONTEST_STATUS, MEETING_STATUS, MEETING_QUESTION_TYPE } from "~/lib/constants"
import { createTable, timestamps } from "./util"
import { users } from "./user"

export const meetingStatusEnum = pgEnum("meeting-status", MEETING_STATUS)
export const generalMeetings = createTable(
  "general_meeting",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    slug: d.varchar("slug", { length: 256 }).unique().notNull(),
    title: d.varchar("title", { length: 256 }).notNull(),
    start: d.timestamp("start", { withTimezone: true }).notNull(),
    end: d.timestamp("end", { withTimezone: true }),
    room: d.varchar("room", { length: 128 }),
    venue: d.jsonb().$type<z.infer<typeof retrieveSuggestion>["features"][number]>(),
    venueFallback: d.varchar("venue_fallback", { length: 128 }),
    agenda: d.text(),
    status: meetingStatusEnum("status").default("draft").notNull(),
    createdBy: d.uuid("created_by").references(() => users.id, { onDelete: "set null" }), // keep meeting even if user is deleted
    ...timestamps,
  }),
  (t) => [
    index("slug_idx").on(t.slug),
    // !maybe index the start date and status to fetch upcoming meetings
    // index("date_idx").on(t.start),
  ],
)

export const positions = createTable(
  "position",
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
    description: d.text().notNull().default(""),
    priority: d.smallint().notNull(), // position order for election
    openings: d.smallint().notNull().default(1),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const candidates = createTable(
  "candidate",
  (d) => ({
    id: d
      .uuid()
      .primaryKey()
      .$defaultFn(() => uuidv7()),
    userId: d.uuid("user_id").references(() => users.id, { onDelete: "set null" }), // keep candidate data even if user is deleted
    meetingId: d
      .uuid("meeting_id")
      .notNull()
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const nominations = createTable(
  "nomination",
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
      .references(() => generalMeetings.id, { onDelete: "cascade" }),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const questionTypeEnum = pgEnum("question-type", MEETING_QUESTION_TYPE)
export const questions = createTable(
  "question",
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
    text: d.text().notNull().default(""),
    type: questionTypeEnum().notNull().default("short"),
    required: d.boolean().notNull().default(false),
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const answers = createTable(
  "answer",
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
    ...timestamps,
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

//Generates voter for when they go to the link and shows on the admin page to get approved
export const voters = createTable(
  "voter",
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
export const contestStatusEnum = pgEnum("contest-status", MEETING_CONTEST_STATUS) // maybe add "restarted" status later
// maybe generate contests only when meeting has started
export const contests = createTable(
  "contest",
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
  "vote",
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
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)

export const votePreferences = createTable(
  "vote_preference",
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
  "winner",
  (d) => ({
    candidateId: d
      .uuid("candidate_id")
      .notNull()
      .references(() => candidates.id, { onDelete: "cascade" }),
    contestId: d
      .uuid("contest_id")
      .notNull()
      .references(() => contests.id, { onDelete: "cascade" }),
  }),
  // (t) => [index("verification_identifier_idx").on(t.identifier)],
)
