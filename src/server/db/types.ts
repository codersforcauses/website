import { Payment, Project, type User } from "./schema"

export type User = typeof User.$inferSelect

export type Payment = typeof Payment.$inferSelect

export type Project = typeof Project.$inferSelect
