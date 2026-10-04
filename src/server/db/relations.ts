import { defineRelations } from "drizzle-orm"
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  users: {
    accounts: r.many.accounts(),
    sessions: r.many.sessions(),
    payments: r.many.payments(),
    voters: r.many.voters(),
    candidates: r.many.candidates(),
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
    positions: r.many.positions(),
    candidates: r.many.candidates(),
    questions: r.many.questions(),
    voters: r.many.voters(),
  },
  candidates: {
    user: r.one.users({
      from: r.candidates.userId,
      to: r.users.id,
    }),
    generalMeeting: r.one.generalMeetings({
      from: r.candidates.meetingId,
      to: r.generalMeetings.id,
      optional: false,
    }),
    positions: r.many.positions({
      from: r.candidates.id.through(r.nominations.candidateId),
      to: r.positions.id.through(r.nominations.positionId),
    }),
    answers: r.many.answers(),
  },
  positions: {
    generalMeeting: r.one.generalMeetings({
      from: r.positions.meetingId,
      to: r.generalMeetings.id,
    }),
    //contest:
  },
  // nominations: {},
  questions: {
    generalMeeting: r.one.generalMeetings({
      from: r.questions.meetingId,
      to: r.generalMeetings.id,
    }),
    answers: r.many.answers(),
  },
  answers: {
    candidate: r.one.candidates({
      from: r.answers.candidateId,
      to: r.candidates.id,
    }),
    question: r.one.questions({
      from: r.answers.questionId,
      to: r.questions.id,
    }),
  },
  voters: {
    generalMeeting: r.one.generalMeetings({
      from: r.voters.meetingId,
      to: r.generalMeetings.id,
    }),
    user: r.one.users({
      from: r.voters.userId,
      to: r.users.id,
    }),
  },
  contests: {
    generalMeeting: r.one.generalMeetings({
      from: r.contests.meetingId,
      to: r.generalMeetings.id,
      optional: false,
    }),
    position: r.one.positions({
      from: r.contests.positionId,
      to: r.positions.id,
      optional: false,
    }),
  },
  // votes: {},
  // votePreferences: {},
  winners: {
    candidate: r.one.candidates({
      from: r.winners.candidateId,
      to: r.candidates.id,
    }),
  },
}))
