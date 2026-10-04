"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { useApi } from "~/trpc/react"
import { Avatar, AvatarFallback, AvatarImage } from "~/ui/avatar"
import { Badge } from "~/ui/badge"
import { DialogContent, DialogHeader, DialogTitle } from "~/ui/dialog"

interface ViewCandidateDialogProps {
  id: string
  user: {
    id: string
    name: string
    preferredName: string
    image: string | null
    studentNumber: string | null
    role: string | null
  } | null
  positions: Array<{ id: string }>
  answers: Array<{ text: string; questionId: string }>
}

function formatText(text: string) {
  if (text.includes("bool:")) {
    if (text.includes("true")) return "Yes"
    else return "No"
  } else return text
}

export default function ViewCandidateDialog({ id, user, positions, answers }: ViewCandidateDialogProps) {
  const { admin } = useApi()
  const { data: pos } = useSuspenseQuery(admin.generalMeetings.positions.listForMeeting.queryOptions(id))
  const { data: ques } = useSuspenseQuery(admin.generalMeetings.questions.listForMeeting.queryOptions(id))

  const roles = user?.role?.split(",")

  return (
    <DialogContent className="md:max-w-xl">
      <DialogHeader>
        <DialogTitle>Candidate application</DialogTitle>
      </DialogHeader>
      <div className="no-scrollbar right-0 -mx-5 grid max-h-[75vh] gap-4 overflow-y-auto px-5">
        <div className="flex gap-4">
          <Avatar size="xl">
            <AvatarImage src={user?.image ?? undefined} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 content-center gap-1">
            <h1 className="text-lg leading-snug font-semibold">
              <span className="sr-only">Name: </span>
              {user?.name ?? "Deleted user"}
            </h1>
            <p className="text-sm text-muted-foreground">
              <span className="sr-only">UWA student number: </span>
              {user?.studentNumber}
            </p>
            <div className="inline-flex gap-1">
              {!roles ? (
                <Badge variant="destructive">non-member</Badge>
              ) : (
                roles?.map((role) => (
                  <Badge key={role} variant="secondary">
                    {role}
                  </Badge>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="grid gap-1 leading-snug">
          <p className="text-sm text-muted-foreground">Applied for:</p>
          <ul className="grid list-inside list-[square] grid-cols-2 gap-1 text-sm">
            {positions.map((p) => (
              <li key={p.id}>{pos.find((_p) => _p.id === p.id)?.title}</li>
            ))}
          </ul>
        </div>
        {/* <div className="grid gap-4"> */}
        {answers.map((ans) =>
          ans.text ? (
            <div key={ans.questionId} className="leading-snug">
              <p className="text-sm text-muted-foreground">{ques.find((q) => q.id === ans.questionId)?.text}</p>
              <p className="leading-7">{formatText(ans.text)}</p>
            </div>
          ) : null,
        )}
        {/* </div> */}
      </div>
    </DialogContent>
  )
}
