"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { buttonVariants } from "~/ui/button"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "~/ui/table"
import EditPositionsDialog from "./edit-positions"

interface PositionsCardProps {
  id: string
  className?: string
}

export default function PositionsCard({ id, className }: PositionsCardProps) {
  const { admin } = useApi()
  const { data } = useSuspenseQuery(
    admin.generalMeetings.positions.listForMeeting.queryOptions(id, {
      refetchOnWindowFocus: true,
      refetchInterval: false,
      refetchOnReconnect: true,
    }),
  )

  return (
    <div className={cn("flex size-full flex-col gap-4 bg-background p-6", className)}>
      <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-0.5">
        <div className="text-base leading-snug font-medium">Available positions</div>
        {/* <div className="text-sm text-muted-foreground">This will be viewable to everyone attending the meeting.</div> */}
        <div className="col-start-2 row-span-2 row-start-1 flex items-start">
          <Dialog>
            <DialogTrigger className={buttonVariants({ size: "xs", variant: "secondary" })}>
              {data.length === 0 ? "Add" : "Edit"}
            </DialogTrigger>
            <EditPositionsDialog id={id} positions={data} />
          </Dialog>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="grid min-h-20 flex-1 place-items-center text-sm text-muted-foreground select-none">
          No positions available
        </div>
      ) : (
        <TableContainer>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Openings</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((pos) => (
                <TableRow key={pos.id}>
                  <TableCell>{pos.title}</TableCell>
                  <TableCell className="text-right">{pos.openings}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}
