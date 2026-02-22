import * as React from "react"

import { api, HydrateClient } from "~/trpc/server"
import { Skeleton } from "~/ui/skeleton"
import PositionPage from "./position-page"

export default async function PositionPageRoute({
  params,
}: PageProps<"/general-meetings/[slug]/positions/[positionId]">) {
  const { slug, positionId } = await params

  void api.generalMeetings.get.prefetch({ slug })
  void api.generalMeetings.positions.getCandidates.prefetch({ positionId })

  return (
    <HydrateClient>
      <React.Suspense fallback={<Skeleton className="m-12 h-64 w-full max-w-3xl" />}>
        <PositionPage slug={slug} positionId={positionId} />
      </React.Suspense>
    </HydrateClient>
  )
}
