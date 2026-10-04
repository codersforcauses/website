"use client"

import { useSuspenseQuery } from "@tanstack/react-query"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { buttonVariants } from "~/ui/button"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import { Item, ItemGroup, ItemTitle } from "~/ui/item"
import EditQuestionsDialog from "./edit-questions"

interface QuestionsCardProps {
  id: string
  className?: string
}

export default function QuestionsCard({ id, className }: QuestionsCardProps) {
  const { admin } = useApi()
  const { data } = useSuspenseQuery(
    admin.generalMeetings.questions.listForMeeting.queryOptions(id, {
      refetchOnWindowFocus: true,
      refetchInterval: false,
      refetchOnReconnect: true,
    }),
  )

  return (
    <div className={cn("flex size-full flex-col gap-4 bg-background p-6", className)}>
      <div className="grid auto-rows-min grid-cols-[1fr_auto] items-start gap-0.5">
        <div className="text-base leading-snug font-medium">Questions for candidates</div>
        <div className="col-start-2 row-span-2 row-start-1 flex items-start">
          <Dialog>
            <DialogTrigger className={buttonVariants({ size: "xs", variant: "secondary" })}>
              {data.length === 0 ? "Add" : "Edit"}
            </DialogTrigger>
            <EditQuestionsDialog id={id} questions={data} />
          </Dialog>
        </div>
      </div>
      {data.length === 0 ? (
        <div className="grid min-h-20 flex-1 place-items-center text-sm text-muted-foreground select-none">
          No questions created
        </div>
      ) : (
        <ItemGroup>
          {data.map((ques) => (
            <Item key={ques.id} size="xs" variant="muted" role="listitem">
              <ItemTitle className="inline-block">
                {ques.text}
                {!ques.required && <span className="text-muted-foreground">&nbsp;(optional)</span>}
              </ItemTitle>
            </Item>
          ))}
        </ItemGroup>
      )}
    </div>
  )
}
