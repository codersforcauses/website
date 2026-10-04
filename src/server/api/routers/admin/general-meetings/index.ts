import { createTRPCRouter } from "~/server/api/trpc"
import { candidatesInGeneralMeetingsAdminRouter } from "./sub-routes/candidates"
import { positionsInGeneralMeetingsAdminRouter } from "./sub-routes/positions"
import { questionsInGeneralMeetingsAdminRouter } from "./sub-routes/questions"
import { votersInGeneralMeetingsAdminRouter } from "./sub-routes/voters"
import createMeeting from "./endpoints/create-meeting"
import updateMeeting from "./endpoints/update-meeting"
import listMeetings from "./endpoints/list-meetings"
import getMeeting from "./endpoints/get-meeting"
import updateMeetingStatus from "./endpoints/update-status"
import getMeetingStatus from "./endpoints/get-status"
import getMeetingAgenda from "./endpoints/get-agenda"
import updateMeetingAgenda from "./endpoints/update-agenda"

export const generalMeetingsAdminRouter = createTRPCRouter({
  candidates: candidatesInGeneralMeetingsAdminRouter,
  positions: positionsInGeneralMeetingsAdminRouter,
  questions: questionsInGeneralMeetingsAdminRouter,
  voters: votersInGeneralMeetingsAdminRouter,

  create: createMeeting,
  update: updateMeeting,
  list: listMeetings,
  get: getMeeting,
  getStatus: getMeetingStatus,
  updateStatus: updateMeetingStatus,
  getAgenda: getMeetingAgenda,
  updateAgenda: updateMeetingAgenda,
})
