"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { api } from "~/trpc/react"
import { toast } from "~/hooks/use-toast"
import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"
import { FieldDescription, FieldGroup, FieldLegend, FieldSet } from "~/ui/field"
import { Spinner } from "~/ui/spinner"
import { Textarea } from "~/ui/textarea"

function AgendaForm({ meetingId, initialAgenda }: { meetingId: string; initialAgenda: string | null }) {
  const utils = api.useUtils()
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const [btnText, setBtnText] = React.useState("Save agenda")
  const [loading, startTransition] = React.useTransition()
  const [agenda, setAgenda] = React.useState(initialAgenda ?? "")

  const updateMeeting = api.admin.generalMeetings.update.useMutation()

  function handleSave() {
    setBtnText("Saving agenda")
    startTransition(async () => {
      try {
        await updateMeeting.mutateAsync({ id: meetingId, agenda: agenda || null })
        await utils.generalMeetings.get.invalidate()
        toast({ title: "Agenda saved" })
        setBtnText("Save agenda")
      } catch {
        toast({ title: "Failed to save agenda", variant: "destructive" })
        setBtnText("Save agenda")
      }
    })
  }

  return (
    <div className={cn("flex w-full flex-col gap-y-4 bg-white p-6 dark:bg-neutral-950")}>
      <FieldSet className="h-full">
        <FieldLegend variant="label">Meeting agenda</FieldLegend>
        <FieldDescription>This will be viewable to everyone attending the meeting. Supports markdown.</FieldDescription>
        <FieldGroup className="h-full">
          <Textarea
            placeholder="Write something here with markdown"
            value={agenda}
            disabled={loading}
            className="h-full min-h-48"
            onChange={(e) => setAgenda(e.target.value)}
          />
        </FieldGroup>
      </FieldSet>
      <Button ref={btnRef} disabled={loading} className="relative" onClick={handleSave}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={btnText}
            transition={{ type: "spring", duration: 0.2, bounce: 0 }}
            initial={{ opacity: 0, y: -36 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 36 }}
          >
            {btnText}
          </motion.span>
        </AnimatePresence>
        {loading && <Spinner className="absolute right-4" />}
      </Button>
    </div>
  )
}

export default function AgendaCard() {
  const { slug } = useParams<{ slug: string }>()
  const [meeting] = api.generalMeetings.get.useSuspenseQuery({ slug })

  return <AgendaForm meetingId={meeting.id} initialAgenda={meeting.agenda} />
}
