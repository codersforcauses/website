import type { users, accounts, sessions, verifications, payments } from "~/server/db/schema"

export type User = typeof users.$inferSelect
export type Payment = typeof payments.$inferSelect

// ? Remove these later, not sure if it will be used but kept for now
export type Account = typeof accounts.$inferSelect
export type Session = typeof sessions.$inferSelect
export type Verification = typeof verifications.$inferSelect
