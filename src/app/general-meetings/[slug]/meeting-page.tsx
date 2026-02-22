"use client"

import * as React from "react"
import Link from "next/link"
import snarkdown from "snarkdown"

import { api } from "~/trpc/react"
import { Badge } from "~/ui/badge"
import { Button } from "~/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/ui/collapsible"

const STATUS_LABELS = {
  upcoming: "Upcoming",
  ongoing: "Ongoing",
  completed: "Completed",
  cancelled: "Cancelled",
} as const

const STATUS_VARIANTS = {
  upcoming: "secondary",
  ongoing: "default",
  completed: "outline",
  cancelled: "destructive",
} as const satisfies Record<string, "default" | "secondary" | "outline" | "destructive">

function formatDatetime(date: Date) {
  return date.toLocaleString("en-AU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

function formatTime(date: Date) {
  return date.toLocaleString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

export default function MeetingPage({ slug }: { slug: string }) {
  const [agendaOpen, setAgendaOpen] = React.useState(false)
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })

  const agendaHtml = React.useMemo(() => (meeting.agenda ? snarkdown(meeting.agenda) : ""), [meeting.agenda])

  const sameDay = meeting.end && meeting.start.toDateString() === meeting.end.toDateString()

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-10">
        <section className="space-y-3">
          <Badge variant={STATUS_VARIANTS[meeting.status]}>{STATUS_LABELS[meeting.status]}</Badge>
          <h1 className="scroll-m-20 font-mono text-4xl tracking-tight text-balance">{meeting.title}</h1>
          <div className="flex flex-col gap-1.5 font-mono text-sm text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="material-symbols-sharp text-base! leading-none!">schedule</span>
              <span>
                {sameDay
                  ? `${formatDatetime(meeting.start)} — ${formatTime(meeting.end!)}`
                  : formatDatetime(meeting.start)}
                {!sameDay && meeting.end && ` — ${formatDatetime(meeting.end)}`}
              </span>
            </div>
            {meeting.venue && (
              <div className="flex items-center gap-2">
                <span className="material-symbols-sharp text-base! leading-none!">location_on</span>
                <span>{meeting.venue}</span>
              </div>
            )}
          </div>
        </section>

        {meeting.agenda && (
          <section>
            <Collapsible open={agendaOpen} onOpenChange={setAgendaOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <span className="material-symbols-sharp text-base! leading-none!">
                    {agendaOpen ? "expand_less" : "expand_more"}
                  </span>
                  {agendaOpen ? "Hide agenda" : "View agenda"}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-4">
                <div
                  className="prose max-w-none prose-neutral dark:prose-invert"
                  dangerouslySetInnerHTML={{ __html: agendaHtml }}
                />
              </CollapsibleContent>
            </Collapsible>
          </section>
        )}

        {(meeting.status === "upcoming" || meeting.status === "ongoing") && (
          <section className="space-y-4">
            <div>
              <h2 className="font-mono text-2xl font-semibold tracking-tight">Committee nominations</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Interested in joining the committee? Submit your nomination before the meeting.
              </p>
            </div>
            <Button asChild>
              <Link href={`/general-meetings/${slug}/nominate` as never}>
                Nominate yourself
                <span className="material-symbols-sharp text-base! leading-none!">arrow_forward</span>
              </Link>
            </Button>
          </section>
        )}

        {meeting.status === "ongoing" && (
          <section className="space-y-4">
            <div>
              <h2 className="font-mono text-2xl font-semibold tracking-tight">Election</h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Voting is currently open. Cast your vote for the committee positions below.
              </p>
            </div>
            <Button asChild>
              <Link href={`/general-meetings/${slug}/vote` as never}>
                Vote now
                <span className="material-symbols-sharp text-base! leading-none!">arrow_forward</span>
              </Link>
            </Button>
          </section>
        )}
      </div>
    </main>
  )
}
