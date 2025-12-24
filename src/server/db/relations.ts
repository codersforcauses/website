import { defineRelations } from "drizzle-orm"
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  users: {
    accounts: r.many.accounts(),
    sessions: r.many.sessions(),
    payments: r.many.payments(),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  verifications: {},
  payments: {
    user: r.one.users({
      from: r.payments.userId,
      to: r.users.id,
    }),
  },
  generalMeetings: {
    user: r.one.users({
      from: r.generalMeetings.createdBy,
      to: r.users.id,
    }),
  },
  // candidates: {},
  // positions: {},
  // nominations: {},
  // questions: {},
  // answers: {},
  // voters: {},
  // contests: {},
  // votes: {},
  // votePreferences: {},
  winners: {
    candidate: r.one.candidates({
      from: r.winners.candidateId,
      to: r.candidates.id,
    }),
  },
}))
