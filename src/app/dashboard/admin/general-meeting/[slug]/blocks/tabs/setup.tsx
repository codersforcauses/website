import { HydrateClient, prefetch, trpc } from "~/trpc/server"
import PositionsCard from "../cards/positions"
import QuestionsCard from "../cards/questions"
import AgendaCard from "../cards/agenda"
import MeetingDetails from "../cards/meeting-details"

interface SetupTabProps {
  id: string
  slug: string
}

export default function SetupTab(props: SetupTabProps) {
  prefetch(trpc.admin.generalMeetings.get.queryOptions(props.slug))
  prefetch(trpc.admin.generalMeetings.getAgenda.queryOptions(props.id))
  prefetch(trpc.admin.generalMeetings.positions.listForMeeting.queryOptions(props.id))
  prefetch(trpc.admin.generalMeetings.questions.listForMeeting.queryOptions(props.id))

  return (
    <HydrateClient>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MeetingDetails slug={props.slug} className="lg:col-span-2" />
        <AgendaCard id={props.id} className="lg:row-span-2" />
        <PositionsCard id={props.id} className="" />
        <QuestionsCard id={props.id} className="" />
      </div>
    </HydrateClient>
  )
}
