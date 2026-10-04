"use client"

import * as React from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { marked } from "marked"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { buttonVariants } from "~/ui/button"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import EditAgendaDialog from "./edit-agenda"

interface AgendaCardProps {
  id: string
  className?: string
}

export default function AgendaCard({ id, className }: AgendaCardProps) {
  const { admin } = useApi()
  const { data } = useSuspenseQuery(admin.generalMeetings.getAgenda.queryOptions(id))
  const [dialogOpen, setDialogOpen] = React.useState(false)

  const closeDialog = React.useCallback(() => {
    setDialogOpen(false)
  }, [])
  const html = React.useMemo(() => {
    if (!data) return null
    return marked.parse(data!, {
      breaks: true,
      pedantic: true,
    })
  }, [data])

  return (
    <div className={cn("flex size-full max-h-[calc(100vh-68px)] flex-col gap-4 bg-background p-6", className)}>
      <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-0.5">
        <div className="text-base leading-snug font-medium">Agenda</div>
        <div className="text-sm text-muted-foreground">This will be viewable to everyone attending the meeting.</div>
        <div className="col-start-2 row-span-2 row-start-1 flex items-start">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger className={buttonVariants({ size: "xs", variant: "secondary" })}>Edit</DialogTrigger>
            <EditAgendaDialog id={id} data={data!} close={closeDialog} />
          </Dialog>
        </div>
      </div>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} className="agenda -mx-4 space-y-2 px-4" />
      ) : (
        <div className="grid min-h-20 flex-1 place-items-center text-sm text-muted-foreground select-none">
          No agenda set yet
        </div>
      )}
    </div>
  )
}
