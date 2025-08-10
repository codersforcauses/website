import { type User } from "./schema"

export type User = typeof User.$inferSelect

export type Payment = typeof User.$inferSelect

export type Project = typeof User.$inferSelect

export type ProjectMember = typeof User.$inferSelect
