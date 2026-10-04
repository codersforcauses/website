"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"

import { getQueryClient, useApi } from "~/trpc/react"
import type { MEETING_STATUS } from "~/lib/constants"
import { Alert, AlertAction, AlertDescription, AlertTitle } from "~/ui/alert"
import { Button } from "~/ui/button"

interface MeetingAlertProps {
  id: string
  initialData: (typeof MEETING_STATUS)[number]
}

export function DraftAlert(props: MeetingAlertProps) {
  const api = useApi()
  const queryClient = getQueryClient()
  const { slug } = useParams<{ slug: string }>()
  const [loading, startTransition] = React.useTransition()
  const { data: status, refetch } = useQuery(
    api.admin.generalMeetings.getStatus.queryOptions(props.id, {
      initialData: props.initialData,
      refetchInterval: false,
    }),
  )
  const { mutate } = useMutation(
    api.admin.generalMeetings.updateStatus.mutationOptions({
      async onSuccess() {
        const queryKeyBySlug = api.admin.generalMeetings.get.queryKey(slug)
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: queryKeyBySlug, exact: true }),
          queryClient.invalidateQueries(api.admin.generalMeetings.list.pathFilter()),
        ])
        await refetch()
      },
    }),
  )

  const handleClick = React.useCallback(() => {
    startTransition(async () => {
      mutate({
        meetingId: props.id,
        status: "upcoming",
      })
    })
  }, [mutate, props.id])

  return (
    status === "draft" && (
      <Alert className="mb-2">
        <span className="material-symbols-sharp text-base! leading-none!">edit_square</span>
        <AlertTitle>This meeting is currently in draft mode</AlertTitle>
        <AlertDescription className="inline-block">
          Click the button to start accepting candidate applications. This action&nbsp;
          <span className="font-bold">cannot</span>
          &nbsp;be undone.
        </AlertDescription>
        <AlertAction>
          <Button size="xs" variant="default" disabled={loading} onClick={handleClick}>
            Go live
          </Button>
        </AlertAction>
      </Alert>
    )
  )
}
