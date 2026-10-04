import { trpc, HydrateClient, prefetch } from "~/trpc/server"
import AttendeesCard from "../cards/attendees"
import CandidatesCard from "../cards/candidates"

interface SetupTabProps {
  id: string
  slug: string
}

export default function DayTab(props: SetupTabProps) {
  prefetch(trpc.admin.generalMeetings.voters.list.queryOptions({ meetingId: props.id }))
  prefetch(trpc.admin.generalMeetings.positions.listForMeeting.queryOptions(props.id))

  return (
    <HydrateClient>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CandidatesCard id={props.id} className="lg:col-span-2" />
        <AttendeesCard id={props.id} />
      </div>
    </HydrateClient>
  )
}
