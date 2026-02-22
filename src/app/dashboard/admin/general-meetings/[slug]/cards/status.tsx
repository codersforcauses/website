"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { CalendarClock, CircleCheck, CircleX, LoaderCircle } from "lucide-react"

import { api } from "~/trpc/react"
import { toast } from "~/hooks/use-toast"
import { Label } from "~/ui/label"
import { FieldDescription, FieldLegend, FieldSet } from "~/ui/field"
import { RadioGroup, RadioGroupItem } from "~/ui/radio-group"

const STATUSES = [
  { value: "upcoming", label: "Upcoming", description: "Scheduled but hasn't started", Icon: CalendarClock },
  { value: "ongoing", label: "Ongoing", description: "Currently in progress", Icon: LoaderCircle },
  { value: "completed", label: "Completed", description: "Meeting has finished", Icon: CircleCheck },
  { value: "cancelled", label: "Cancelled", description: "Meeting has been cancelled", Icon: CircleX },
] as const

type MeetingStatus = (typeof STATUSES)[number]["value"]

function StatusForm({ meetingId, initialStatus }: { meetingId: string; initialStatus: MeetingStatus }) {
  const utils = api.useUtils()
  const [status, setStatus] = React.useState<MeetingStatus>(initialStatus)
  const [loading, startTransition] = React.useTransition()

  const updateMeeting = api.admin.generalMeetings.update.useMutation()

  function handleChange(newValue: MeetingStatus) {
    const prevStatus = status
    setStatus(newValue)
    startTransition(async () => {
      try {
        await updateMeeting.mutateAsync({ id: meetingId, status: newValue })
        await utils.generalMeetings.get.invalidate()
        toast({ title: "Status updated" })
      } catch {
        setStatus(prevStatus)
        toast({ title: "Failed to update status", variant: "destructive" })
      }
    })
  }

  return (
    <div className="flex w-full flex-col gap-y-4 bg-white p-6 dark:bg-neutral-950">
      <FieldSet>
        <FieldLegend variant="label">Meeting status</FieldLegend>
        <FieldDescription>Manually override the current meeting status.</FieldDescription>
        <RadioGroup value={status} onValueChange={handleChange} disabled={loading} className="mt-1">
          {STATUSES.map(({ value, label, description, Icon }) => (
            <div key={value} className="flex items-center gap-3">
              <RadioGroupItem value={value} id={`status-${value}`} />
              <Label htmlFor={`status-${value}`} className="flex cursor-pointer items-center gap-2">
                <Icon className="size-4 shrink-0 text-neutral-500 dark:text-neutral-400" />
                <div className="flex flex-col gap-0.5">
                  <span>{label}</span>
                  <span className="text-xs font-normal text-neutral-500 dark:text-neutral-400">{description}</span>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </FieldSet>
    </div>
  )
}

export default function StatusCard() {
  const { slug } = useParams<{ slug: string }>()
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })

  return <StatusForm meetingId={meeting.id} initialStatus={meeting.status} />
}
