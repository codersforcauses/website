import { defineRelations } from "drizzle-orm"
import * as schema from "./schema"

export const relations = defineRelations(schema, (r) => ({
  cfcWebsiteAccount: {
    cfcWebsiteUser: r.one.cfcWebsiteUser({
      from: r.cfcWebsiteAccount.userId,
      to: r.cfcWebsiteUser.id,
    }),
  },
  cfcWebsiteUser: {
    cfcWebsiteAccounts: r.many.cfcWebsiteAccount(),
    cfcWebsiteGeneralMeetingsViaCfcWebsiteCandidate: r.many.cfcWebsiteGeneralMeeting({
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsiteUser_id_via_cfcWebsiteCandidate",
    }),
    cfcWebsiteGeneralMeetingsCreatedBy: r.many.cfcWebsiteGeneralMeeting({
      alias: "cfcWebsiteGeneralMeeting_createdBy_cfcWebsiteUser_id",
    }),
    cfcWebsitePayments: r.many.cfcWebsitePayment(),
    cfcWebsiteGeneralMeetingsViaCfcWebsiteVoter: r.many.cfcWebsiteGeneralMeeting({
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsiteUser_id_via_cfcWebsiteVoter",
    }),
  },
  cfcWebsiteCandidate: {
    cfcWebsiteQuestions: r.many.cfcWebsiteQuestion({
      from: r.cfcWebsiteCandidate.id.through(r.cfcWebsiteAnswer.candidateId),
      to: r.cfcWebsiteQuestion.id.through(r.cfcWebsiteAnswer.questionId),
    }),
    cfcWebsiteNominations: r.many.cfcWebsiteNomination(),
    cfcWebsiteVotes: r.many.cfcWebsiteVote({
      from: r.cfcWebsiteCandidate.id.through(r.cfcWebsiteVotePreference.candidateId),
      to: r.cfcWebsiteVote.id.through(r.cfcWebsiteVotePreference.voteId),
    }),
    cfcWebsiteContests: r.many.cfcWebsiteContest({
      from: r.cfcWebsiteCandidate.id.through(r.cfcWebsiteWinner.candidateId),
      to: r.cfcWebsiteContest.id.through(r.cfcWebsiteWinner.contestId),
    }),
  },
  cfcWebsiteQuestion: {
    cfcWebsiteCandidates: r.many.cfcWebsiteCandidate(),
    cfcWebsiteGeneralMeeting: r.one.cfcWebsiteGeneralMeeting({
      from: r.cfcWebsiteQuestion.meetingId,
      to: r.cfcWebsiteGeneralMeeting.id,
    }),
  },
  cfcWebsiteGeneralMeeting: {
    cfcWebsiteUsersViaCfcWebsiteCandidate: r.many.cfcWebsiteUser({
      from: r.cfcWebsiteGeneralMeeting.id.through(r.cfcWebsiteCandidate.meetingId),
      to: r.cfcWebsiteUser.id.through(r.cfcWebsiteCandidate.userId),
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsiteUser_id_via_cfcWebsiteCandidate",
    }),
    cfcWebsitePositionsViaCfcWebsiteContest: r.many.cfcWebsitePosition({
      from: r.cfcWebsiteGeneralMeeting.id.through(r.cfcWebsiteContest.meetingId),
      to: r.cfcWebsitePosition.id.through(r.cfcWebsiteContest.positionId),
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsitePosition_id_via_cfcWebsiteContest",
    }),
    cfcWebsiteUser: r.one.cfcWebsiteUser({
      from: r.cfcWebsiteGeneralMeeting.createdBy,
      to: r.cfcWebsiteUser.id,
      alias: "cfcWebsiteGeneralMeeting_createdBy_cfcWebsiteUser_id",
    }),
    cfcWebsiteNominations: r.many.cfcWebsiteNomination(),
    cfcWebsitePositionsMeetingId: r.many.cfcWebsitePosition({
      alias: "cfcWebsitePosition_meetingId_cfcWebsiteGeneralMeeting_id",
    }),
    cfcWebsiteQuestions: r.many.cfcWebsiteQuestion(),
    cfcWebsiteUsersViaCfcWebsiteVoter: r.many.cfcWebsiteUser({
      from: r.cfcWebsiteGeneralMeeting.id.through(r.cfcWebsiteVoter.meetingId),
      to: r.cfcWebsiteUser.id.through(r.cfcWebsiteVoter.userId),
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsiteUser_id_via_cfcWebsiteVoter",
    }),
  },
  cfcWebsitePosition: {
    cfcWebsiteGeneralMeetings: r.many.cfcWebsiteGeneralMeeting({
      alias: "cfcWebsiteGeneralMeeting_id_cfcWebsitePosition_id_via_cfcWebsiteContest",
    }),
    cfcWebsiteNominations: r.many.cfcWebsiteNomination(),
    cfcWebsiteGeneralMeeting: r.one.cfcWebsiteGeneralMeeting({
      from: r.cfcWebsitePosition.meetingId,
      to: r.cfcWebsiteGeneralMeeting.id,
      alias: "cfcWebsitePosition_meetingId_cfcWebsiteGeneralMeeting_id",
    }),
  },
  cfcWebsiteNomination: {
    cfcWebsiteCandidate: r.one.cfcWebsiteCandidate({
      from: r.cfcWebsiteNomination.candidateId,
      to: r.cfcWebsiteCandidate.id,
    }),
    cfcWebsiteGeneralMeeting: r.one.cfcWebsiteGeneralMeeting({
      from: r.cfcWebsiteNomination.meetingId,
      to: r.cfcWebsiteGeneralMeeting.id,
    }),
    cfcWebsitePosition: r.one.cfcWebsitePosition({
      from: r.cfcWebsiteNomination.positionId,
      to: r.cfcWebsitePosition.id,
    }),
  },
  cfcWebsitePayment: {
    cfcWebsiteUser: r.one.cfcWebsiteUser({
      from: r.cfcWebsitePayment.userId,
      to: r.cfcWebsiteUser.id,
    }),
  },
  cfcWebsiteContest: {
    cfcWebsiteVoters: r.many.cfcWebsiteVoter({
      from: r.cfcWebsiteContest.id.through(r.cfcWebsiteVote.contestId),
      to: r.cfcWebsiteVoter.id.through(r.cfcWebsiteVote.voterId),
    }),
    cfcWebsiteCandidates: r.many.cfcWebsiteCandidate(),
  },
  cfcWebsiteVoter: {
    cfcWebsiteContests: r.many.cfcWebsiteContest(),
  },
  cfcWebsiteVote: {
    cfcWebsiteCandidates: r.many.cfcWebsiteCandidate(),
  },
}))
