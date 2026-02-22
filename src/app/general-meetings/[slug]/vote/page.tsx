import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "~/lib/auth"
import { api, HydrateClient } from "~/trpc/server"
import VotePage from "./vote-page"

export default async function VotePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect(`/join?redirect=/general-meetings/${slug}/vote`)

  const meeting = await api.generalMeetings.get({ slug })
  void api.generalMeetings.positions.getWithCounts.prefetch({ meetingId: meeting.id })

  return (
    <HydrateClient>
      <VotePage slug={slug} />
    </HydrateClient>
  )
}
