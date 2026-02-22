import { api, HydrateClient } from "~/trpc/server"
import MeetingPage from "./meeting-page"

export default async function GeneralMeetingPage({ params }: PageProps<"/general-meetings/[slug]">) {
  const { slug } = await params
  void api.generalMeetings.get.prefetch({ slug })

  return (
    <HydrateClient>
      <MeetingPage slug={slug} />
    </HydrateClient>
  )
}
