import { createTRPCRouter } from "~/server/api/trpc"
import { positionsInGeneralMeetingsRouter } from "./sub-routes/positions"
import { questionsInGeneralMeetingsRouter } from "./sub-routes/questions"
import { nominationsInGeneralMeetingsRouter } from "./sub-routes/nominations"
import { candidatesInGeneralMeetingsRouter } from "./sub-routes/candidates"
import { answersInGeneralMeetingsRouter } from "./sub-routes/answers"
import getMeeting from "./endpoints/get-meeting"

export const generalMeetingsRouter = createTRPCRouter({
  positions: positionsInGeneralMeetingsRouter,
  questions: questionsInGeneralMeetingsRouter,
  nominations: nominationsInGeneralMeetingsRouter,
  candidates: candidatesInGeneralMeetingsRouter,
  answers: answersInGeneralMeetingsRouter,

  get: getMeeting,
})
